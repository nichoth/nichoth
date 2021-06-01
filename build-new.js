var hyperstream = require('hyperstream');
var fs = require('fs');
// var ssbWeb = require('ssb-web')
// var Tags = require('@nichoth/ssb-tags')
var mkdirp = require('mkdirp')
// var slugify = require('@sindresorhus/slugify')
// var after = require('after')
// var devDiary = require('./build-dev-diary')
// var examples = require('./build-examples')
// var detritus = require('./build-detritus')
var marked = require('marked')
var path = require('path')
var glob = require("glob")
const matter = require('gray-matter');





// the /projects page
mkdirp.sync(__dirname + '/public/projects')
var ws = fs.createWriteStream(__dirname + '/public/projects/index.html')
var rs = fs.createReadStream(__dirname + '/src/_index.html')
var hs = hyperstream({
    '#content': fs.createReadStream(__dirname + '/src/projects/index.html'),
    'body': { class: { append: 'projects-body' } }
})
rs.pipe(hs).pipe(ws)


// write the 'posts'
glob(__dirname + '/src/_posts/*', function (err, files) {
    if (err) throw err

    files.forEach(function (filePath) {
        // fileName is the full path
        console.log('file path', filePath)
        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) throw err
            var parsed = matter(file)
            var fm = parsed.data
            var { slug } = fm

            mkdirp.sync(__dirname + '/public/projects/' + slug)

            // in here, write the file
            var rs = fs.createReadStream(__dirname + '/src/_index.html')
            var ws = fs.createWriteStream(__dirname + '/public/projects/' +
                slug + '/index.html')
            var hs = hyperstream({
                'body': {
                    class: { append: slug }
                },
                '#content': {
                    _appendHtml: marked(parsed.content)
                }
            })
            rs.pipe(hs).pipe(ws)

        })
    })
})


// write some odd individual files (that aren't posts)
var srcPaths = ['list.md', 'examples.html']

srcPaths.forEach(function (_path) {
    var fileType = path.extname(_path)
    fs.readFile(__dirname + '/src/' + _path, 'utf8', (err, file) => {
        if (err) throw err
        var content = file
        if (fileType === '.md') {
            content = marked(file)
        }
        mkdirp.sync(__dirname + '/public/' + name)
        var name = path.basename(_path, fileType)
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/' + name +
            '/index.html')
        var hs = hyperstream({
            'body': {
                class: { append: name }
            },
            '#content': {
                _appendHtml: content
            }
        })
        rs.pipe(hs).pipe(ws)
    })
})










// list()

// function list () {
//     fs.readFile(__dirname + '/src/list.md', 'utf8', (err, content) => {
//         if (err) throw err
//         var md = marked(content)
//         mkdirp.sync(__dirname + '/public/list')
//         var rs = fs.createReadStream(__dirname + '/src/_index.html')
//         var ws = fs.createWriteStream(__dirname + '/public/list/index.html')

//         var hs = hyperstream({
//             'body': {
//                 class: { append: 'the-list' }
//             },
//             '#content': {
//                 _appendHtml: md
//             }
//         })

//         rs.pipe(hs).pipe(ws)
//     })
// }

// function examples () {
//     mkdirp.sync(__dirname + '/public/examples')
//     var hs = hyperstream({
//         '#content': fs.createReadStream(__dirname + '/src/examples.html'),
//         body: {
//             class: { append: 'examples' }
//         }
//     })
//     var rs = fs.createReadStream(__dirname + '/src/_index.html')
//     var outPath = __dirname + '/public/examples/index.html'
//     rs.pipe(hs).pipe(fs.createWriteStream(outPath))
// }

// examples()











// detritus(function (err) {
//     if (err) throw err
//     picsTags()
// })


// devDiary(__dirname + '/src/dev-diary.html', (err, stream) => {
//     if (err) throw err
//     mkdirp.sync(__dirname + '/public/dev-diary')
//     var ws = fs.createWriteStream(__dirname + '/public/dev-diary/index.html')
//     var rs = fs.createReadStream(__dirname + '/src/_index.html')
//     var hs = hyperstream({
//         '#content': stream,
//         '.site-nav a[href="/dev-diary"]': {
//             class: { append: 'active' }
//         },
//         'body': {
//             class: { append: 'dev-diary' }
//         }
//     })
//     rs.pipe(hs).pipe(ws)
// })


