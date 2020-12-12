var fs = require('fs')

fs.readdir('./src/dev-diary', function (err, files) {
    console.log('err', err)
    console.log('files', files)
})

