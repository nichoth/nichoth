import { create, exportPrivateKey } from 'ssc-keys'

const linkEl = document.getElementById('ntl-button')

create().then(kp => {
    const exported = exportPrivateKey(kp)
    const linkWithPrivKey = (linkEl.href + '#PRIV_KEY=' + exported)
        // encodeURIComponent(exported))
    document.getElementById('ntl-button').href = linkWithPrivKey
})
