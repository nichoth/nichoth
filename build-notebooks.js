const fs = require('fs');
var minimist = require('minimist');
const mkdirp = require('mkdirp');
var path = require('path')
const hyperstream = require('hyperstream');

function notebooks (cb) {
    // process.stdin.pipe(process.stdout)
    var argv = minimist(process.argv.slice(2))
    var fileNames = argv._

    var html = `<ul>
    `

    mkdirp.sync(__dirname + '/public/notebooks')
    mkdirp.sync(__dirname + '/public/img/notebooks')

    fileNames.forEach(fileName => {
        // first copy the files
        var imgWS = fs.createWriteStream(__dirname + '/public/img/notebooks/' +
            path.basename(fileName))
        fs.createReadStream(fileName)
            .pipe(imgWS)


        // create a page for that image only
        var _hs = hyperstream({
            '#content': {
                _appendHtml: `<div class="notebook-page">
                    <img src="/img/notebooks/${path.basename(fileName)}">
                </div>`,
                class: { append: 'notebook-page' }
            },
            'body': {
                class: { append: 'notebook-page' }
            }
        })

        var writePath = (__dirname + '/public/notebooks/' +
            path.basename(fileName, '.jpg'))
        mkdirp.sync(writePath)

        var __ws = fs.createWriteStream(writePath + '/index.html')
        __ws.on('error', err => {
            console.log('foooooo', err)
        })
        fs.createReadStream(__dirname + '/src/_index.html')
            .pipe(_hs)
            .pipe(__ws)


        // create html for the index page
        html += `<li>
            <a href="/notebooks/${path.basename(fileName, '.jpg')}">
                <img src="/img/notebooks/${path.basename(fileName)}">
            </a>
        </li>
        `
    })

    html += '</ul>'

    // write index file
    var indexWS = fs.createWriteStream(__dirname +
        '/public/notebooks/index.html')
    var hs = hyperstream({
        '#content': {
            _appendHtml: html,
            class: { append: 'notebooks' }
        },
        'body': {
            class: { append: 'notebooks' }
        }
    })

    fs.createReadStream(__dirname + '/src/_index.html')
        .pipe(hs)
        .pipe(indexWS)
}

module.exports = notebooks

if (require.main === module) {
    notebooks(err => {
        if (err) throw err
    })
}

