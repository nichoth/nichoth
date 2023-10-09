import Tonic from '@socketsupply/tonic'
import { create as _createId } from '@ssc-half-light/identity'
import { program } from '@oddjs/odd'

/**
 * Look, no build tools
 * Everything is simply copied to the public directory, and resolved
 * via ESM + the browser
 */

async function createId (name) {
    const _program = await program({
        namespace: { creator: 'nichoth', name: 'nichoth.com' },
        debug: true
    })

    window.program = _program

    /**
     * Fission uses `session`s for their login state.
     * We are not doing that, because we don't need a full wnfs, only
     * the `crypto` component
     */

    const crypto = _program.components.crypto

    return await _createId(crypto, {
        humanName: name || 'test'
    })
}

/**
 * All identity state is derived from the public key DID,
 * which is saved in indexedDB.
 */

class IdentityView extends Tonic {
    render () {
        if (!this.props.identity) return
        return this.html`<div class="identity-view">
            <pre>${JSON.stringify(this.props.identity, null, 2)}</pre>
        </div>`
    }
}

class NewMessage extends Tonic {
    submit (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const msg = ev.target.elements.msg.value
        console.log('submit new message', msg)
    }

    render () {
        return this.html`<div>
            <h2>Send a message</h2>

            <p>
                This will use an envelope that I signed in advance with my
                keypair, which is <code>did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2QFw2XWbPxrrbwS2ha8yApyMoQicyamSGTuov6334CHXkw34vRhp7onJNqs6qr3mkfzwckU27kzV3A718mmpVc1Saban1k7jmedsfEtfaTbyLQp2Xa2GwqnDtAR7AbTSsXJroJe9N7L68jeHhSdyq2g9n5G8qnFMRrdBmDFM6ecPZLkHijieiHZj42JxFREHvy3uUjKjwyQVsYjWVFX32EBBpfTMez6vK9tahy5r2paYP7rHhzYz9MfcWHsWmn8voMzyRSUutBEKVCXbwtCGPR5moMKdyv8Q8skGNmVHw1D9BYgg8YoAmqatqRg3UZfhG8cWdusV4iuGFvygn2XaJS2ugAd6iF4ohHY1e</code>
            </p>

            <form class="new-msg">
                <textarea id="msg" name="msg" rows="5" cols="33">It was a dark and stormy night...</textarea>

                <button type="submit">send message</button>
            </form>
        </div>`
    }
}

class EnvelopeDemo extends Tonic {
    _crypto = null;

    constructor () {
        super()
        // we are not worried about name collisions in localStorage because
        // we own the domain.
        const id = JSON.parse(localStorage.getItem('identity'))
        this.state = { id }
    }

    async submit (ev) {
        ev.preventDefault()
        const name = ev.target.elements.humanName.value
        const id = await createId(name)
        this.state.id = id
        this.reRender()
    }

    render () {
        if (this.state.id) {
            return this.html`
                <h2>Your identity is:</h2>
                <identity-view identity=${this.state.id}></identity-view>

                <new-message></new-message>
            `
        }

        return this.html`
            <h1>envelopes</h1>
            <h2>What's all this then?</h2>
            <p>
                Envelopes that have been signed by the recipient. That way
                we don't have to reveal the sender's identity. Metadata of
                who is talking to whom stays hidden.
            </p>

            <p>
                This lets us do something like E2E encrypt the message, so that
                way you can send me a message, without my server ever learning
                <em>who you are</em>. So we preserve privacy while preventing
                spam.
            </p>

            <hr />

            <p>
                This is a toy webpage for demonstration purposes.
                Some things to note:
            </p>

            <p>
                By design, a webcrypto keypair can exist only in the context
                of the current domain &mdash; <code>nichoth.com</code>.
                <em>But</em>, we can use this keypair to authorize another
                keypair from any other domain.
            </p>

            <p>
                In practical terms, that means that we would use this keypair to
                sign a message saying that keypair 2, which is for
                a user on <code>example.com</code>, is equivalent to
                the keypair on this domain. This is common enough that it has a
                name &mdash; <a href="https://ucan.xyz/">UCAN</a>.
            </p>

            <p>
                So this gets us machine-readable identity &mdash; any
                website or app can trace any keypair through UCAN links, and
                find an ID that is meaningful to it.
            </p>

            <p>
                That means that identity can be decoupled from websites. So you
                now can have a single identity, traveling through various
                sites. Each site is just a place, not the owner of your ID.
            </p>

            <h2>Who am I</h2>

            <p>
                So that's pretty amazing. This gives us universal identity.
                A user on <code>nichoth.com</code> can be proven to be the
                same entity as a user on <code>your-website.com</code>.
            </p>

            <p>
                That was a bit of a digression.
            </p>

            <p>
                Back the the envelope. So, the envelope is a message that has
                been pre-signed by me. When you send a message through this
                page, we encrypt the message contents (including your identity),
                and send the encrypted message to my server. My server then
                checks that the envelope is valid (that is has been signed
                by me), and if it is valid, writes the message to a database,
                where it stays until I delete it.
            </p>

            <p>
                Lets examine that paragraph.
            </p>

            <p>
                For the purposes of demonstration, an identity has been created
                for you on this domain. This identity does nothing except
                allow you to submit this form.
            </p>

            <p>
                This is your DID on <code>nichoth.com</code>:
            </p>

            <p>
                Anyone can prove that this envelope is valid just by
                checking that the signature is valid. My server never learns
                <em>who</em> you are. To check validity, my server needs to make
                sure that the envelope is addressed to a valid user. For demo
                purposes there is only one valid user, me.
            </p>

            <p>
                In real life, the server might want to match your public key
                against a list of UCANs, or otherwise validate who you are. It
                could keep a list of DIDs that are allowed.
            </p>

            <hr />

            <form class="id-controls">
                <label>
                    Human name
                    <input name="humanName" />
                </label>
                <button type="submit">Get your identity</button>
            </form>
        `
    }
}

Tonic.add(NewMessage)
Tonic.add(EnvelopeDemo)
Tonic.add(IdentityView)
