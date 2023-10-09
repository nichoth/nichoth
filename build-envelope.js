const fs = require('fs');
const mkdirp = require('mkdirp');
const hyperstream = require('hyperstream');
// const esbuild = require('esbuild')

mkdirp.sync(__dirname + '/public/envelope')

var rs = fs.createReadStream(__dirname + '/src/_index.html')
var ws = fs.createWriteStream(__dirname + '/public/envelope/index.html')

/**
 * copy an html template
 */
var hs = hyperstream({
    'head': {
        _appendHtml: `
            <link rel="stylesheet" href="./envelope.css">
            <script type="importmap">
                {
                    "imports": {
                        "@socketsupply/tonic": "/tonic.min.js",
                        "@ssc-half-light/identity": "/identity.js",
                        "@oddjs/odd": "/odd.js"
                    }
                }
            </script>
        `
    },

    '#content': {
        class: { append: 'envelope-page' },
        _appendHtml: `
            <envelope-demo class="envelope-demo" id="envelope-demo"></envelope-demo>
            <script type="module" src="./envelope.js"></script>
        `
    },

    'body': {
        class: { append: 'envelope-page' },
    }
})

rs.pipe(hs).pipe(ws) 
