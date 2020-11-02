import { render } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks'
import { html } from 'htm/preact';
var tags = require('./tags.json')

// the nav for tags

var el = document.getElementById('container')
render(html`<${TagNav} />`, el)

var _setIsOpen
function TagNav () {
    const [isOpen, setIsOpen] = useState(false);
    _setIsOpen = setIsOpen

    function toggleOpen (ev) {
        ev.preventDefault()
        console.log('click', ev)
        setIsOpen(!isOpen)
    }

    useLayoutEffect(() => {
        var el = document.getElementById('tag-nav')
        el.addEventListener('click', toggleOpen)

        console.log('isOpen', isOpen)

        return () => el.removeEventListener('click', toggleOpen);
    })

    if (isOpen) {
        return html`<div class="tag-nav-menu">
            <button class="close-btn" onclick=${toggleOpen}>×</button>
            <ul>
                ${tags.map(function (tag) {
                    return html`<li>${tag}</li>`
                })}
            </ul>
        </div>`
    }

    return null
}

// document.getElementById('tag-nav').addEventListener('click', ev => {
//     console.log('click', ev)
//     ev.preventDefault()
//     _setIsOpen(true)
// })
