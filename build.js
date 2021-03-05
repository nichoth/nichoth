var hyperstream = require('hyperstream');
var fs = require('fs');
var ssbWeb = require('ssb-web')
var Tags = require('@nichoth/ssb-tags')
var mkdirp = require('mkdirp')
var slugify = require('@sindresorhus/slugify')
var after = require('after')
var devDiary = require('./build-dev-diary')
var examples = require('./build-examples')
var detritus = require('./build-detritus')


examples()


detritus(function (err) {
    if (err) throw err
    picsTags()
})


devDiary(__dirname + '/src/dev-diary.html', (err, stream) => {
    if (err) throw err
    mkdirp.sync(__dirname + '/public/dev-diary')
    var ws = fs.createWriteStream(__dirname + '/public/dev-diary/index.html')
    var rs = fs.createReadStream(__dirname + '/src/_index.html')
    var hs = hyperstream({
        '#content': stream,
        '.site-nav a[href="/dev-diary"]': {
            class: { append: 'active' }
        },
        'body': {
            class: { append: 'dev-diary' }
        }
    })
    rs.pipe(hs).pipe(ws)
})


// the /projects page
mkdirp.sync(__dirname + '/public/projects')
var ws = fs.createWriteStream(__dirname + '/public/projects/index.html')
var rs = fs.createReadStream(__dirname + '/src/_index.html')
var hs = hyperstream({
    '#content': fs.createReadStream(__dirname + '/src/projects/index.html'),
    'body': { class: { append: 'projects-body' } }
})
rs.pipe(hs).pipe(ws)



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

// an index.html page for a tag
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
                </a>
                <p>${msg.content.text}</p>
            </div>`

            next(null, msg)
        })
    })

    // write the index page for the tag index
    function write () {

        var headPart = `<div class="head-part">
            <div class="site-nav">
                <a href="/" class="home-link">
                    <img src="/img/b.png" alt="cube">
                </a>
            </div>

            <h1>${tag}</h1>

            <div class="tag-nav">
                <button id="tag-nav">🏷️</button>
            </div>
        </div>`

        var hs = hyperstream({
            body: {
                _prependHtml: headPart,
                class: { append: 'tag-index' }
            },

            '#content': {
                _appendHtml: posts,
                class: { append: 'tag-index ' + tag }
            }
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
            console.log('**got tags**', tags)
            var tagsJson = JSON.stringify(Object.keys(tags))
            fs.writeFile(__dirname + '/src/tags.json', tagsJson, err => {
                if (err) throw err
                console.log('wrote tags json', __dirname + '/src/tags.json')

                Object.keys(tags).forEach(function (tag) {
                    var msgIds = tags[tag]
                    createTagIndex(sbot, tag, msgIds)
                })

                sbot.close(null, function (err) {
                    console.log('sbot closed', err)
                })
            })
        })
    // -------------- /tags ---------------------
    })
}
