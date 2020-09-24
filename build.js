var hyperstream = require('hyperstream');
var fs = require('fs');
var sbweb = require('ssb-web')
var S = require('pull-stream')
var WriteFile = require('pull-write-file')
var cat = require('stream-cat')

var srcPaths = [ 'websites', 'software' ]

srcPaths.forEach(function (path) {
    var obj = {
        '#content': fs.createReadStream(__dirname + '/src/' + path + '.html'),
        'body': {
            class: { append: path }
        }
    }

    obj['.site-nav a[href="/' + path + '"]'] = {
        class: { append: 'active' }
    }

    var hs = hyperstream(obj)
    var rs = fs.createReadStream(__dirname + '/src/_index.html')
    var outPath = __dirname + '/public/' + path + '/index.html'
    rs.pipe(hs).pipe(fs.createWriteStream(outPath))
})


// the visual detritus page
sbweb.startSbot('ssb-ev-DEV', function (err, { id, sbot }) {
    if (err) throw err
    console.log('sbot started')

    var n = 0
    var cats = []
    S(
        sbweb.getPosts({ id, sbot, type: 'ev.post' }),
        S.map(function (post) {
            var _n = n
            n++
            return { post, n: _n }
        }),
        S.through(function noop(){}, function onEnd (err) {
            console.log('on end', err)
            if (err) throw err
            sbot.close(null, function (err) {
                console.log('sbot closed', err)
            })


            var hs = hyperstream({
                '#content-detritus': cat(cats)
            })
            var _content = fs.createReadStream(__dirname + '/src/detritus.html')
                .pipe(hs)

            var _hs = hyperstream({
                '#content': _content,
                'body': {
                    class: { append: 'detritus' }
                }
            })

            fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(_hs)
            .pipe(fs.createWriteStream(__dirname +
                '/public/detritus/index.html'))


        }),
        S.drain(function ({ post, n }) {
            console.log('post', n)
            // for each post, append it to #content, after making it html
            
            // writing the blob
            var hash = post.value.content.mentions[0].link
            S(
                sbot.blobs.get(hash),
                WriteFile(__dirname + '/public/img/file'+n, {}, (err) => {
                    console.log('file written', err)
                    if (err) throw err
                })
            )

            // make a thumbnail stream of html
            var indexRs = fs.createReadStream(__dirname +
                '/src/_detritus_template.html')
            var hs = hyperstream({
                '.post': {
                    _appendHtml: `<img src="/img/file${n}">`
                }
            })
            // cats.push(hs)
            cats.push(indexRs.pipe(hs))
        })
    )
})
