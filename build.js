var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var Tags = require('@nichoth/ssb-tags')
var S = require('pull-stream')
var mkdirp = require('mkdirp')
var slugify = require('@sindresorhus/slugify')
var after = require('after')
var ssbTags = require('ssb-tags')

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

function createTagIndex (sbot, tag, msgIds) {
    // console.log('tag here', tag, msgIds)
    mkdirp.sync(__dirname + '/public/detritus/' + tag)

    var posts = ''
    var next = after(msgIds.length, write)
    // create the html list of posts for this tag
    msgIds.forEach(function (id) {
        sbot.get(id, function (err, msg) {
            // TODO -- get all mentions, not just the first
            if (err) return next(err)
            // console.log('msg here', msg)
            var hashSlug = slugify(msg.content.mentions[0].link)
            posts += `<div class="post">
                <a href="/posts/${hashSlug}">
                    <img src="/posts/img/${hashSlug}">
                </a>
                <p>${msg.content.text}</p>
            </div>`

            next(null, msg)
        })
    })

    // write the index page for the tag index
    function write () {
        var hs = hyperstream({
            body: {
                class: { append: 'tag-index' }
            },

            '.site-nav a[href="/detritus"]': {
                class: { append: 'active' }
            },

            '#content': {
                _appendHtml: posts,
                class: { append: 'tag-index ' + tag }
            },

            // here, show the active tag
            // `tag`
            '.site-nav': {
                _appendHtml: `<button id="tag-nav">${tag}&#x21e9;</button>`
            },
        })

        fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(hs)
            .pipe(fs.createWriteStream(__dirname + '/public/detritus/' +
                tag + '/index.html'))
    }
}

// do the dev-diary
function devDiary (cb) {
    var _plugins = [ ssbTags ]
    ssbWeb.startSbot('ssb', _plugins, function (err, { id, sbot }) {
        if (err) throw err
        sbot.tags.get(function (err, tags) {
            if (err) throw err
            // console.log('**tags**', tags)
            console.log('**id**', id)
            console.log('**tags id**', tags[id])

            // console.log('**dev diary**', tags['dev-diary'])

            sbot.close(function (err) {
                if (err) throw err
                if (cb) cb(err)
            })
        })
    })
}

// the visual detritus page
function pics () {
    var plugins = [ Tags({ postType: 'ev.post' }) ]
    ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
        if (err) throw err

        // pics by tag
        sbot.tags.get(function (err, tags) {
            // json for the tag nav
            if (err) throw err
            // console.log('**aaaaaa**', tags[id])
            // console.log('**id**', id)
            console.log('**got tags**', tags)
            var tagsJson = JSON.stringify(Object.keys(tags))
            fs.writeFile(__dirname + '/src/tags.json', tagsJson, err => {
                if (err) throw err
                console.log('wrote tags json', __dirname + '/src/tags.json')
            })

            // make nav for the tag pages
            // `/visual-detritus` has all pics
            // `/visual-detritus/tag` has pics tagged with `tag`

            Object.keys(tags).forEach(function (tag) {
                var msgIds = tags[tag]
                createTagIndex(sbot, tag, msgIds)
            })
        })

        // this is a concatted list of html for posts, an index page
        var contentDetritus = ''
        // write the main stuff
        S(
            ssbWeb.getPosts({ id, sbot, type: 'ev.post', reverse: true }),
            ssbWeb.writeFiles(sbot, 'public/posts/img'),

            S.through(function noop(){}, function onEnd (err) {
                // now we have gotten all the posts, can write the
                // index/list of them
                if (err) throw err

                sbot.close(null, function (err) {
                    console.log('sbot closed', err)
                    if (err) throw err
                })

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

                fs.createReadStream(__dirname + '/src/_index.html')
                    .pipe(_hs)
                    .pipe(fs.createWriteStream(__dirname +
                        '/public/detritus/index.html'))
            }),
            S.drain(function ({ post, blob }) {
                // post.value.content
                // { type: 'ev.post', text: 'kkkkkkkkk', mentions: [Array] }

                var { key } = post
                var postPath = slugify(key)
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
            })
        )
    })
}

// pics()

devDiary(err => {
    if (err) console.log('err', err)
})

// doesn't work this way i don't know why
// devDiary(err => {
//     if (err) throw err
//     pics()
// })

