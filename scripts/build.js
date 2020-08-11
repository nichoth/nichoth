var path = require('path');
var es = require('../lib/endpoints');
var fs = require('fs');
var indexPath = __dirname+'/../public/index.html';
var mdp = require('mkdirp');

Object.keys(es).forEach((k) => {
  var destPath = path.join(__dirname,'/../public/',k);
  mdp(destPath, (err) => {
    fs.createReadStream(indexPath)
      .pipe(fs.createWriteStream(path.join(destPath, '/index.html')))
    ;
  });
});
