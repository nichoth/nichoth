var hyperstream = require('hyperstream')
var fs = require('fs')
var mkdirp = require('mkdirp')
var marked = require('marked')
var glob = require("glob")
const matter = require('gray-matter')
var after = require('after')
var _ = {
    orderBy: require('lodash/orderBy')
}


function buildProjects () {
    // ---------- the /projects page ----------------------

    glob(__dirname + '/src/_posts/*', function (err, fileNames) {
        if (err) throw err

        // this gets called once

        mkdirp.sync(__dirname + '/public/projects')
        var files = { 'dev-diary': [], 'website': [], 'miscellany': [] }
        var next = after(fileNames.length, writeProjectsHtml)

        function writeProjectsHtml (err) {
            var projectRs = fs.createReadStream(__dirname + '/src/_projects.html')

            // now we have all the files
            // this gets called once

            if (err) throw err
            var hs = hyperstream({
                '.projects.dev-diary': {
                    // need to sort this array
                    _appendHtml: createLinkString(files['dev-diary'])
                },
                '.projects.websites': {
                    _appendHtml: createLinkString(files.website)
                },
                '.projects.miscellany': {
                    _appendHtml: createLinkString(files.miscellany)
                }
            })

            var rs = fs.createReadStream(__dirname + '/src/_index.html')
            var ws = fs.createWriteStream(__dirname + '/public/projects/index.html')
            var projectPageStream = projectRs.pipe(hs)

            var fileHs = hyperstream({
                'body': {
                    class: { append: 'projects-body' }
                },
                '#content': projectPageStream
            })
            rs.pipe(fileHs).pipe(ws)
        }

        function createLinkString (list) {

            // in here, need to determine the order of the links

            var sorted = _.orderBy(list, ['date'], ['desc'])
            return sorted.reduce((acc, file) => {
                console.log('**file**', file)
                var { date } = file
                acc += `<a href="/projects/${file.slug}">
                    <div class="project ${file.slug}">
                        ${date ?
                            `<time datetime="${date}">${date}</time>` :
                            ''
                        }
                        <h3>${file.linkTitle}</h3>
                        <p>${file.linkDesc}</p>
                    </div>
                </a>`
                return acc
            }, '')
        }


        // map the fileNames to [{ slug, linkTitle, linkDescription }]
        fileNames.forEach(function (filePath) {

            // this get called once for each file in `_posts`

            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) return next(err)
                var parsed = matter(file)
                var fm = parsed.data
                var { date, slug, type, linkTitle, linkDesc } = fm
                // end up with an object of
                // { typeA: [{ slug, linkTitle, linkDesc }] }

                // should have a date as a sortable string
                files[type].push({ date, slug, linkTitle, linkDesc })

                next(null, files)
            })
        })

    })

    // ---------- /the /projects page ----------------------


    // write the 'posts'
    // (the content that the /projects page links to)
    glob(__dirname + '/src/_posts/*', function (err, files) {
        if (err) throw err

        files.forEach(function (filePath) {
            // filePath is the full path
            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) throw err
                var parsed = matter(file)
                var fm = parsed.data
                var { slug } = fm

                mkdirp.sync(__dirname + '/public/projects/' + slug)

                // in here, write the file
                var rs = fs.createReadStream(__dirname + '/src/_index.html')
                var ws = fs.createWriteStream(__dirname + '/public/projects/' +
                    slug + '/index.html')
                var hs = hyperstream({
                    'body': {
                        class: { append: slug + ' project' }
                    },
                    '#content': {
                        _appendHtml: marked(parsed.content)
                    }
                })
                rs.pipe(hs).pipe(ws)
            })
        })
    })
}

module.exports = buildProjects
