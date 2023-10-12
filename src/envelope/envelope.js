import { program } from '@oddjs/odd'
import ky from 'ky'
import { create as createEnvelope, wrapMessage } from '@ssc-half-light/envelope'
import { SignedRequest } from '@ssc-half-light/request'
import { create as _createId } from '@ssc-half-light/identity'
import Tonic from '@socketsupply/tonic'

/**
 * Look, no build tools
 * Everything is simply copied to the public directory, and resolved
 * via ESM + the browser
 */

let globalCrypto = null
// const URL_ROOT = 'https://nichoth-backend.netlify.app/api'
const URL_ROOT = 'http://localhost:8888/api'
const MY_DID = 'did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2QFw2XWbPxrrbwS2ha8yApyMoQicyamSGTuov6334CHXkw34vRhp7onJNqs6qr3mkfzwckU27kzV3A718mmpVc1Saban1k7jmedsfEtfaTbyLQp2Xa2GwqnDtAR7AbTSsXJroJe9N7L68jeHhSdyq2g9n5G8qnFMRrdBmDFM6ecPZLkHijieiHZj42JxFREHvy3uUjKjwyQVsYjWVFX32EBBpfTMez6vK9tahy5r2paYP7rHhzYz9MfcWHsWmn8voMzyRSUutBEKVCXbwtCGPR5moMKdyv8Q8skGNmVHw1D9BYgg8YoAmqatqRg3UZfhG8cWdusV4iuGFvygn2XaJS2ugAd6iF4ohHY1e'

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

class CreateEnvelope extends Tonic {
    async submit (ev) {
        const { request, identity } = this.props
        if (!request || !identity) throw new Error('missing request or id')
        ev.preventDefault()
        ev.stopPropagation()

        const crypto = globalCrypto
        const { envelopes } = this.props
        const latest = envelopes ? envelopes.length : 0
        const newEnvelope = await createEnvelope(crypto, {
            username: this.props.identity.username,
            seq: latest + 1
        })

        await request.post(URL_ROOT + '/envelope', {
            json: { envelope: newEnvelope }
        })

        this.props.oncreate(newEnvelope)
        console.log('done making envelope', this.props)
    }

    render () {
        if (!this.props.identity) return
        return this.html`<form class="create-envelope">
            <button type="submit">Create envelope</button>
        </form>`
    }
}

/**
 * The form to send a message
 */
class NewMessage extends Tonic {
    async submit (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const msg = ev.target.elements.msg.value
        console.log('this props', this.props)
        console.log('submit new message', msg)
        this.props.onsend(msg)
    }

    render () {
        window.props = this.props

        return this.html`<div>
            <h2>Send a message</h2>

            <p>
                This will use an envelope that I signed in advance with my
                keypair. The envelope <strong>looks like this:</strong>
                <pre>${JSON.stringify(this.props.envelopes[0], null, 2)}</pre>
            </p>

            <form class="new-msg">
                <textarea id="msg" name="msg" rows="5" cols="33">It was a dark and stormy night...</textarea>
                <button type="submit">send message</button>
            </form>
        </div>`
    }
}

class EnvelopeDemo extends Tonic {
    constructor () {
        super()

        this.state = {
            identity: null,
            crypto: null,
            request: null,
            envelopes: null,
            recipient: null
        }

        // fetch these right away
        this.init()

        // @ts-ignore
        window.state = this.state
    }

    async init () {
        await Promise.all([
            this.fetchEnvelopes(),
            this.fetchRecipient()
        ])

        this.reRender()
    }

    async fetchEnvelopes () {
        const envelopes = await ky.get(URL_ROOT + '/envelope').json()
        console.log('got envelopes', envelopes)
        this.state.envelopes = envelopes
    }

    async fetchRecipient () {
        const recp = await ky.get(URL_ROOT + '/get-nichoth').json()
        console.log('got recipient', recp)
        this.state.recipient = recp
    }

    // "get your identity" button
    async submit (ev) {
        ev.preventDefault()
        const name = ev.target.elements.humanName.value
        const [id, crypto] = await createId(name)
        this.state.identity = id
        this.state.crypto = globalCrypto = crypto
        this.state.request = SignedRequest(ky, crypto, window.localStorage)
        this.reRender()
        window.scrollTo(0, 0)
    }

    handleCreateEnvelope (newEnvelope) {
        this.state.envelopes.push(newEnvelope)
        this.reRender()
    }

    handleSendMsg (msg) {
        console.log('send message...', this.state)
        const { identity, recipient } = this.state
        const nextEnvelope = this.state.envelopes.shift()
        wrapMessage(
            identity,
            recipient,
            nextEnvelope,
            {
                from: { username: this.state.identity.username },
                text: msg
            }
        ).then(envelopedMsg => {
            console.log('enveloped -----', envelopedMsg)
            this.state.encryptedMsg = envelopedMsg
            this.reRender()
        })
    }

