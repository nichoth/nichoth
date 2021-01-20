var fs = require('fs')
var marked = require('marked')
var hyperstream = require('hyperstream')
var mkdirp = require('mkdirp')

function webHow () {
    var srcContentPath = __dirname + '/src/website-how/README.md'
    fs.readFile(srcContentPath, 'utf8', (err, content) => {
        if (err) throw err
        var md = marked(content)
        mkdirp.sync(__dirname + '/public/website-how')
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname +
            '/public/website-how/index.html')

        var hs = hyperstream({
            'body': {
                class: { append: 'website-how' }
            },
            '#content': {
                _appendHtml: md
            }
        })

        rs.pipe(hs).pipe(ws)
    })
}

module.exports = webHow

if (require.main === module) {
    webHow()
}

