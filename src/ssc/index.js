import { create } from 'ssc-keys'

// here we are just adding a new private key as a DOM element,
// so that it can be copied/pasted

create().then(kp => {
    const newElPriv = document.createElement('code')
    const newContentPriv = document.createTextNode(kp.privateKey)
    newElPriv.appendChild(newContentPriv)
    const containerPriv = document.getElementById('the-private-key')
    containerPriv.appendChild(newElPriv)

    const newElPub = document.createElement('code')
    const newContentPub = document.createTextNode(kp.publicKey)
    newElPub.appendChild(newContentPub)
    const containerPub = document.getElementById('the-public-key')
    containerPub.appendChild(newElPub)

    document.getElementById('copy-priv-key').addEventListener('click', ev => {
        ev.preventDefault()
        navigator.clipboard.writeText(kp.privateKey)
        updateDOM('priv')
    })

    document.getElementById('copy-pub-key').addEventListener('click', ev => {
        ev.preventDefault()
        navigator.clipboard.writeText(kp.publicKey)
        updateDOM('pub')
    })
})

function updateDOM (type) {
    document.querySelectorAll('.copied').forEach(el => {
        el.remove()
    })

    if (type === 'priv') {
        return document.getElementById('copy-priv-key').insertAdjacentHTML(
            'afterend',
            '<span class="copied">copied!</span>'
        )
    }

    document.getElementById('copy-pub-key').insertAdjacentHTML(
        'afterend',
        '<span class="copied">copied!</span>'
    )
}
