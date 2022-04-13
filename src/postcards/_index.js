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

        '#content': {
            _appendHtml: `
                <img src="${card.path}">
                <p>${card.title}</p>
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
const hs = makeHs(html)
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
                <p>${card.title}</p>
            </a>
        </li>`
    }, '<ul>')

    postcardHtml += '</ul>'

    // process.nextTick(() => cb(null, postcardHtml))
    return postcardHtml
}
