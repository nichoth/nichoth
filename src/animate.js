var DUR = 500

var email = document.getElementById('email');
// email.addEventListener('click', () => {
//     animate()
// })

email.addEventListener('mouseenter', function (ev) {
    animate()
})

email.addEventListener('mouseleave', function (ev) {
    unAnimate()
})

window.animate = animate

function unAnimate () {
    var lines = document.querySelectorAll('#square line')
    lines.forEach(line => {
        Velocity(line, {
            x1: line.x2.baseVal.value,
            y1: line.y2.baseVal.value
        }, {
            duration: DUR
        })
    })

    var frontSquare = document.getElementById('front-square')
    Velocity(frontSquare, { translateY: '0px', translateX: '0px' }, {
        duration: DUR
    })

    var frontV = document.getElementById('front-v')
    Velocity(frontV, { translateY: '0px', translateX: '0px' }, {
        duration: DUR
    })
}

function animate () {
    var lines = document.querySelectorAll('#square line')
    lines.forEach(line => {
        Velocity(line, {
            x1: line.x2.baseVal.value,
            y1: line.y2.baseVal.value
        }, {
            duration: DUR
        })
    })

    var frontSquare = document.getElementById('front-square')
    Velocity(frontSquare, { translateY: '20px', translateX: '20px' }, {
        duration: DUR
    })

    var frontV = document.getElementById('front-v')
    Velocity(frontV, { translateY: '20px', translateX: '20px' }, {
        duration: DUR
    })
}