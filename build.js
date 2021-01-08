var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var Tags = require('@nichoth/ssb-tags')
// var S = require('pull-stream')
var mkdirp = require('mkdirp')
var slugify = require('@sindresorhus/slugify')
var after = require('after')
var devDiary = require('./build-dev-diary')
var examples = require('./build-examples')
var detritus = require('./build-detritus')

examples()

var srcPaths = [ 'websites' ]

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


// the visual detritus page
function picsTags () {
    // -------------- tags ---------------------
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
    // -------------- /tags ---------------------
    })
}

picsTags()

// ------- do the index page
detritus(function (err) {
    if (err) throw err
})
// -----------------------

devDiary(__dirname + '/src/software.html', (err, stream) => {
    if (err) throw err
    mkdirp(__dirname + '/public/software')
    var ws = fs.createWriteStream(__dirname + '/public/software/index.html')
    var rs = fs.createReadStream(__dirname + '/src/_index.html')
    var hs = hyperstream({
        '#content': stream,
        '.site-nav a[href="/software"]': {
            class: { append: 'active' }
        },
        'body': {
            class: { append: 'software' }
        }
    })
    rs.pipe(hs).pipe(ws)
})

