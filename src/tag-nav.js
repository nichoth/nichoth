import { render } from 'preact';
import { useState } from 'preact/hooks'
import { html } from 'htm/preact';

var el = document.body
render(TagNav, el)

var _setIsOpen
function TagNav () {
    const [isOpen, setIsOpen] = useState(false);
    _setIsOpen = setIsOpen
    if (isOpen) {
        return html`<div class="tag-nav-menu">tag nav</div>`
    }
    return null
}

document.getElementById('tag-nav').addEventListener('click', ev => {
    console.log('click', ev)
    ev.preventDefault()
    _setIsOpen(true)
})
