var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
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
ssbWeb.startSbot('ssb-ev-DEV', function (err, { id, sbot }) {
    if (err) throw err

    var cats = []
    S(
        ssbWeb.getPosts({ id, sbot, type: 'ev.post' }),

        // this means `public/posts/img`
        ssbWeb.writeFiles(sbot, 'public/posts/img'),

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
                },
                '.site-nav a[href="/detritus"]': {
                    class: { append: 'active' }
                }
            })

            fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(_hs)
            .pipe(fs.createWriteStream(__dirname +
                '/public/detritus/index.html'))
        }),
        S.drain(function ({ post, blob }) {
            console.log('post', post)

            // make a thumbnail stream of html for the index page
            var indexRs = fs.createReadStream(__dirname +
                '/src/_detritus_template.html')
            var hs = hyperstream({
                '.post': {
                    _appendHtml: `<img src="/posts/img/${blob}">`
                }
            })
            // cats.push(hs)
            cats.push(indexRs.pipe(hs))
        })
    )
})
