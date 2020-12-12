var fs = require('fs')
var marked = require('marked')

fs.readdir('./src/dev-diary', function (err, files) {
    console.log('err', err)
    console.log('files', files)
    var path = __dirname + '/src/dev-diary/' + files[0]
    fs.readFile(path, 'utf8', (err, data) => {
        console.log('err', err)
        console.log('data', data)
        console.log('marked', marked(data))
    })
})