    render () {
        if (this.state.identity) {
            // check if rootDid is MY_DID
            // if so, show a form to create more envelopes
            // if not, show a form to send a new message
            return this.html`<div id="envelope-demo-content">
                <h2>Your identity is:</h2>
                <identity-view identity=${this.state.identity}></identity-view>

                ${this.state.identity.rootDid === MY_DID ?
                    this.html`<div>
                        <p>You are nichoth</p>
                        <p>number of envelopes: <span class="envelope-count">
                            ${this.state.envelopes ?
                                '' + this.state.envelopes.length :
                                '0'
                            }
                        </span></p>

                        ${!!(this.state.envelopes && this.state.envelopes[0]) ?
                            (this.html`<p>The envelopes look like this:</p>
                            <pre>${JSON.stringify(this.state.envelopes[0], null, 2)}</pre>`) :
                            ''
                        }

                        <create-envelope
                            oncreate=${this.handleCreateEnvelope.bind(this)}
                            identity=${this.state.identity}
                            envelopes=${this.state.envelopes}
                            crypto=${globalCrypto}
                            request=${this.state.request}
                        ></create-envelope>
                    </div>`:

                    this.html`<div>
                        <p>Your human name is
                            <strong>${this.state.identity.humanName}</strong>
                        </p>
                        <p>number of envelopes: <span class="envelope-count">
                            ${this.state.envelopes ?
                                '' + this.state.envelopes.length :
                                '0'
                            }
                        </span></p>

                        ${this.state.encryptedMsg ?
                            this.html`<div>
                                <h2>Your message</h2>
                                <strong>The message you sent</strong> looks like this:
                                <br>(the content is encrypted)
                                <pre>${JSON.stringify(this.state.encryptedMsg, null, 2)}</pre>
                            </div>` :
                            this.html`<new-message
                                onsend=${this.handleSendMsg.bind(this)}
                                envelopes=${this.state.envelopes}
                                identity=${this.state.identity}
                            ></new-message>`
                        }
                    </div>`
                }
            </div>`
        }

        return this.html`
            <h1>envelopes</h1>
            <h2>What's all this then?</h2>
            <p>
                Envelopes that have been pre-signed by the recipient. That way
                we can be sure that a message is legitimate, and check if
                we want to store and forward this message &mdash; without
                revealing the sender's identity. So the metadata of who
                is talking to whom stays hidden.
            </p>

            <p>
                This lets us E2E encrypt the message, while staying practical to
                things like storage & message delivery. We encrypt the
                <em>content</em> of the message and the <em>message author</em>
                &mdash; they look like just opaque strings to the server. But,
                we can still deliver the message to the correct person,
                because my ID is visible on the envelope.
            </p>

            <hr />

            <p>
                This is a toy webpage for demonstration purposes.
                Some things to note:
            </p>

            <p>
                By design, a webcrypto keypair exists only in the context of
                the current domain, <code>nichoth.com</code>. But, the good
                news is that these envelopes are static objects. Once they have
                been created, they can be passed to any other server, and
                can be validated by any server.
            </p>

            <p>
                The envelope is a message pre-signed by me.
                When you send a message through this
                page, we encrypt the message contents (including your identity),
                and send the encrypted message to my server. My server then
                checks that the envelope is valid (has been signed
                by me), and, if it is valid, writes the message to a database,
                where it stays until I delete it.
            </p>

            <p>
                Lets examine that paragraph.
            </p>

            <p>
                For the purposes of this demonstration, an identity has been
                created for you on this domain. This identity does nothing
                except allow you to submit this form. We are using the
                <a href="https://github.com/ssc-half-light/identity">
                    identity module
                </a> here. Under the hood, an identity correstponds to one
                AES (symmetric) key. That key is encrypted to various public
                keys, one for each device of the identity.
            </p>

            <p>
                When you click "submit", we encrypt your message to
                me, so only my private key is able to decrypt it. My name is
                visible on the envelope, but your name is in the encrypted part,
                so only myself and you are able to read it.
            </p>

            <p>
                Anyone can prove that the envelope is valid just by
                checking that the signature is valid. My server never learns
                <em>who</em> you are. To check validity, my server needs to make
                sure that the envelope is addressed to a valid user. For demo
                purposes there is only one valid user, me.
            </p>

            <p>
                In real life, the server might want to match the recipient's
                DID against a list of UCANs, or otherwise validate who
                they are. It could keep a list of DIDs that are allowed.
            </p>

            <p>
                You would probably want to give out the envelopes privately,
                for spam prevention, but if they are given out publicly it's
                not that big a deal, because the message is signed by the sender.
                So if I get a message from someone I don't know, or a
                mal-formed message, I can just discard it or something.
            </p>

            <h2>The replay vector</h2>
            <p>
                We need to make sure the same envelope is not used more than
                once. Each envelope has a sequence number, so we can check if
                the same envelope is used multiple times. But we probably give
                out envelopes to multiple people, so they are not
                necessarily used in sequential order.
            </p>

            <p>
                How to check that an envelope is not replayed? We want to avoid
                simply writing down the ID of each envelope we see, because it
                is storage inefficient.
            </p>

            <p>
                Envelope order cannot be guaranteed for local-first scenarios,
                where envelopes can arrive in any order.
            </p>

            <p>
                Could create sets of messages that are indexed by a hash.
                Each set goes to a different recipient. The hash is necessary
                because we don't want intermediate nodes to learn anything
                about who the message is from. We <em>can</em> guarantee message
                order within a set.
            </p>

            <p>
                If we do not prevent the replay attack, is it that bad?
                It is still impossible to forge the message sender's identity.
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
Tonic.add(CreateEnvelope)
Tonic.add(IdentityView)

async function createId (name) {
    const _program = await program({
        namespace: { creator: 'nichoth', name: 'nichoth.com' },
        debug: true
    })

    // @ts-ignore
    window.program = _program

    /**
     * Fission uses `session`s for their login state.
     * We are not doing that, because we don't need a full wnfs, only
     * the `crypto` component
     */

    const crypto = _program.components.crypto
    const id = await _createId(crypto, {
        humanName: name || 'test'
    })

    return [id, crypto]
}
