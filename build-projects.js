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

        mkdirp.sync(__dirname + '/public/projects')
        var files = { 'dev-diary': [], 'website': [], 'miscellany': [] }
        var next = after(fileNames.length, writeProjectsHtml)

        function writeProjectsHtml (err) {
            if (err) throw err
            // now we have all the files

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
            var projectRs = fs.createReadStream(__dirname + '/src/_projects.html')
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
            var sorted = _.orderBy(list, fm => {
                return fm.date ? new Date(fm.date) : ''
            }, ['desc'])

            // find the most words that are in any article
            var maxLength = sorted.reduce((acc, file) => {
                // don't count the log, b/c its gigantic
                if (file.slug === 'log') return acc
                return file.words > acc ? file.words : acc
            }, 0)

            // need to find the relative # of words for the --width variable

            return sorted.reduce((acc, file) => {
                var { date } = file
                var isLog = file.slug === 'log'
                var isWeb = file.type === 'website'
                var percent = (file.words / maxLength) * 100

                acc += `<a href="/projects/${file.slug}"
                    ${(isLog || isWeb) ?
                        '' :
                        `style="--width: calc(${percent}% + 2rem);"`
                    }
                >
                    <div class="project ${file.slug}">
                        ${date ?
                            `<time datetime="${date}">${date}</time>` :
                            ''
                        }
                        <h3>${file.linkTitle}</h3>
                        ${marked(file.linkDesc)}
                    </div>
                    ${file.type === 'website' ?
                        '' :
                        `<div class="word-count">
                            ${
                                (Math.round(file.words / 200) || 1) +
                                ((Math.round(file.words / 200) || 1) === 1 ?
                                    ' minute' :
                                    ' minutes'
                                )
                            }
                        </div>`
                    }
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

                var length = parsed.content.match(/(\w+)/g).length;

                var { type, date, slug, type, linkTitle, linkDesc } = fm
                // end up with an object of
                // { typeA: [{ slug, linkTitle, linkDesc }] }

                // should have a date as a sortable string
                files[type].push({
                    type,
                    date,
                    slug,
                    linkTitle,
                    linkDesc,
                    words: length
                })

                next(null, files)
            })
        })

    })

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
                var { slug, type } = fm

                mkdirp.sync(__dirname + '/public/projects/' + slug)

                // in here, write the file
                var rs = fs.createReadStream(__dirname + '/src/_index.html')
                var ws = fs.createWriteStream(__dirname + '/public/projects/' +
                    slug + '/index.html')
                var hs = hyperstream({
                    'body': {
                        class: { append: slug + ' project' +  ` ${type}`}
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
