var urlJoin = require('url-join');
var router = require('routes')();
var endpoints = require('../endpoints')

Object.keys(endpoints).forEach((k) => {
  var path = urlJoin('/', endpoints[k]);
  router.addRoute(path, function(done) {
    done(k);
  });
});

router.addRoute('/', function(done) {
  done();
});

module.exports = router;
