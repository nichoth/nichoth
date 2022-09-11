---

linkTitle: development diary — streams
linkDesc: Streams are a helpful metaphor
slug: dev-diary-stream
type: dev-diary
date: 1-4-2022

---

# development diary

Streams are a helpful metaphor. Things go in, move in a predictable way, and come out somehwere else. It makes IO simple.

See [the stream handbook](https://github.com/substack/stream-handbook)

I was thinking just now that it would be nice to have a transform stream that will encrypt anything written to it, and likewise decrypt on the other side.

__Pretend code__
```js
var secretSource = secretStream.encrypt({ publicKey: 'abc' })
var toPlainText = secretStream.decrypt({ privateKey: '123' })
secretSource.pipe(network(/*my address...*/))

// --------------- on the other computer ------------------

network(/*my address...*/)
    .pipe(tpPlainText)
    .pipe(through(text => console.log(text)))

// or pull stream style
S(
    secretSource,
    network(address)
)
// ----------- other computer ------------------------
S(
    network(/*address*/),
    toPlainText
    S.log()
)
```

------------------------------------------------------------

__real modules__
* [mafintosh/hyperbeam](https://github.com/mafintosh/hyperbeam)
* [@hyperswarm/secret-stream](https://www.npmjs.com/package/@hyperswarm/secret-stream)

