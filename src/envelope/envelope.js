import { program } from '@oddjs/odd'
import ky from 'ky'
import {
    create as createEnvelope,
    wrapMessage,
    decryptMessage
} from '@ssc-half-light/envelope'
import { create as createMsg } from '@ssc-half-light/message'
import { SignedRequest } from '@ssc-half-light/request'
import { create as _createId } from '@ssc-half-light/identity'
import Tonic from '@nichoth/tonic'

/**
 * Look, no build tools
 * Everything resolved via ESM + the browser
 */

const URL_ROOT = 'https://nichoth-backend.netlify.app/api'
// const URL_ROOT = 'http://localhost:8888/api'
const ALLOWED_DIDS = [  // my DIDs, for localhost and nichoth.com
    'did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2QFw2XWbPxrrbwS2ha8yApyMoQicyamSGTuov6334CHXkw34vRhp7onJNqs6qr3mkfzwckU27kzV3A718mmpVc1Saban1k7jmedsfEtfaTbyLQp2Xa2GwqnDtAR7AbTSsXJroJe9N7L68jeHhSdyq2g9n5G8qnFMRrdBmDFM6ecPZLkHijieiHZj42JxFREHvy3uUjKjwyQVsYjWVFX32EBBpfTMez6vK9tahy5r2paYP7rHhzYz9MfcWHsWmn8voMzyRSUutBEKVCXbwtCGPR5moMKdyv8Q8skGNmVHw1D9BYgg8YoAmqatqRg3UZfhG8cWdusV4iuGFvygn2XaJS2ugAd6iF4ohHY1e',
    'did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2txSGy8PkPwRD5J3rJ2JAcY3uKeYRwSEjJ51UfVxyvAnfQm4rJcQMs9wBvtxdLJVurvsuGDsn2KTZhVBu7ArqeFxqxWR4yyEbfXkJm3k78FrGKddwneE8VMeDiawWHAv6cW3N8ygwKzYnR4ntoNWpjVQn3PNEH8CNd8xweSoa3oMYQmNPxxwik5pjXERtQVFJrEmaqzmBVx3EAJkMruLk1CdZtFm3B8FXF2azyizTPjSUHkrG9VWTrGYU33DBLNFovfrca3dzrCcnEso8d1fHgjsezpVt6DTaSNDtobFa1P8r4qYvd1CVnM5fUx9knAW9ThDqHBAfhVuNPVBLEDzpiLHD6hFd7xx2tgdv'
]

// passing the crypto object through props did not work... why?
let globalCrypto

/**
 * Make the page visible when it's ready
 * (prevent FOUC)
 */
