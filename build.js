var hyperstream = require('hyperstream')
var fs = require('fs')
var mkdirp = require('mkdirp')
var marked = require('marked')
var path = require('path')
var buildProjects = require('./build-projects')

buildProjects()

var arr = ['list.md', 'examples.html']
arr.forEach(function (_path) {
    var fileType = path.extname(_path)
    fs.readFile(__dirname + '/src/' + _path, 'utf8', (err, file) => {
        if (err) throw err
        let content = file
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

            'head': {
                _appendHtml: `<meta property="og:title" data-rh="true"
                    content="nichoth">
                
                <meta property="og:description" data-rh="true"
                    content="${path.basename(_path, fileType)}"
                        name="description">
                
                <meta property="og:image" data-rh="true"
                    content="https://nichoth.com/img/cube.png">
                `
            },

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
