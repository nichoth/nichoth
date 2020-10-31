var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var S = require('pull-stream')
var cat = require('stream-cat')
var mkdirp = require('mkdirp')
var slugify = require('@sindresorhus/slugify')
var after = require('after')

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
    mkdirp.sync(__dirname + '/public/' + path)
    var outPath = __dirname + '/public/' + path + '/index.html'
    rs.pipe(hs).pipe(fs.createWriteStream(outPath))
})

var plugins = [
    require('@nichoth/ssb-tags')({ postType: 'ev.post' })
]

function createTagIndex (sbot, tag, msgIds) {
    mkdirp.sync(__dirname + '/public/detritus/' + tag)

    var posts = ''
    var next = after(msgIds.length, write)
    msgIds.forEach(function (id) {
        sbot.get(id, function (err, msg) {
            // TODO -- get all mentions
            var hashSlug = slugify(msg.content.mentions[0].link)
            posts = posts + `<div class="post">
                <img src="/posts/img/${hashSlug}">
                <p>${msg.content.text}</p>
            </div>`

            // console.log('posts aaaaa', posts)
            next(null, msg)

            // console.log('*got msg*', err, msg)
            // console.log('*mentions*', msg.content.mentions)
        })
    })

    function write () {
        var hs = hyperstream({
            '#content': {
                _appendHtml: posts
            }
        })
        
        fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(hs)
            .pipe(fs.createWriteStream(__dirname + '/public/detritus/' + tag +
                '/index.html'))
    }
}

// the visual detritus page
ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
    if (err) throw err

    // pics by tag
    sbot.tags.get(function (err, res) {
        console.log('*tags.get*', err, res)

        // todo: make a page for each tag
        // the page has pics with that tag
        // need to make nav for the tag pages
        // `/visual-detritus` has all pics
        // `/visual-detritus/tag` has pics tagged with `tag`
        // there is a file `visual-detritus/tag/index.html` for the tag index
        // the links on the tag index go to that pic's page: `/hash`

        Object.keys(res).forEach(function (tag) {
            var msgIds = res[tag]
            createTagIndex(sbot, tag, msgIds)
        })
    })

    // this is a concatted list of streams of html for posts, an index page
    var cats = []
    S(
        ssbWeb.getPosts({ id, sbot, type: 'ev.post', reverse: true }),
        ssbWeb.writeFiles(sbot, 'public/posts/img'),

        // now we have gotten all the posts, can write the index/list
        // of them
        S.through(function noop(){}, function onEnd (err) {
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
            // console.log('post', post)

            // post.value.content
            // { type: 'ev.post', text: 'kkkkkkkkk', mentions: [Array] }

            // in here, make the page with a single image
            mkdirp.sync(__dirname + '/public/posts/' + blob)
            fs.createReadStream(__dirname + '/src/_index.html')
                .pipe(hyperstream({
                    'body': {
                        class: { append: 'detritus-single-image' }
                    },
                    '#content': {
                        _appendHtml: `<img src="/posts/img/${blob}">
                            <p class="post-text">
                                ${post.value.content.text}
                            </p>`
                    },
                    '.site-nav a[href="/detritus"]': {
                        class: { append: 'active' }
                    }
                }))
                .pipe(fs.createWriteStream(__dirname +
                    '/public/posts/' + blob + '/index.html'))


            // make a thumbnail stream of html for the index page
            var indexRs = fs.createReadStream(__dirname +
                '/src/_detritus_template.html')
            var hs = hyperstream({
                '.post': {
                    _appendHtml: `<a href="/posts/${blob}">
                        <img src="/posts/img/${blob}">
                        <p class="post-text">${post.value.content.text}</p>
                    </a>`
                }
            })
            cats.push(indexRs.pipe(hs))
        })
    )
})