// // the /projects page
// mkdirp.sync(__dirname + '/public/projects')
// var ws = fs.createWriteStream(__dirname + '/public/projects/index.html')
// var rs = fs.createReadStream(__dirname + '/src/_index.html')
// var hs = hyperstream({
//     '#content': fs.createReadStream(__dirname + '/src/projects/index.html'),
//     'body': { class: { append: 'projects-body' } }
// })
// rs.pipe(hs).pipe(ws)


// fs.readFile(__dirname + '/src/_posts/ssc.md', (err, fileContent) => {
//     if (err) throw err;

//     // the ssc page
//     var sscHs = hyperstream({
//         '#content': marked(fileContent.toString()),
//         body: {
//             class: { append: 'ssc' }
//         }
//     })

//     mkdirp.sync(__dirname + '/public/ssc')
//     var sscRs = fs.createReadStream(__dirname + '/src/_index.html')
//     var sscOutPath = __dirname + '/public/ssc/index.html'
//     sscRs.pipe(sscHs).pipe(fs.createWriteStream(sscOutPath))
// });





// var srcPaths = [ 'websites' ]

// srcPaths.forEach(function (path) {
//     var obj = {
//         '#content': fs.createReadStream(__dirname + '/src/' + path + '.html'),
//         'body': {
//             class: { append: path }
//         }
//     }

//     obj['.site-nav a[href="/' + path + '"]'] = {
//         class: { append: 'active' }
//     }

//     var hs = hyperstream(obj)
//     var rs = fs.createReadStream(__dirname + '/src/_index.html')
//     mkdirp.sync(__dirname + '/public/' + path)
//     var outPath = __dirname + '/public/' + path + '/index.html'
//     rs.pipe(hs).pipe(fs.createWriteStream(outPath))
// })

// // an index.html page for a tag
// function createTagIndex (sbot, tag, msgIds) {
//     mkdirp.sync(__dirname + '/public/detritus/' + tag)

//     var posts = ''
//     var next = after(msgIds.length, write)
//     // create the html list of posts for this tag
//     msgIds.forEach(function (id) {
//         sbot.get(id, function (err, msg) {
//             // TODO -- get all mentions, not just the first
//             if (err) return next(err)
//             var hashSlug = slugify(msg.content.mentions[0].link)
//             posts += `<div class="post">
//                 <a href="/posts/${hashSlug}">
//                     <img src="/posts/img/${hashSlug}">
//                 </a>
//                 <p>${msg.content.text}</p>
//             </div>`

//             next(null, msg)
//         })
//     })

//     // write the index page for the tag index
//     function write () {

//         var headPart = `<div class="head-part">
//             <div class="site-nav">
//                 <a href="/" class="home-link">
//                     <img src="/img/b.png" alt="cube">
//                 </a>
//             </div>

//             <h1>${tag}</h1>

//             <div class="tag-nav">
//                 <button id="tag-nav">🏷️</button>
//             </div>
//         </div>`

//         var hs = hyperstream({
//             body: {
//                 _prependHtml: headPart,
//                 class: { append: 'tag-index' }
//             },

//             '#content': {
//                 _appendHtml: posts,
//                 class: { append: 'tag-index ' + tag }
//             }
//         })

//         fs.createReadStream(__dirname + '/src/_index.html')
//             .pipe(hs)
//             .pipe(fs.createWriteStream(__dirname + '/public/detritus/' +
//                 tag + '/index.html'))
//     }
// }


// // the visual detritus page
// function picsTags () {
//     // -------------- tags ---------------------
//     var plugins = [ Tags({ postType: 'ev.post' }) ]
//     ssbWeb.startSbot('ssb-ev', plugins, function (err, { id, sbot }) {
//         if (err) throw err

//         // pics by tag
//         sbot.tags.get(function (err, tags) {
//             // json for the tag nav
//             if (err) throw err
//             console.log('**got tags**', tags)
//             var tagsJson = JSON.stringify(Object.keys(tags))
//             fs.writeFile(__dirname + '/src/tags.json', tagsJson, err => {
//                 if (err) throw err
//                 console.log('wrote tags json', __dirname + '/src/tags.json')

//                 Object.keys(tags).forEach(function (tag) {
//                     var msgIds = tags[tag]
//                     createTagIndex(sbot, tag, msgIds)
//                 })

//                 sbot.close(null, function (err) {
//                     console.log('sbot closed', err)
//                 })
//             })
//         })
//     // -------------- /tags ---------------------
//     })
// }

