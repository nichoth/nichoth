var hyperstream = require('hyperstream');
var ssbWeb = require('ssb-web')
var fs = require('fs');
var S = require('pull-stream')
var slugify = require('@sindresorhus/slugify')
var mkdirp = require('mkdirp')
var Tags = require('@nichoth/ssb-tags')

function detritus (cb) {
    var plugins = [ Tags({ postType: 'ev.post' }) ]
    ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
        if (err) throw err

        // ----------- img index page ---------------------------

        // this is a concatted list of html for posts, an index page
        var contentDetritus = ''
        // write the main stuff
        S(
            ssbWeb.getPosts({ id, sbot, type: 'ev.post', reverse: true }),
            ssbWeb.writeFiles(sbot, 'public/posts/img'),
            S.drain(function onEvent ({ post, blob }) {
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
                        '/public/posts/' + postPath + '/index.html'))

                // html for this post on the index page
                // cat the new html for this post
                contentDetritus += `<div class="post">
                    <a href="/posts/${postPath}">
                        <img src="/posts/img/${blob}">
                    </a>
                    <p class="post-text">${post.value.content.text}</p>
                </div>`
            }, function onEnd (err) {
                // now we have gotten all the posts, can write the
                // index/list of them
                if (err) throw err

                var _hs = hyperstream({
                    '#content': {
                        _appendHtml: contentDetritus,
                        class: { append: 'content-detritus' }
                    },
                    'body': {
                        class: { append: 'detritus' }
                    },
                    '.site-nav': {
                        _appendHtml: `<button id="tag-nav">tags</button>`
                    },
                    '.site-nav a[href="/detritus"]': {
                        class: { append: 'active' }
                    }
                })

                var ws = fs.createWriteStream(__dirname +
                    '/public/detritus/index.html')
                fs.createReadStream(__dirname + '/src/_index.html')
                    .pipe(_hs)
                    .pipe(ws)

                // sbot.close(null, function (err) {
                //     console.log('sbot closed', err)
                //     if (cb) cb(err)
                // })
            })
        )
        // ---------------- /img index page -------------------------

    })
}

module.exports = detritus

if (require.main === module) {
    detritus(err => {
        console.log('done writing images', err)
    })
}
