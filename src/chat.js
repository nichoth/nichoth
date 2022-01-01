import { render } from 'preact'
import { html } from 'htm/preact'

var el = html`<div>chatting</div>`

render(el, document.getElementById('content'))