domReady(() => {
    document.body.style.opacity = '1'
})

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

        const { envelopes } = this.props
        const latest = envelopes ? envelopes.length : 0
        const newEnvelope = await createEnvelope(globalCrypto, {
            username: this.props.identity.username,
            seq: latest + 1
        })

        await request.post(URL_ROOT + '/envelope', {
            json: { envelope: newEnvelope }
        })

        this.props.oncreate(newEnvelope)
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
        this.props.onsend(msg)
    }

    render () {
        window.props = this.props

        return this.html`<div>
            <h2>Send a message</h2>

            <p>
                This will use an envelope that I signed in advance with my
                keypair. The envelope <strong>looks like this:</strong>
            </p>

            <pre>${JSON.stringify(this.props.envelopes[0], null, 2)}</pre>

            <p>
                <strong>Note, </strong> we are not using the sequence number
                for anything. In real life we could use it to help prevent
                replay attacks.
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
            request: null,
            envelopes: null,
            recipient: null,
            messages: null,
            decryptedMsgs: null,
            myKeys: null
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
        this.state.envelopes = envelopes
    }

    async fetchRecipient () {
        const recp = await ky.get(URL_ROOT + '/get-nichoth').json()
        this.state.recipient = recp
    }

    /**
     * The "get your identity" button
     *   - create a `request` instance
     *   - create a unique Identity for this machine
     *   - fetch any messages if you are me
     * @param {SubmitEvent} ev 
     */
    async submit (ev) {
        ev.preventDefault()
        const name = ev.target.elements.humanName.value
        const [id, crypto] = await createId(name)
        this.state.identity = id
        globalCrypto = crypto
        this.state.request = SignedRequest(ky, crypto, window.localStorage)
        if (ALLOWED_DIDS.includes(id.rootDid)) {  // check if you are me
            const msgs = await getMessages(this.state.request, id.rootDid)
            this.state.messages = msgs
        }
        this.reRender()
        window.scrollTo(0, 0)
    }

    async click (ev) {
        const el = Tonic.match(ev.target, '[data-event]')
        if (!el || el.dataset.event !== 'decrypt') return
        ev.preventDefault()
        const msgs = this.state.messages
        const decrypted = await Promise.all(msgs.map(async msg => {
            return decryptMessage(globalCrypto, msg)
        }))
        this.state.decryptedMsgs = decrypted
        this.reRender()
    }

    handleCreateEnvelope (newEnvelope) {
        this.state.envelopes.push(newEnvelope)
        this.reRender()
    }

    async handleSendMsg (msg) {
        const { identity, recipient } = this.state
        const nextEnvelope = this.state.envelopes.shift()
        const [{ envelope, message }, senderKeys] = await wrapMessage(
            identity,
            recipient,
            nextEnvelope,
            await createMsg(globalCrypto, {
                from: {
                    username: this.state.identity.username,
                    humanName: this.state.identity.humanName
                },
                text: msg
            })
        )

        this.state.encryptedMsg = { envelope, message }
        this.state.myKeys = senderKeys

        // Need to call our server with the new envelope + message
        // Note we are using `ky`, not `request`, because the envelope
        // works as auth.
        await ky.post(URL_ROOT + '/message', {
            json: { envelope, message }
        })

        this.reRender()
    }

    render () {
        if (this.state.identity) {
            // check if rootDid is one of mine
            // if so, show a form to create more envelopes
            // if not, show a form to send a new message
            return this.html`<div id="envelope-demo-content">
                <h2>Your identity is:</h2>
                <identity-view identity=${this.state.identity}></identity-view>

                ${ALLOWED_DIDS.includes(this.state.identity.rootDid) ?
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
                            mycrypto=${globalCrypto}
                            request=${this.state.request}
                        ></create-envelope>

                        <hr />

                        ${this.state.messages ?
                            this.html`<div>
                                <h3>messages:</h3>
                                <ul>${this.state.messages.map(msg => {
                                    return this.html`<li>
                                        <pre>${JSON.stringify(msg, null, 2)}</pre>
                                    </li>`
                                })}</ul>

                                <button data-event="decrypt">decrypt</button>

                                ${this.state.decryptedMsgs ?
                                    this.html`<ul>
                                        ${this.state.decryptedMsgs.map(msg => {
                                            return this.html`<li>
                                                <pre>
                                                    ${JSON.stringify(msg, null, 2)}
                                                </pre>
                                            </li>`
                                        })}
                                    </ul>` :
                                    ''
                                }
                            </div>` :
                            null
                        }
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
                            (this.html`<decrypt-msg
                                id="decrypter"
                                mycrypto=${globalCrypto}
                                mykeys=${this.state.myKeys}
                                encryptedmsg=${this.state.encryptedMsg}
                            >
                            </decrypt-msg>`) :
                            // control to compose a new message
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
                Envelopes that have been pre-signed by the recipient.
                This lets us preserve the privacy
                of who is talking to whom by encyrypting the message's author.
                The recipient can remain visible though, and that way we can
                stay practical with storage and message delivery. Because the
                recipient is visible, we can reject messages for a person that
                we don't care about, and deliver messages efficiently to users
                we do care about.
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
                can be validated by any server (or browser).
            </p>

            <p>
                Whether the identity in the envelope means anything to
                another server is another issue. Every public key
                is unique, but we can link multiple public keys to form a
                single identity. This is common enough that it has a name,
                <a href="https://ucan.xyz/">UCAN.</a>
            </p>

            <hr />

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
                </a> here. Under the hood, an identity corresponds to one
                AES (symmetric) key. That key is encrypted to various public
                keys, one for each device of the identity.
            </p>

            <p>
                When you click "submit", we create a new symmetric key,
                and encrypt the message with that key. Then we encrypt that key
                with the recipient's public key. So only the recipient's
                private key is able to decrypt it. The recipient's name is
                visible on the envelope, but your name is in the encrypted part,
                so only myself and you are able to read your identity.
            </p>

            <p>
                Anyone can prove that the envelope is valid by
                checking that the signature is valid. My server never learns
                <em>who you are</em>. To check validity, my server needs to make
                sure that the envelope is addressed to a valid user. For demo
                purposes there is only one valid user, me.
            </p>

            <p>
                In real life, the server might want to match the recipient's
                DID against a list of UCANs, or otherwise validate who
                the recipient is. It could keep a list of DIDs that are allowed.
            </p>

            <p>
                You would probably want to give out the envelopes privately,
                for spam prevention, but if they are given out publicly it's
                not that big a deal, because the message is signed by the sender.
                So if I get a message from someone I don't know, or a
                mal-formed message, I can just discard it or something.
            </p>

            <hr />

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
                where envelopes can arrive in any order if the sender has
                multiple devices.
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

class DecryptMsg extends Tonic {
    constructor () {
        super()
        this.state = { decryptedMsg: null }
        window.state2 = this.state
    }

    async submit (ev) {
        // need to decrypt message here
        ev.preventDefault()
        ev.stopPropagation()
        const { mykeys, encryptedmsg } = this.props
        const decrypted = await decryptMessage(
            globalCrypto,
            encryptedmsg.message,
            mykeys
        )
        console.log('decrypted', decrypted)
        this.state.decryptedMsg = decrypted
        this.reRender()
    }

    render () {
        return (this.html`<div class="decrypter">
            <div class="success">
                <h2>Your message</h2>
                <strong>The message you sent</strong> looks like this:
                <br>(the content is encrypted)
                <pre>${JSON.stringify(this.props.encryptedmsg, null, 2)}</pre>
            </div>

            <form>
                <label>
                    Decrypt your message
                    <button type="submit">decypt</button>
                </label>
            </form>

            ${(this.state.decryptedMsg ?
               (this.html`<div class="decrypted-msg">
                    <strong>Decrypted message</strong>
                    <pre>${JSON.stringify(this.state.decryptedMsg, null, 2)}</pre>
                </div>`) :
                ''
            )}
        </div>`)

    }
}

Tonic.add(DecryptMsg)
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

function domReady (cb) {
    (
        document.readyState === 'interactive' ||
        document.readyState === 'complete'
    ) ?
        cb() :
        document.addEventListener('DOMContentLoaded', cb)
}

/**
 * Get our (encrypted) messages
 * @param {ReturnType<SignedRequest>}
 * @param {string} did 
 */
async function getMessages (request, DID) {
    if (!DID) return (DID) => getMessages(request, DID)
    const msgs = await request.get(URL_ROOT + '/message').json()
    return msgs
}
