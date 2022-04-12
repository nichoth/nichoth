var hyperstream = require('hyperstream')
var fs = require('fs')
var glob = require("glob")
const path = require('path')

const rs = fs.createReadStream(path.resolve(__dirname, '..', '_index.html'))
const ws = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'public',
    'postcards', 'index.html'))

getPostcardHtml((err, html) => {
    // console.log('wooo', err, html)

    // files.forEach(file => {
    //     // var name = path.basename(file, '.png')
    //     var name = path.basename(file)
    //     console.log('*name*', name)
    // })

    const hs = makeHs(html)
    rs.pipe(hs).pipe(ws)
})

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


function getPostcardHtml (cb) {
    const picPath = path.join(__dirname, '..', '..', 'public', 'postcards',
        '*.png')

    glob(picPath, (err, files) => {
        if (err) return cb(err)

        // console.log('*files*', files)

        var filesHtml = files.reduce((acc, file) => {
            return acc + `<li class="postcard">
                <img src="/postcards/${path.basename(file)}">
                <p>${path.basename(file, '.png')}</p>
            </li>`
        }, '<ul>')

        filesHtml += '</ul>'

        // cb(null, files.reduce((acc, file) => {
        //     return acc + ``
        // }), '')

        cb(null, filesHtml)
    })
}
