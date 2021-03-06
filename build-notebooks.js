const fs = require('fs');
var minimist = require('minimist');
const mkdirp = require('mkdirp');
var path = require('path')
const hyperstream = require('hyperstream');
var sharp = require('sharp')

function notebooks (cb) {
    var argv = minimist(process.argv.slice(2))
    var fileNames = argv._

    var html = `<p>a fun thing about having many saved notebooks is that
        you get to rediscover them later and it's kind of funny</p>
    <ul>`

    mkdirp.sync(__dirname + '/public/notebooks')
    mkdirp.sync(__dirname + '/public/img/notebooks')

    fileNames.forEach(fileName => {
        // first copy the files
        var imgWS = fs.createWriteStream(__dirname + '/public/img/notebooks/' +
            path.basename(fileName))
        fs.createReadStream(fileName)
            .pipe(imgWS)

        // ---------- create a small version ------------
        const transformer = sharp().withMetadata().resize({
            width: 300,
            height: 300,
            fit: sharp.fit.outside,
            position: sharp.strategy.entropy,
            withoutEnlargement: true
        })

        fs.createReadStream(fileName)
            .pipe(transformer)
            .pipe(fs.createWriteStream(__dirname + '/public/img/notebooks/' +
                path.basename(fileName, '.jpg') + '-sm.jpg')
            )
        // -------------------------------------------------------------


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
        var smallPic = path.basename(fileName, '.jpg') + '-sm.jpg'
        html += `<li>
            <a href="/notebooks/${path.basename(fileName, '.jpg')}">
                <img src="/img/notebooks/${smallPic}">
            </a>
        </li>
        `
    })

    html += '</ul>'


    var headPart = `<div class="head-part">
        <div class="site-nav">
            <a href="/" class="home-link">
                <img src="/img/b.png" alt="cube">
            </a>
        </div>

        <h1>Notebooks</h1>
    </div>`

    // write index file
    var indexWS = fs.createWriteStream(__dirname +
        '/public/notebooks/index.html')
    var hs = hyperstream({
        '#content': {
            _appendHtml: html,
            class: { append: 'notebooks' }
        },
        'body': {
            _prependHtml: headPart,
            class: { append: 'notebooks' }
        }
    })

    fs.createReadStream(__dirname + '/src/_index.html')
        .pipe(hs)
        .pipe(indexWS)
        .once('close', cb)
}

module.exports = notebooks

if (require.main === module) {
    notebooks(err => {
        if (err) throw err
    })
}

