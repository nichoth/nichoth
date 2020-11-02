var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var S = require('pull-stream')
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

function createTagIndex (sbot, tag, msgIds) {
    mkdirp.sync(__dirname + '/public/detritus/' + tag)

    var posts = ''
    var next = after(msgIds.length, write)
    // create the html list of posts for this tag
    msgIds.forEach(function (id) {
        sbot.get(id, function (err, msg) {
            // TODO -- get all mentions, not just the first
            if (err) return next(err)
            var hashSlug = slugify(msg.content.mentions[0].link)
            posts += `<div class="post">
                <a href="/posts/${hashSlug}">
                    <img src="/posts/img/${hashSlug}">
                    <p>${msg.content.text}</p>
                </a>
            </div>`

            next(null, msg)
        })
    })

    // write the index page with the post list
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
            }
        })
        
        fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(hs)
            .pipe(fs.createWriteStream(__dirname + '/public/detritus/' + tag +
                '/index.html'))
    }
}

// now the ssb stuff
var plugins = [
    require('@nichoth/ssb-tags')({ postType: 'ev.post' })
]

// the visual detritus page
ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
    if (err) throw err

    // pics by tag
    sbot.tags.get(function (err, tags) {
        console.log('*tags.get*', err, tags)

        // for the tag nav
        var tagsJson = JSON.stringify(Object.keys(tags))
        fs.writeFile(__dirname + '/src/tags.json', tagsJson, err => {
            if (err) throw err
            console.log('wrote tags json', __dirname + '/src/tags.json')
        })

        // need to make nav for the tag pages
        // `/visual-detritus` has all pics
        // `/visual-detritus/tag` has pics tagged with `tag`

        Object.keys(tags).forEach(function (tag) {
            var msgIds = tags[tag]
            createTagIndex(sbot, tag, msgIds)
        })
    })

    // this is a concatted list of html for posts, an index page
    var contentDetritus = ''
    S(
        ssbWeb.getPosts({ id, sbot, type: 'ev.post', reverse: true }),
        ssbWeb.writeFiles(sbot, 'public/posts/img'),

        S.through(function noop(){}, function onEnd (err) {
            // now we have gotten all the posts, can write the index/list
            // of them
            if (err) throw err

            sbot.close(null, function (err) {
                console.log('sbot closed', err)
            })

            // need to make a nav area for selecting tags
            var _hs = hyperstream({
                '#content': {
                    _appendHtml: `<div id="content-detritus">
                        ${contentDetritus}
                    </div>`
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
                    <p class="post-text">${post.value.content.text}</p>
                </a>
            </div>`
        })
    )
})
