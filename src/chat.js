var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hub = signalhub('my-app-name', [
    'https://hub-world.herokuapp.com/'  // a free sugnal-hub server I made
])
var observ = require('observ')
var struct = require('observ-struct')
var onend = require('end-of-stream')
import { render } from 'preact'
import { html } from 'htm/preact'
import { useState } from 'preact/hooks'
var randombytes = require('randombytes')

var state = struct({
    peers: observ({}),
    msgs: observ([])
})

function addMsg (_, msg) {
    var newMsgs = state.msgs().concat([msg])
    state.msgs.set(newMsgs)
}

var swarm = wswarm(hub)

swarm.on('peer', function (stream, id) {
    console.log('CONNECTED to a new peer', id)
    var _peers = state.peers()
    _peers[id] = stream
    state.peers.set(_peers)

    stream.on('data', function (data) {
        var [msgId, msgContent] = parseMsg(data)
        console.log('got data', msgId, msgContent)
        addMsg(msgId, msgContent)
    })

    onend(stream, () => {
        var peers = state.peers()
        delete peers[id]
        state.peers.set(peers)
    })
})

render(html`<${ChatRoom} />`, document.getElementById('content'))

function sendMsg (msgId, msgContent) {
    var msg = encodeMsg(msgId, msgContent)
    Object.keys(state().peers).forEach(function (peerId) {
        state().peers[peerId].write(msg)
    })
}

function submitMsg (ev) {
    ev.preventDefault()
    var msgId = randombytes(8).toString('hex')
    var msgContent = ev.target.elements.newMsg.value
    addMsg(msgId, msgContent)
    sendMsg(msgId, msgContent)
    ev.target.reset()
}

function parseMsg (msg) {
    var parts = msg.toString().split(',')
    var msgContent = parts.slice(1).join(',')
    var msgId = parts[0]
    return [msgId, msgContent]
}

function encodeMsg (msgId, msgContent) {
    return (msgId + ',' + msgContent)
}

state(function onChange (newState) {
    console.log('*state change*', newState)
})

function ChatRoom () {
    var [_state, setState] = useState(state())
    state(function onChange (newState) {
        setState(newState)
    })
    console.log('*render*', _state)

    return html`
        <h2>peers</h2>
        <dl>
            ${Object.keys(_state.peers).map(peerId => {
                return html`
                    <dt>peer ID</dt>
                    <dd>${peerId}</dd>
                `
            })}
        </dl>

        ${_state.msgs.map(msg => {
            return html`<p class="msg">${msg}</p>`
        })}

        <form id="msg-form" class="msg-input" onSubmit=${submitMsg}>
            <textarea id="newMsg" name="newMsg" cols="44" rows="12"></textarea>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    `
}
