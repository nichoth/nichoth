var fs = require('fs')
var marked = require('marked')
var hyperstream = require('hyperstream')
var mkdirp = require('mkdirp')

function list () {
    fs.readFile(__dirname + '/src/list.md', 'utf8', (err, content) => {
        if (err) throw err
        var md = marked(content)
        mkdirp.sync(__dirname + '/public/list')
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/list/index.html')

        var hs = hyperstream({
            'body': {
                class: { append: 'the-list' }
            },
            '#content': {
                _appendHtml: md
            }
        })

        rs.pipe(hs).pipe(ws)
    })
}

module.exports = list

if (require.main === module) {
    list()
}


