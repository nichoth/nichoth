var fs = require('fs')
var marked = require('marked')
var hyperstream = require('hyperstream')
var mkdirp = require('mkdirp')

function flobz () {
    fs.readFile(__dirname + '/src/flobz/README.md', 'utf8', (err, content) => {
        if (err) throw err
        var md = marked(content)
        mkdirp.sync(__dirname + '/public/flobz')
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/flobz/index.html')

        var hs = hyperstream({
            'body': {
                class: { append: 'flobz-content' }
            },
            '#content': {
                _appendHtml: md
            }
        })

        rs.pipe(hs).pipe(ws)
    })
}

module.exports = flobz

if (require.main === module) {
    flobz()
}
