var hyperstream = require('hyperstream')
var fs = require('fs')
var mkdirp = require('mkdirp')
var marked = require('marked')
var path = require('path')
var glob = require("glob")
const matter = require('gray-matter')
var after = require('after')


// ---------- the /projects page ----------------------

glob(__dirname + '/src/_posts/*', function (err, fileNames) {
    if (err) throw err

    // this gets called once

    mkdirp.sync(__dirname + '/public/projects')
    var files = { 'dev-diary': [], 'website': [], 'miscellany': [] }
    var next = after(fileNames.length, writeProjectsHtml)

    function writeProjectsHtml (err) {
        var projectRs = fs.createReadStream(__dirname + '/src/_projects.html')

        // now we have all the files
        // this gets called once

        if (err) throw err
        var hs = hyperstream({
            '.projects.dev-diary': {
                _appendHtml: createLinkString(files['dev-diary'])
            },
            '.projects.websites': {
                _appendHtml: createLinkString(files.website)
            },
            '.projects.miscellany': {
                _appendHtml: createLinkString(files.miscellany)
            }
        })

        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/projects/index.html')
        var projectPageStream = projectRs.pipe(hs)

        var fileHs = hyperstream({
            'body': {
                class: { append: 'projects-body' }
            },
            '#content': projectPageStream
        })
        rs.pipe(fileHs).pipe(ws)
    }

    function createLinkString (list) {
        return list.reduce((acc, file) => {
            acc += `<a href="${file.slug}">
                    <div class="project ${file.slug}">
                        <h3>${file.linkTitle}</h3>
                        <p>${file.linkDesc}</p>
                    </div>
                </a>`
            return acc
        }, '')
    }


    // map the fileNames to [{ slug, linkTitle, linkDescription }]
    fileNames.forEach(function (filePath) {

        // this get called once for each file in `_posts`

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) return next(err)
            var parsed = matter(file)
            var fm = parsed.data
            var { slug, type, linkTitle, linkDesc } = fm
            // end up with an object of
            // { typeA: [{ slug, linkTitle, linkDesc }] }
            files[type].push({ slug, linkTitle, linkDesc })
            next(null, files)
        })
    })

})

// ---------- /the /projects page ----------------------


// write the 'posts'
// (the content that the /projects page links to)
glob(__dirname + '/src/_posts/*', function (err, files) {
    if (err) throw err

    files.forEach(function (filePath) {
        // filePath is the full path
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
                    class: { append: slug + ' project' }
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
var arr = ['list.md', 'examples.html']
arr.forEach(function (_path) {
    var fileType = path.extname(_path)
    fs.readFile(__dirname + '/src/' + _path, 'utf8', (err, file) => {
        if (err) throw err
        var content = file
        if (fileType === '.md') {
            content = marked(file)
        }
        var name = path.basename(_path, fileType)
        mkdirp.sync(__dirname + '/public/' + name)
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/' + name +
            '/index.html')
        var hs = hyperstream({
            'title': { _appendHtml: ' - ' + name },
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
