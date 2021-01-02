var hyperstream = require('hyperstream')
var fs = require('fs')
var mkdirp = require('mkdirp')
var marked = require('marked')

function devDiary (srcPath, cb) {
    var content = '<ul>'

    fs.readdir('./src/dev-diary', function (err, files) {
        console.log('err', err)
        console.log('files', files)
        if (err) return cb(err)
        files.forEach(function (fileName) {
            // parse the md and append the first bit to `content` string
            // append the full version to it's own file at /dev-diary/post
            var path = __dirname + '/src/dev-diary/' + fileName
            var file = fs.readFileSync(path, 'utf8')
            var markdownContent = marked(file)
            var folderName = fileName.split('.')[0]
            content += `<li class="post-bit">
                <a href="${'/software/' + folderName}">${markdownContent}</a>
            </li>
            <hr>`

            // build the html page for that file
            mkdirp.sync(__dirname + '/public/software/' + folderName)
            var rs = fs.createReadStream(__dirname + '/src/_index.html')
            var hs = hyperstream({
                body: {
                    class: { append: 'diary-entry' }
                },

                '.site-nav a[href="/software"]': {
                    class: { append: 'active' }
                },

                '#content': markdownContent,
                '.site-nav a[href="/software"]': {
                    class: { append: 'active' }
                }
            })
            rs.pipe(hs)
                .pipe(fs.createWriteStream(__dirname + '/public/software/' +
                    folderName + '/index.html'))
        })

        // remove the last hr
        var lines = content.split("\n")
        lines.pop()
        var _content = lines.join("\n")

        _content += '</ul>'

        var selectors = {
            '.development-diary': {
                _appendHtml: _content
            }
        }
        var hs = hyperstream(selectors)
        var rs = fs.createReadStream(srcPath)

        cb(null, rs.pipe(hs))
    })
}

if (require.main === module) {
    devDiary(__dirname + '/src/software.html', (err, stream) => {
        if (err) throw err
        mkdirp(__dirname + '/public/software')
        var ws = fs.createWriteStream(__dirname +
                '/public/software/index.html')
        var rs = fs.createReadStream(__dirname + '/src/_index.html')
        var hs = hyperstream({
            '#content': stream,
            '.site-nav a[href="/software"]': {
                class: { append: 'active' }
            },
            'body': {
                class: { append: 'software' }
            }
        })
        rs.pipe(hs).pipe(ws)
    })
}

module.exports = devDiary

