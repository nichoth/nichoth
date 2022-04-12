var hyperstream = require('hyperstream')
var fs = require('fs')
// var glob = require("glob")
const path = require('path')

const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'public',
    'postcards', 'index.html'))

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
        _appendHtml: `<p>foo bar</p>`
    }
})

rs.pipe(hs).pipe(ws)
