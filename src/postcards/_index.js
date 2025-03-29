var hyperstream = require('hyperstream')
var fs = require('fs')
const path = require('path')
const postcardJson = require('./cards')
const mkdirp = require('mkdirp')
const thingsJson = require('./things')

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
                        <a href="${card.seaLink}">see this on open sea</a>
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


    //  ------------ things you find ------------------
thingsJson.forEach(thing => {
    const hs = hyperstream({
        title: 'nichoth | ' + thing.title,

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
                <a class="back" href="/postcards#things-you-find">&lt;</a>
            `
        },

        '#content': {
            _appendHtml: `
                <img src="${thing.path}">
                <p>${thing.desc || thing.title}</p>
                ${thing.bigDesc ?
                    `<p>${thing.bigDesc}</p>` :
                    ''
                }
                ${thing.seaLink ? 
                    `<p>
                        <a href="${thing.seaLink}">see this on open sea</a>
                    </p>` :
                    ''
                }
            `
        }
    })
    const ext = path.extname(thing.path)
    const fileName = path.basename(thing.path, ext)
    const rs = fs.createReadStream(path.resolve(__dirname, '..',
        '_index.html'))
    mkdirp.sync(path.resolve(__dirname, '..', '..', 'public', 'postcards',
        fileName))
    const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..',
        'public', 'postcards', fileName, 'index.html'))
    rs.pipe(hs).pipe(ws)
})
    //  --------- /things you find -------------------


// ------------ /write a page for each picture -------------



// ---------------- write the index html here --------------

const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'public',
    'postcards', 'index.html'))

const html = getPostcardHtml()
const withWords = `
    <h1>Postcards</h1>

    <p>
        I made these postcards in the past when I was a student. I worked in a
        photo studio/laboratory at the time, and this was a fun way to pass
        the time, printing silly postcards on the fancy photo printers.
        I noticed that people enjoy them.
    </p>

` + html + `

    <hr>

    <h2 id="things-you-find">Things you find on the ground when you're walking
    to work in the morning</h2>

    <p>
        This is another series of photographs, inspired by the things i would
        find on the ground when I was walking to work in the morning. These were
        all made with a 4 &times; 5 view camera. The 4 &times; 5 size is
        great for post cards, so these were all made as contact prints, with any
        writing done by using an opaque marker on a transparent sheet.
    </p>

` + thingsJson.reduce((acc, thing) => {
        const ext = path.extname(thing.path)
        const fileName = path.basename(thing.path, ext)

        return acc + `<li class="postcard">
            <a href="/postcards/${fileName}">
                <img src="${thing.path}">
                <p>${thing.desc || thing.title}</p>
            </a>
        </li>`
    }, '<ul>') +
'</ul>'


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

    return postcardHtml
}
