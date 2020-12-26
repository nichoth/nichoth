import { render } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks'
import { html } from 'htm/preact';
var tags = require('./tags.json')

// the nav for tags

var el = document.body
render(html`<${TagNav} />`, el)

function TagNav () {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen (ev) {
        ev.preventDefault()
        setIsOpen(!isOpen)
    }

    useLayoutEffect(() => {
        var el = document.getElementById('tag-nav')
        if (el) el.addEventListener('click', toggleOpen)

        // console.log('isOpen', isOpen)

        return () => el.removeEventListener('click', toggleOpen);
    })

    if (isOpen) {
        var path = window.location.pathname
        console.log('path', path)

        return html`<div class="tag-nav-menu">
            <div class="tag-menu-controls">
                <button class="close-btn" onclick=${toggleOpen}>×</button>
            </div>
            <hr />
            <ul>
                ${tags.map(function (tag) {
                    var isPage = (path.indexOf(tag) != -1)
                    console.log('ispage', isPage, tag)
                    return html`<li>
                        <a
                            href="/detritus/${tag}"
                            class="${isPage ? 'active' : null}"
                        >${tag}</a>
                    </li>`
                })}
            </ul>
        </div>`
    }

    return null
}

