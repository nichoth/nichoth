const fs = require('fs');
const mkdirp = require('mkdirp');
const hyperstream = require('hyperstream');

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
                        "@oddjs/odd": "/odd.js",
                        "ky": "/ky.js",
                        "@ssc-half-light/request": "/request.js",
                        "@ssc-half-light/envelope": "/envelope.js",
                        "@ssc-half-light/message": "/message.js"
                    }
                }
            </script>
        `
    },

    '#content': {
        class: { append: 'envelope-page' },
        _appendHtml: `
            <envelope-demo class="envelope-demo" id="envelope-demo" id="env-demo">
            </envelope-demo>
        `
    },

    'body': {
        class: { append: 'envelope-page' },
        _appendHtml: `
            <hr>
            <div class="the-colophon">
                <small><strong>The Colophon</strong></small>

                <p>
                    This page is is made with tools provided by the browser as
                    much as possible. We are using <code>import</code>
                    statements to resolve ES modules, the view library uses
                    web components, and we are using the browser's
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle">
                        WebCrypto
                    </a>
                    API for all cryptography.
                </p>

                <p>
                    The build script for this page copies some JS files
                    from one folder to another, bundles some modules that have
                    dependencies, and builds the css, which uses
                    <a href="https://github.com/postcss/postcss-cli">postcss</a>,
                    so that I can use nesting. Modules are resolved by the
                    browser with an <code>importmap</code>.
                </p>

                <ul>
                    <li>
                        <code>importmap</code> in HTML:
<pre>
{
    "imports": {
        "@socketsupply/tonic": "/tonic.min.js",
        "@ssc-half-light/identity": "/identity.js",
        "@oddjs/odd": "/odd.js",
        "ky": "/ky.js",
        "@ssc-half-light/request": "/request.js",
        "@ssc-half-light/envelope": "/envelope.js"
    }
}
</pre>
                    </li>

                    <li>
                        <a href="https://tonicframework.dev/">Tonic framework</a>
                         &mdash; help with web components.
                    </li>

                    <li>
                        Persistent client-side keys via <a href="https://odd.dev/">
                        Fission's keystore library</a>
                    </li>

                    <li>
                        This page talks to a <a href="https://fauna.com/">
                        Fauna database</a>. We call a lambda function that
                        validates the message, and, if it is valid, we write
                        the message to the database.
                    </li>

                    <li>
                        Lambda functions &mdash; hosted with
                        <a href="https://www.netlify.com/">netlify</a>.
                        You can look at <a href="https://github.com/nichoth/nichoth-backend">
                        the backend code.</a>
                    </li>

                    <li>See <a href="https://github.com/nichoth/nichoth/blob/main/src/envelope/envelope.js">
                        the source code for this page.
                    </a></li>

                    <li>
                        The <strong>odds and ends</strong> &mdash;
                        <ul>
                            <li>
                                <a href="https://github.com/ssc-half-light/request">
                                <code>request</code>
                                </a> &mdash; authenticate http requests
                            </li>
                            <li>
                                <a href="https://github.com/ssc-half-light/message">
                                <code>message</code>
                                </a> &mdash; Create signed messages
                            </li>

                            <li>
                                <a href="https://github.com/ssc-half-light/identity">
                                    <code>identity</code>
                                </a> &mdash; Use multiple devices with one identity
                            </li>

                            <li>
                                <a href="https://github.com/ssc-half-light/envelope">
                                <code>envelope</code>
                                </a> &mdash; The thing we are demonstrating
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <script type="module" src="./envelope.js"></script>
        `
    }
})

rs.pipe(hs).pipe(ws) 
