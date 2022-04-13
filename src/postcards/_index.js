var hyperstream = require('hyperstream')
var fs = require('fs')
const path = require('path')
const postcardJson = require('./cards')
const mkdirp = require('mkdirp')

// ------------ write a page for each picture -------------

postcardJson.forEach(card => {
    const hs = hyperstream({
        title: 'nichoth | ' + card.title,

        head: {
            _appendHtml: `<meta property="og:title" data-rh="true"
                content="nichoth | postcards">
            
            <meta property="og:description" data-rh="true"
                content="Postcards" name="description">
            
            <meta property="og:image" data-rh="true"
                content="https://nichoth.com/img/cube.png">
            `
        },

        body: {
            class: { append: 'single-postcard' }
        },

        '.site-nav': {
            _appendHtml: `
                <a class="back" href="/postcards">&lt;</a>
            `
        },

        '#content': {
            _appendHtml: `
                <img src="${card.path}">
                <p>${card.desc || card.title}</p>
                ${card.seaLink ? 
                    `<p>
                        <a href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/79173607740093432622172384412044296348039499574703038177878703075393844281345">see this on open sea</a>
                    </p>` :
                    ''
                }
            `
        }

    })

    const ext = path.extname(card.path)
    const fileName = path.basename(card.path, ext)

    const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
    mkdirp.sync(path.resolve(__dirname, '..', '..', 'public', 'postcards',
        fileName))
    const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..',
        'public', 'postcards', fileName, 'index.html'))
    rs.pipe(hs).pipe(ws)
})

// ------------ /write a page for each picture -------------



// ---------------- write the index html here --------------

const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'public',
    'postcards', 'index.html'))

const html = getPostcardHtml()
const withWords = `
    <h1>Postcards</h1>
    <p>
        You can purchase these on the internet.
    </p>
    <p>
        I made these postcards in the past when I was a student. I worked in a
        photo studio/laboratory at the time, and this was a fun way to pass
        the time, printing little postcards on the photo printers. I noticed
        that people enjoy them.
    </p>
    <p>
        If you want, I can send a real, physical copy of the postcard to you
        in the mail.
    </p>
` + html

const hs = makeHs(withWords)
rs.pipe(hs).pipe(ws)

// ---------------- /write the index html here --------------

function makeHs (content) {
    const hs = hyperstream({
        'title': 'nichoth | postcards',

        'head': {
            _appendHtml: `<meta property="og:title" data-rh="true"
                content="nichoth | postcards">
            
            <meta property="og:description" data-rh="true"
                content="Postcards" name="description">
            
            <meta property="og:image" data-rh="true"
                content="https://nichoth.com/img/cube.png">
            `
        },

        'body': {
            class: { append: 'postcards' }
        },

        '#content': {
            _appendHtml: content
        }
    })

    return hs
}


function getPostcardHtml () {
    var postcardHtml = postcardJson.reduce((acc, card) => {
        const ext = path.extname(card.path)
        const fileName = path.basename(card.path, ext)

        return acc + `<li class="postcard">
            <a href="/postcards/${fileName}">
                <img src="${card.path}">
                <p>${card.desc || card.title}</p>
            </a>
        </li>`
    }, '<ul>')

    postcardHtml += '</ul>'

    // process.nextTick(() => cb(null, postcardHtml))
    return postcardHtml
}
