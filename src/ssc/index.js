import { create } from 'ssc-keys'
// import ssc from '@nichoth/ssc'

// here we are just adding a new private key as a DOM element,
// so that it can be copied/pasted

create().then(kp => {
    const newElPriv = document.createElement('code')
    const newContentPriv = document.createTextNode(kp.privateKey);
    newElPriv.appendChild(newContentPriv)
    const containerPriv = document.getElementById('the-private-key')
    containerPriv.appendChild(newElPriv)

    const newElPub = document.createElement('code')
    const newContentPub = document.createTextNode(kp.publicKey);
    newElPub.appendChild(newContentPub)
    const containerPub = document.getElementById('the-public-key')
    containerPub.appendChild(newElPub)

    document.getElementById('copy-priv-key').addEventListener('click', ev => {
        navigator.clipboard.writeText(kp.privateKey)
        updateDOM('priv')
    })

    document.getElementById('copy-pub-key').addEventListener('click', ev => {
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

// create().then(kp => {
//     const exported = exportPrivateKey(kp)

//     const newEl = document.createElement('code')
//     const newContent = document.createTextNode(exported);
//     newEl.appendChild(newContent)

//     const container = document.getElementById('the-private-key')
//     container.appendChild(newEl)

//     document.getElementById('copy-priv-key').addEventListener('click', ev => {
//         ev.preventDefault()
//         navigator.clipboard.writeText(exported)
//         document.getElementById('copy-priv-key').insertAdjacentHTML(
//             'afterend',
//             '<span class="copied">copied!</span>'
//         )
//     })
    
//     // const linkEl = document.getElementById('ntl-button')
//     // const linkWithPrivKey = (linkEl.href + '#PRIV_KEY=' + exported)
//         // encodeURIComponent(exported))
//     // document.getElementById('ntl-button').href = linkWithPrivKey
// })
