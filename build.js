var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var Tags = require('@nichoth/ssb-tags')
var S = require('pull-stream')
var mkdirp = require('mkdirp')
var slugify = require('@sindresorhus/slugify')
var after = require('after')
var marked = require('marked')
// var ssbTags = require('ssb-tags')
// var ScuttleTag = require('scuttle-tag')

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


function devDiary () {
    mkdirp.sync(__dirname + '/public/dev-diary')
    var content = '<ul>'

    fs.readdir('./src/dev-diary', function (err, files) {
        console.log('err', err)
        console.log('files', files)
        files.forEach(function (fileName) {
            // parse the md and append the first bit to `content` string
            // append the full version to it's own file at /dev-diary/post
            var path = __dirname + '/src/dev-diary/' + fileName
            var file = fs.readFileSync(path, 'utf8')
            content += `<li claass="post-bit">${marked(file)}</li>`
        })

        content += '</ul>'
        var selectors = {
            '#content': {
                _appendHtml: content
            }
        }
        var hs = hyperstream(selectors)
        var rs = fs.createReadStream(__dirname + '/src/_index.html')

        var outPath = __dirname + '/public/dev-diary/index.html'
        rs.pipe(hs).pipe(fs.createWriteStream(outPath))
    })
}


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
// function devDiary (cb) {
//     var _plugins = [ ssbTags ]
//     ssbWeb.startSbot('ssb', _plugins, function (err, { id, sbot }) {
//         if (err) throw err

//         var scuttleTag = ScuttleTag(sbot)
//         // console.log('herererere', ScuttleTag)
//         // var allTags = scuttleTag.allTags(sbot)
//         var allTags = scuttleTag.obs.allTags(tags => {
//             console.log('tagggggs', tags)
//         })
//         console.log('obs', scuttleTag.obs)
//         console.log('all tags', allTags)
//         console.log('all tags 2', scuttleTag.obs.allTags)
//         // allTags(tags => console.log('**tags**', tags))

//         sbot.tags.get(function (err, tags) {
//             if (err) throw err
//             console.log('**tags**', tags)
//             console.log('**id**', id)
//             console.log('**tags id**', tags[id])

//             sbot.close(function (err) {
//                 console.log('sbot closed', err)
//                 if (err) throw err
//                 if (cb) cb(err)
//             })


//             // S(
//             //     sbot.tags.stream(),
//             //     S.drain(function (tag) {
//             //         console.log('in drain', tag)
//             //     }, function done (err) {
//             //         console.log('all done', err)

//             //         sbot.close(function (err) {
//             //             console.log('sbot closed', err)
//             //             if (err) throw err
//             //             if (cb) cb(err)
//             //         })
//             //     })
//             // )


//         })
//     })
// }

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
            })
        )
    })
}

pics()
devDiary()

// devDiary(err => {
//     if (err) console.log('err', err)
// })

// doesn't work this way i don't know why
// devDiary(err => {
//     if (err) throw err
//     pics()
// })

