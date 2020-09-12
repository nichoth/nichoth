/*
var catchLinks = require('catch-links');
var singlePage = require('single-page');
var router = require('./routes');
var pageTmpl = require('./views/page.hbs');

var show = singlePage(function(href) {
  var m = router.match(href);
  m.fn(function updateDom(page) {
    document.querySelector('#content').innerHTML = pageTmpl({
      imgUrl: page ? '/img/'+page+'.png' : '/img/root.png',
      pages: Object.keys(require('./endpoints')).map((k) => {
        return {
          name: k,
          activeClass: page === k ? 'active' : '',
          href: '/'+k
        };
      })
    });
  });
});

catchLinks(document.body, show);
*/


var after = require('after');
var copies = Array.from( document.querySelectorAll('.icon-copy') );
// require('./animate')

// function animateIcon () {
//   var ts = ['-20', '-40', '-60'];
//   var iter = 0;

//   function position(i, iter) {
//     var j = iter - i;
//     var pos = j >= 0 && j <= 2 ? ts[j] : '0';
//     return pos;
//   }

//   var interval = setInterval(() => {
//     copies.forEach((c, i) => {
//       var pos = position(i, iter);
//       c.setAttribute('transform', 'translate(0,'+pos+')');
//     });
//     iter++;
//     if (iter >= copies.length*2) clearInterval(interval);
//   }, 200);
// }

window.vAnimate = vAnimate

function vAnimate(done) {
    var next = after(copies.length, done);

    function animateEl(el) {
    var DIST = '45px';
    return Velocity(el, { translateY: DIST, translateX: DIST }, {
        duration: 500,
        // easing: 'linear'
    })
        .then(() => Velocity(el, { opacity: 0 }, 100))
        .then(() => Velocity(el, {
            translateY: '0px',
            translateX: '0px',
            opacity: '0.6'
        },
        {
            duration: 0,
            complete: next
        }
        ))
    }

    var time = 0;
    copies.forEach(function(copy, i) {
        setTimeout(function (copy) {
            animateEl(copy)
        }, time+=70, copy)
    })
}

var email = document.getElementById('email');
email.addEventListener('click', (ev) => {
    vAnimate(() => {
        // console.log('done', email.href);
        console.log('done', ev)
    })
})

