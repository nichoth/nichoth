var hyperstream = require('hyperstream')
var fs = require('fs')
var mkdirp = require('mkdirp')
var mkdirp = require('mkdirp')

function examples () {
    mkdirp.sync(__dirname + '/public/examples')
    var hs = hyperstream({
        '#content': fs.createReadStream(__dirname + '/src/examples.html'),
        body: {
            class: { append: 'examples' }
        }
    })
    var rs = fs.createReadStream(__dirname + '/src/_index.html)
    var outPath = __dirname + '/public/examples/index.html'
    rs.pipe(hs).pipe(fs.createWriteStream(outPath))
}

module.exports = examples

