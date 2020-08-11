var H = require('handlebars');
var es = require('../lib/endpoints');
var fs = require('fs');
var urlJoin = require('url-join');

fs.readFile(__dirname+'/../lib/views/page.hbs', {encoding: 'utf8'},
    (err, src) => {
  var tmpl = H.compile(src);
  Object.keys(es).forEach((k) => {
    var html = tmpl({
      pages: Object.keys(es).map((kk) => {
        return {
          name: es[kk],
          href: urlJoin('/', es[kk]),
          activeClass: es[k] === es[kk] ? 'active' : ''
        };
      }),
      imgUrl: urlJoin('/img', es[k])
    });
    fs.writeFile(__dirname+'/../public/'+k+'/index.html', html);
  });
});
