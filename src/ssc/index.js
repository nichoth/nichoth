import { create, exportPrivateKey } from 'ssc-keys'

// const linkEl = document.getElementById('ntl-button')

create().then(kp => {
    const exported = exportPrivateKey(kp)

    const newEl = document.createElement('code')
    const newContent = document.createTextNode(exported);
    newEl.appendChild(newContent)

    const container = document.getElementById('the-private-key')
    container.appendChild(newEl)

    document.getElementById('copy-priv-key').addEventListener('click', ev => {
        ev.preventDefault()
        navigator.clipboard.writeText(exported)
        document.getElementById('copy-priv-key').insertAdjacentHTML(
            'afterend',
            '<span class="copied">copied!</span>'
        )
    })
    
    // const linkWithPrivKey = (linkEl.href + '#PRIV_KEY=' + exported)
        // encodeURIComponent(exported))
    // document.getElementById('ntl-button').href = linkWithPrivKey
})

