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

        // map the fileNames to [{ slug, linkTitle, linkDescription }]
        fileNames.forEach(function (filePath) {
            // this get called once for each file in `_posts`

            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) return next(err)
                var parsed = matter(file)
                var frontmatter = parsed.data

                var length = parsed.content.match(/(\w+)/g)?.length || 0;

                var { type, date, slug, type, linkTitle, linkDesc } = frontmatter
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

        function writeProjectsHtml (err) {
            if (err) throw err
            // now we have all the files

            var hs = hyperstream({
                '.projects.dev-diary': {
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
            var sorted = _.orderBy(list, frontmatter => {
                return frontmatter.date ? new Date(frontmatter.date) : ''
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

                console.log('**post**', file.slug)
                console.log('**date**', date)
                const dateString = new Intl.DateTimeFormat('en-US')
                    .format(date)
                    .replace(/\//g, "-")

                acc += `<a href="/projects/${file.slug}"
                    ${(isLog || isWeb) ?
                        '' :
                        `style="--width: calc(${percent}% + 2rem);"`
                    }
                >
                    <div class="project ${file.slug}">
                        ${date ?
                            `<time datetime="${date}">${dateString}</time>` :
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
                var frontmatter = parsed.data
                var { date, slug, type, linkDesc, linkTitle } = frontmatter

                mkdirp.sync(__dirname + '/public/projects/' + slug)

                // in here, write the file
                var rs = fs.createReadStream(__dirname + '/src/_index.html')
                var ws = fs.createWriteStream(__dirname + '/public/projects/' +
                    slug + '/index.html')
                var hs = hyperstream({
                    'head': {
                        _appendHtml: `<meta property="og:title"
                            content="${linkTitle}" />

                        <meta property="og:type" content="article" />

                        <meta name="og:site_name" content="nichoth"></meta>

                        <meta property="og:url"
                            name="og:url"
                            content="https://nichoth.com/projects/${slug}" />

                        <meta property="twitter:url"
                            content="https://nichoth.com/projects/${slug}" />

                        <meta name="twitter:description"
                            content="${linkDesc}" />

                        <meta name="twitter:image"
                            content="https://nichoth.com/img/cube.png" />
                        
                        <meta property="og:description"
                            content="${linkDesc}" name="description" />
                        
                        <meta property="og:image"
                            content="https://nichoth.com/img/cube.png" />
                        `
                    },
                    'title': {
                        _appendHtml: ' | ' + linkTitle
                    },
                    'body': {
                        class: { append: slug + ' project ' + type}
                    },
                    '#content': {
                        _appendHtml: `<div class="date">
                            ${date ? 
                                `<time datetime="${date}">
                                    ${date}
                                </time>` :
                                ''
                            }
                        </div>` +
                        marked(parsed.content)
                    }
                })

                rs.pipe(hs).pipe(ws)
            })
        })
    })
}

module.exports = buildProjects
