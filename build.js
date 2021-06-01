var hyperstream = require('hyperstream');
var fs = require('fs');
var mkdirp = require('mkdirp')
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
        // filePath is the full path
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
var srcPaths = ['list.md', 'examples.html']

srcPaths.forEach(function (_path) {
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
