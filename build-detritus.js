var hyperstream = require('hyperstream');
var ssbWeb = require('ssb-web')
var fs = require('fs');
var S = require('pull-stream')
var mkdirp = require('mkdirp')
var Tags = require('@nichoth/ssb-tags')
var glob = require('glob')
var path = require('path')
var sharp = require('sharp')
var slugify = require('@sindresorhus/slugify')

function detritus (cb) {
    var plugins = [ Tags({ postType: 'ev.post' }) ]
    ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
        if (err) return cb(err)

        // ----------- img index page ---------------------------

        // this is a concatted list of html for posts, an index page
        var contentDetritus = ''

        // write the main stuff
        S(
            ssbWeb.getPosts({ id, sbot, type: 'ev.post', reverse: true }),
            ssbWeb.writeFiles(sbot, 'public/posts/img'),
            S.filter(({ post, blobHash }) => (post && blobHash)),
            S.drain(function onEvent ({ post, blobHash }) {
                // post.value.content
                // { type: 'ev.post', text: 'kkkkkkkkk', mentions: [Array] }

                var postPath = slugify(post.key)
                // in here, make the page with a single image
                mkdirp.sync(__dirname + '/public/posts/' + postPath)
                fs.createReadStream(__dirname + '/src/_index.html')
                    .pipe(hyperstream({
                        'body': {
                            class: { append: 'detritus-single-image' }
                        },
                        '#content': {
                            _appendHtml: `<img src="/posts/img/${slugify(blobHash)}">
                                <p class="post-text">
                                    ${post.value.content.text}
                                </p>`
                        }
                    }))
                    .pipe(fs.createWriteStream(__dirname +
                        '/public/posts/' + postPath + '/index.html'))

                // html for this post on the index page
                // cat the new html for this post

                // HERE -- use `picture`
                // @TODO
                // write a smaller image from the ssb stream

                contentDetritus += `<div class="post">
                    <a href="/posts/${postPath}">

                        <picture>
                            <source type="image/avif" srcset="/posts/img/${slugify(blobHash)}.avif">
                            <img src="/posts/img/${slugify(blobHash)}">
                        </picture>

                    </a>
                    <p class="post-text">${post.value.content.text}</p>
                </div>`
            }, function onEnd (err) {
                // now we have gotten all the posts, can write the
                // index/list of them
                if (err) return cb(err)

                // in here, re-write the img files as avif
                glob(__dirname + '/public/posts/img/*', {}, (err, files) => {
                    if (err) throw err
                    files.forEach(fileName => {
                        var bName = path.basename(fileName);
                        var output = __dirname + '/public/posts/img/' +
                            slugify(bName) + '.avif'
                        sharp(fileName)
                            .rotate()
                            .resize(500)
                            .withMetadata()
                            .avif({ lossless: true })
                            .toFile(output, function (err) {
                                if (err) throw err
                            })
                    })
                })

                var headPart = `<div class="head-part">
                    <div class="site-nav">
                        <a href="/" class="home-link">
                            <img src="/img/b.png" alt="cube">
                        </a>
                    </div>

                    <h1>Visual Detritus</h1>

                    <div class="tag-nav">
                        <button id="tag-nav">🏷️</button>
                    </div>
                </div>
                <p>
                    <a href="/notebooks">notebooks</a>
                </p>`

                var _hs = hyperstream({
                    'body': {
                        _prependHtml: headPart,
                        class: { append: 'detritus' },
                    },
                    '#content': {
                        _appendHtml: contentDetritus,
                        class: { append: 'content-detritus' }
                    }
                })

                var ws = fs.createWriteStream(__dirname +
                    '/public/detritus/index.html')
                fs.createReadStream(__dirname + '/src/_index.html')
                    .pipe(_hs)
                    .pipe(ws)
                    .on('close', function () {
                        sbot.close(null, function (err) {
                            if (cb) {
                                if (err) return cb(err)
                                return cb(null)
                            }
                            if (err) throw err
                        })
                    })

            })
        )
        // ---------------- /img index page -------------------------

    })
}

module.exports = detritus

if (require.main === module) {
    detritus(err => console.log('errrrrr', err))
}
