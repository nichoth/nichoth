var hyperstream = require('hyperstream')
var fs = require('fs')
var marked = require('marked')
var mkdirp = require('mkdirp')

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
            content += `<li class="post-bit">${marked(file)}</li> <hr>`

            // build the html page for that file
            var folderName = fileName.split('.')[0]
            mkdirp.sync(__dirname + '/public/software/' + folderName)
            var rs = fs.createReadStream(__dirname + '/src/_index.html')
            var hs = hyperstream({
                '#content':
                    fs.createReadStream(__dirname + '/src/dev-diary/' +
                    fileName)
            })
            rs
                .pipe(hs)
                .pipe(fs.createWriteStream(__dirname + '/public/software/' + 
                    folderName + '/index.html'))
        })

        content += '</ul>'
        
        var selectors = {
            '.development-diary': {
                _appendHtml: content
            }
        }
        var hs = hyperstream(selectors)
        var rs = fs.createReadStream(srcPath)

        cb(null, rs.pipe(hs))
    })
}

module.exports = devDiary
