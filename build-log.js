var fs = require('fs')
var marked = require('marked')
var hyperstream = require('hyperstream')
var mkdirp = require('mkdirp')

function log () {
    fs.readFile(__dirname + '/src/log/README.md', 'utf8', (err, content) => {
        if (err) throw err
        var md = marked(content)
        mkdirp.sync(__dirname + '/public/log')
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var ws = fs.createWriteStream(__dirname + '/public/log/index.html')

        var hs = hyperstream({
            'body': {
                class: { append: 'the-log' }
            },
            '#content': {
                _appendHtml: `<div class="link">
                        <a href="/dev-diary">ssb dev diary</a>
                    </div>` + md
            }
        })

        rs.pipe(hs).pipe(ws)
    })
}

module.exports = log

if (require.main === module) {
    log()
}

