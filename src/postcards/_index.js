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

// ------------ /write a page for each picture -------------



// ---------------- write the index html here --------------

const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'public',
    'postcards', 'index.html'))

const html = getPostcardHtml()
const withWords = `
    <h1>Postcards</h1>

    <p>
        You can <a href="https://opensea.io/collection/postcards">purchase
        these on the internet.</a>
    </p>

    <p>
        I made these postcards in the past when I was a student. I worked in a
        photo studio/laboratory at the time, and this was a fun way to pass
        the time, printing silly postcards on the fancy photo printers.
        I noticed that people enjoy them.
    </p>

    <p>
        On one hand this was kind of interesting just to see what it's like
        for a regular civilian (non computer person) to create an NFT. The thing
        that surprised me is <em>how much trust</em> is involved in the
        trustless ecosystem. This is coming from someone who read and
        appreciated
        <a href="https://moxie.org/2022/01/07/web3-first-impressions.html">
            Moxie's article
        </a>
    </p>

    <p>
        People are trusting me to not change a URL. And the whole thing feels
        very <em>early internet</em>, if that's a thing. I made some HTML for each NFT
        more or less by hand, and it is hosted on my "personal web page".
    </p>

    <p>
        If you want, I can send a real, physical copy of the postcard to you
        in the mail.
    </p>

    <hr>

    <p>
        I want to write more details about my motivation here. As a US citizen
        who is now without employment, healthcare is not so easy to get.
        My partner/spouse person, for example, has a very serious TMJ condition
        that even most insurance, if you do have it, simply does not cover.
        They have what is called a "TMJ exclusion", which means they wont help
        you with it at all. So the long story is that I just need money to pay
        for our lives, and this is me being desperate with how to get ahold of
        it.

        Sorry it's dark, but should be ok since this is the monologue.

    </p>

    <hr>

    <p>
        Most NFTs I've seen seem to be computer-generated avatar like things.
        Which is kind of interesting because the artwork is more the fact that
        someone with money thinks it's cool to spend it frivolously than the
        picture itself… I could think about that too much; I'm a former art
        major, etc 
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
