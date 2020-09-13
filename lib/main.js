var DUR = 500

var email = document.getElementById('email');
email.addEventListener('click', () => {
    animate()
})

window.animate = animate

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

