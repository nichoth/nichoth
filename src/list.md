# a list of things to remember

## hosts
* [fleek](https://fleek.co/) -- ipfs and http
* [vercel](https://vercel.com/) -- http
* [hashbase](https://hashbase.io/) -- dat & http
* [render](https://render.com/) -- http + some backend stuff
* [fission](https://fission.codes/)
* [surge](https://surge.sh/) -- http
* [netlify](https://www.netlify.com/) -- http
* [heroku](https://www.heroku.com/)
* [pinata](https://www.pinata.cloud/) -- ipfs
* [concordant](https://www.concordant.io/) -- "More power to your edge app"
* [bunny fonts](https://bunny.net/fonts/) -- GDPR ok font CDN
* [fly.io](https://fly.io/)

## static frameworks
* [next](https://nextjs.org/)
* [nuxt](https://nuxtjs.org/)
* [eleventy](https://www.11ty.dev/)
* [gatsby](https://www.gatsbyjs.com/)


## cryptography
* [End-to-End Encryption in the Browser](https://blog.excalidraw.com/end-to-end-encryption/) -- This is how [wormhole](https://wormhole.app/) works. Put the secret key after the `#` in the URL, so it is never sent to the server.



## CMS
* [contentful](https://www.contentful.com/)
* [sanity](https://www.sanity.io/)
  - [Make a headless CMS eCommerce front-end for Vue.js, Nuxt.js and Snipcart](https://www.sanity.io/blog/e-commerce-vue-nuxt-snipcart)
* [netlify CMS](https://www.netlifycms.org/) 
  - [Eleventy + Netlify CMS Boilerplate](https://templates.netlify.com/template/eleventy-netlify-boilerplate/)
  - [Examples](https://www.netlifycms.org/docs/examples/)
* [strapi](https://strapi.io/features)
* [plasmic](https://www.plasmic.app/)
* [tina](https://tina.io/)


## dom stuff
* [hyperx](https://github.com/substack/hyperx)
* [hyperxify](https://github.com/substack/hyperxify)
* [lit-html](https://lit-html.polymer-project.org/)
* [nanoHTML](https://github.com/choojs/nanohtml)
* [uhtml](https://github.com/WebReflection/uhtml)
* [hyperapp](https://github.com/jorgebucaran/hyperapp)
  - [hyperapp github namespace](https://github.com/hyperapp)
  - [hypersamples](https://github.com/hyperapp/hypersamples)
  - [hyperlit](https://github.com/zaceno/hyperlit)
* [mutant](https://github.com/mmckegg/mutant)
* [tonic](https://tonicframework.dev/)
* [remix.run](https://remix.run/)
* [htm-ssr gist](https://gist.github.com/developit/699c8d8f180a1e4eed58167f9c6711be)
* [htm + vhtml](https://github.com/developit/htm#other-uses)
* [htm demos & examples](https://github.com/developit/htm#demos--examples)
* [HTML with Superpowers -- An Introduction to Web Components](https://htmlwithsuperpowers.netlify.app/)
* [HTML with Superpowers: The Guidebook](https://daverupert.com/2023/01/html-with-superpowers-the-guidebook/)
* [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
* [Components Are Pure Overhead](https://www.youtube.com/watch?v=I6L29qSTaFA&t=722s&ab_channel=RyanCarniato)

---------

* [elm.land](https://elm.land/)

### state containers
* [nanostores](https://github.com/nanostores/nanostores)
  - [wtw.dev/51-nanostores](https://wtw.dev/51-nanostores) -- a little video
* [observ](https://github.com/Raynos/observ)
* [teaful](https://github.com/teafuljs/teaful)
* [preact/signals](https://github.com/preactjs/signals) ⭐
* [redux-zero](https://github.com/redux-zero/redux-zero)
* [developit/unistore](https://github.com/developit/unistore)
* [nichoth/preact-pull-stream](https://github.com/nichoth/preact-pull-stream) -- my own thing
* [jotai](https://github.com/pmndrs/jotai)
* [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)


--------------------------------------


## css

* [bulma](https://bulma.io/) -- css 
* [stitches.dev](https://stitches.dev/) -- CSS in JS
* [How does Apple make that awesome frosted glass effect on their site header in CSS?](https://twitter.com/Steve8708/status/1531101973985890305)

> tl;dr 

```css
backdrop-filter: blur(20px) saturate(180%)
```

* [How do Nike and Apple make such smooth and touch friendly carousels with pure CSS?](https://twitter.com/Steve8708/status/1531388545960583168)

> tl;dr

```css
.carousel {
  scroll-snap-type: x mandatory;
}
.carousel .item {
    scroll-snap-align: start;
}
```

* [Speedy CSS Tip! Turn your images into Polaroid™](https://twitter.com/jh3yy/status/1531680894955790339) + [codepen link](https://codepen.io/jh3y/pen/LYQLOaW)
* [How Apple makes their beautiful hamburger menu in *pure CSS* (no JS!)](https://twitter.com/Steve8708/status/1532364254434578432) + [see codepen](https://jsfiddle.net/ba6szc7d/3/)
  - see [ssc-server](https://github.com/nichoth/ssc-server/blob/86491d9811c4d3bed0aef2789866edc57c93d5b3/src/view/components/hamburger.js)
* [steve on youtube](https://www.youtube.com/@Steve8708/videos)
* [How http://github.com makes such beautiful text gradient effects in CSS](https://twitter.com/Steve8708/status/1532521679628341248) + [see example](https://codesandbox.io/s/image-gif-text-mphpzk?file=/index.html:0-16)
* [How does Tesla make that beautifully smooth full page swipe effect on their homepage?](https://twitter.com/Steve8708/status/1532793202582794241) + [see codepen](https://codepen.io/steve8708/pen/GRQGYwr?editors=1100)
* [Create a nice background pattern with 4 conic-gradient](https://twitter.com/ChallengesCss/status/1533032841029763072) + [see codepen](https://codepen.io/t_afif/full/rNJKvMy)
* [nextUI dropdown](https://nextui.org/docs/components/dropdown)
* [Use calc && scoped custom properties to create a pure CSS expanding gallery view](https://twitter.com/jh3yy/status/1534146966535426048) + [see codepen](https://codepen.io/jh3y/pen/RwQYVZz)
* [radix ui](https://radix-ui.com/primitives/docs/components/hover-card)
* [vmin unit](https://css-tricks.com/simple-little-use-case-vmin/) -- the lesser of `vw` and `vh`
* [fluid typography](https://fluid-typography.netlify.app/)
* [auto-fill vs auto-fit](https://defensivecss.dev/tip/auto-fit-fill/)
* [Do you know we can adjust the space between an element and its outline?](https://twitter.com/codewithshripal/status/1599719744789254144)
* [Master the art of CSS box-shadow: a comprehensive cheatsheet](https://twitter.com/_georgemoller/status/1611333785102032897?s=20&t=82qa6NGI74Lxop3kVaMi2w)
* [Speedy CSS Tip! ⚡️ Create this neat card hover effect with a custom property switch](https://twitter.com/jh3yy/status/1588607776036917248?s=20&t=xyaFjlCT9R2FlHePbzE9PQ) + [codepen demo](https://codepen.io/jh3y/pen/dyKXmpB)
* [The Guide To CSS Animation: Principles and Examples](https://www.smashingmagazine.com/2011/09/the-guide-to-css-animation-principles-and-examples/)
* [A shaded blur behind a logo is simple but beautiful affect. Let's see how @vite_js does it.](https://twitter.com/_davideast/status/1586002781777039360?s=20&t=SaJfdGGVlw5zQITX7d2j0A) + [codepen](https://codepen.io/davideast/pen/yLELbvm)
* [An Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
* [UI design tip -- I’ve been doing buttons wrong!](https://twitter.com/AdhamDannaway/status/1595425255027269634?s=20&t=Ym96qEZvGi8cudj4Sib6Eg)
* [Need a rainbow gradient? Let `<hue-interpolation>` do the work](https://twitter.com/argyleink/status/1620525875396739072?s=20&t=8MIu2A6vTNI4e5_NbOi1sA)
* [Everything you didn't know you need to know about buttons](https://twitter.com/Steve8708/status/1620448506766045191?s=20&t=EMFXfNCnzLONny6iyh1Whg) + [blog post](https://www.builder.io/blog/buttons)
* [Here is how I implemented dark mode on my website](https://twitter.com/flaviocopes/status/1627609246014619649?s=20)
* [If you're not using border-image in CSS, you are missing out on a very cool effect!](https://twitter.com/Steve8708/status/1511912289724616704?s=20&t=Zif6NhC92FBIS7aGQtfQbw)
* [be sure to optimize and prioritize your images](https://twitter.com/Steve8708/status/1508861196807532547)
* [Create a nice 3D Zig-Zag edge](https://twitter.com/ChallengesCss/status/1648664256550694913?s=20) + [codepen demo](https://codepen.io/t_afif/full/XWxjMBd)
* [select the first and last element with a specific class](https://twitter.com/ChallengesCss/status/1648305779739447296?s=20) -- [codepen demo](https://codepen.io/t_afif/pen/ExdgYXo)
* [Use @​counter-style to customize your `<ol>` list](https://twitter.com/ChallengesCss/status/1647925597077643264?s=20) -- [codepen](https://codepen.io/t_afif/pen/GRYZeqr)
* [Serving less data to users with the `prefers-reduced-data` media query](https://blog.stephaniestimac.com/posts/2023/4/css-prefers-reduced-data/)
* [CSS Text balancing with text-wrap:balance](https://ishadeed.com/article/css-text-wrap-balance/?utm_source=CSS-Weekly&utm_campaign=Issue-545)
* [Use modern CSS tricks to create fancy range sliders](https://twitter.com/ChallengesCss/status/1645435570867388416?s=20) + [see demo code here](https://codepen.io/t_afif/full/KKGpmGE)
* [the “frosted glass” effect](https://iamvdo.me/en/blog/advanced-css-filters)

### radio buttons
* [Pure CSS Custom Styled Radio Buttons](https://moderncss.dev/pure-css-custom-styled-radio-buttons/)
* [Accessible Toggles](https://css-irl.info/accessible-toggles/)
* [Simplifying Form Styles With accent-color](https://www.smashingmagazine.com/2021/09/simplifying-form-styles-accent-color/)
* [css-tricks -- Zero Trickery Custom Radios and Checkboxes](https://css-tricks.com/zero-trickery-custom-radios-and-checkboxes/)

### scroll snap
* [css-tricks](https://css-tricks.com/practical-css-scroll-snapping/)
* [Josh W. Comeau -- CSS scroll snapping is SO nice.](https://twitter.com/JoshWComeau/status/1247519254439546883)
* [How do Nike and Apple make such smooth and touch friendly carousels with pure CSS?](https://twitter.com/Steve8708/status/1531388545960583168) -- [js fiddle](https://jsfiddle.net/L1cs6gt5/1/)
* [CSS only snap scroll is pretty cool](https://twitter.com/guerriero_se/status/1314171683909955584) -- [codepen](https://codepen.io/codyhouse/pen/dyXPVOb)
* [Addy Osmani -- CSS Scroll Snap](https://twitter.com/addyosmani/status/1485024476974694400) -- [web.dev](https://web.dev/next-gen-css-2019/#scroll-snap)
* [ishadeed.com -- via smashing magazine](https://ishadeed.com/article/css-scroll-snap/)


-------------------------------------------------


## design
* https://2020.webconf.asia/
* https://kristen.dev/
* https://www.cassie.codes/ -- see the button
* https://increment.com/
* https://telephone.unlimited.pizza/
* http://broccolini.net/
* https://vvorkvvorkvvork.com/shop
* https://56.digital/
* https://georgefrancis.dev/
* https://www.shawnbinder.com/
* https://www.snaplet.dev/

--------------------------------

* https://offseasoncreative.com/
* https://www.siteinspire.com/websites/5116-nice-and-serious
* https://niceandserious.com/
* https://www.siteinspire.com/websites/9564-off-season-creative

------------------------------------

* [childish.studio](https://childish.studio/) / [see typewolf](https://www.typewolf.com/site-of-the-day/studio-childish)
* [dmbrut.com](https://www.dmbrut.com/) / [see typewolf](https://www.typewolf.com/site-of-the-day/dm-brut)

------

* [JOTTINGS FROM ANA RODRIGUES](https://ohhelloana.blog/) -- via [mxb.dev](https://mxb.dev/notes/2021-07-08-oh-hello-ana-blog/)
* [self aware](https://selfaware.studio/)


-------------------------------------

### fonts
* [noe display](https://www.typewolf.com/noe-display#:~:text=Noe%20Display%20is%20a%20Transitional,four%20weights%20with%20matching%20italics.)
  - seen [here](https://mxb.dev/blog/container-queries-web-components/)
* [noe display](https://fontsinuse.com/typefaces/31872/noe-display)
* [work sans font](https://fonts.google.com/specimen/Work+Sans)
* [freight big](https://www.typewolf.com/freight-big)
* [inter](https://fonts.google.com/specimen/Inter)
* [sen](https://fonts.google.com/specimen/Sen) -- seen [here](https://www.fermyon.com/blog/serverless-reckoning)
* [see fonts of robinsloan.com](https://www.robinsloan.com/colophon/)


----------------------------------------

## hyper
* https://github.com/hypercore-protocol/hypercore
* https://www.datprotocol.com/
* [hypergraph](https://blog.libscie.org/introducing-hypergraph-beta/)
* [dat store](https://github.com/datproject/dat-store)
* [hypercore-protocol.org](https://hypercore-protocol.org/)
* [hypertrie](https://www.npmjs.com/package/hypertrie) -- Distributed single writer key/value store
* [dat sdk](https://github.com/datproject/sdk)
* [hyperswarm](https://github.com/RangerMauve/hyperswarm-web)
* [dat-store](https://github.com/datproject/dat-store)
* https://github.com/jimpick/hyper-graph-db-playground
* [hyper graph db](https://github.com/e-e-e/hyper-graph-db)
* [hyperdiscovery](https://github.com/datproject/hyperdiscovery)
* [hyperDB](https://github.com/mafintosh/hyperdb)
* [hyperbeam](https://github.com/mafintosh/hyperbeam)
* [hyp cli](https://github.com/hypercore-protocol/cli)

------------------------------

* [hyperlog](https://github.com/mafintosh/hyperlog) -- Merkle DAG that replicates based on scuttlebutt logs and causal linking
* [hyperbee](https://github.com/hypercore-protocol/hyperbee) -- An append-only Btree running on a Hypercore
* [merkle tree stream](https://www.npmjs.com/package/merkle-tree-stream)

---------------------------

* [hyperlog reduce](https://github.com/noffle/hyperlog-reduce)
* [hyperlog-index](https://github.com/substack/hyperlog-index)
* [hypermerge](https://github.com/automerge/hypermerge)
* [automerge](https://github.com/automerge/automerge)

-------------------------------------------------

## misc
* [the wet codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase)
* [recoil](https://recoiljs.org/) -- react state management
* [Functional lenses for contemporary frameworks - Andre Staltz](https://www.youtube.com/watch?v=5R3l2r1XxKI)
* [find-my-way](https://www.npmjs.com/package/find-my-way) -- http router
* [Learn more about Threads and the Powergate from the IPFS Pinning Summit](https://blog.textile.io/learn-more-about-threads-and-the-powergate-from-the-ipfs-pinning-summit/)
* [CS 253 Web Security](https://web.stanford.edu/class/cs253/)
* [textile hub](https://blog.textile.io/announcing-the-textile-protocol-hub/)
* [zx](https://github.com/google/zx) -- script writing thing

----------------------------------------

* [secure database games](https://www.youtube.com/watch?v=u7_dUCHYaGI) -- the rumplestiltskin story

------------------------------------------

* [rambly](https://rambly.app/)
* [gather.town](https://gather.town/)

-----------------------------------------

* [ctzn](https://github.com/pfrazee/ctzn) -- A hybrid p2p/federated social network mad science experiment. WIP.

-----------------------------------------

* [James Halliday (Substack): "MAD Science"](https://www.youtube.com/watch?v=faxfLmChjVQ&ab_channel=NearForm)

## 'p2p'
* [orbitDB](https://orbitdb.org/)
* [polkadot](https://polkadot.network/)
* [ceramic](https://ceramic.network/)
* [idx](https://developers.idx.xyz/learn/overview/)
* [textile](https://www.textile.io/)
* [fission](https://fission.codes/)
* [3box](https://3box.io/)
* [moonbeam](https://moonbeam.network/)
* [pinata](https://pinata.cloud/) -- ipfs 
* [moderator.rocks](https://moderator.rocks/)
* [atacama](https://github.com/hoodownr/atacama) -- related to moderator
* [p2panda](https://p2panda.org/learn/)

--------------------------

* [p2p chat example](https://gist.github.com/substack/0177839f57e8fe0fc294)
* [hyperlog](https://github.com/mafintosh/hyperlog)
* [webRTC swarm](https://github.com/mafintosh/webrtc-swarm)

---------------------------

* [RangerMauve/hyperswarm-web](https://github.com/RangerMauve/hyperswarm-web)
* [RangerMauve/hyperbeedeebee](https://github.com/RangerMauve/hyperbeedeebee)

----------------------------

* https://decentpatterns.xyz/
* https://decentpatterns.xyz/report/
* [this is fine](https://newdesigncongress.org/en/pub/this-is-fine)

------------------------------------------


## leveldb
* https://github.com/dominictarr/charwise
* [range of keys in Leveldb](https://kevinsimper.medium.com/how-to-get-range-of-keys-in-leveldb-and-how-gt-and-lt-works-29a8f1e11782)

```js
db.createReadStream({
  gte: 'user'
  lte: 'user~'
})
```

* [dominic's weird idea](https://gist.github.com/dominictarr/5990143)
* https://github.com/dominictarr/cyphernet
* https://github.com/dominictarr/level-merkle
* https://github.com/dominictarr/level-scuttlebutt
* https://github.com/dominictarr/ltgt

----------------------------------------

## html

* [labels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)

> you can nest the `<input>` directly inside the `<label>`, in which case the `for` and `id` attributes are not needed because the association is implicit

* [Cache serverless responses with Cache-Control headers](https://wtw.dev/59-cache-control)
* [HTML tips you won't see in most tutorials](https://twitter.com/denicmarko/status/1610230054402891777?s=20&t=UuXt9HuUaZeOl2aZIX5ShA)
* [markodenic.com/html-tips](https://markodenic.com/html-tips/)
* [HTMLInputElement showPicker()](https://show-picker.glitch.me/demo.html)
* [I didn't realize the native HTML date picker had gotten so good](https://twitter.com/aarondfrancis/status/1611800938020474880?s=20&t=ZfEQWjm8yuzRlsWGPjfNnw)
* [https://whitep4nth3r.com/blog/html-is-all-you-need-to-make-a-website/](https://whitep4nth3r.com/blog/html-is-all-you-need-to-make-a-website/)
* [Bulletproof Sessions with HttpOnly Cookies](https://begin.com/blog/posts/2023-02-03-bulletproof-sessions-with-httponly-cookies)
* [TIL, there are `new-password` and `current-password` autocomplete values](https://twitter.com/aleksandrasays/status/1622932649240043521?s=20&t=XvzZ2AUH9cnItWWTyy2ZtA)
* [Cumulative Layout Shift + images](https://twitter.com/adamdbradley/status/1627708760293605384?s=20) & [the link](https://www.builder.io/blog/how-to-improve-lighthouse-scores-by-avoiding-img-layout-shifts)
* [Building an effective Image Component](https://developer.chrome.com/blog/image-component/)
* [How to get the best image performance (Updated 2021)](https://twitter.com/leeerob/status/1352264153411497993)
* [Image quality & performance video](https://twitter.com/AndreyLipattsev/status/1399302917539180545)
* [HTML is a living language in constant evolution. The latest addition has been a new semantic element for searching/filtering operations](https://twitter.com/alvaro_montoro/status/1645449658280321031?s=20)
* [search role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/search_role)

### images
* [bholmes.dev -- image optimization for any web framework](https://bholmes.dev/blog/picture-perfect-image-optimization#link-the-sizes-attribute)
* [bholmes.dev -- using-11ty-image-with-any-framework](https://bholmes.dev/blog/picture-perfect-image-optimization/#link-using-11ty-image-with-any-framework)
*  [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)
* ["Blur Up" technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/)


--------------------------------------


## javascript
* [A comprehensive production-grade TypeScript training](https://www.totaltypescript.com/)
* [Everything You Need to Know About JavaScript Import Maps](https://www.honeybadger.io/blog/import-maps/)
* [Just learned you can use underscores as separators in JavaScript numbers.](https://twitter.com/housecor/status/1596495131192033282?s=20&t=jxn1Bfkdvtkq82tGxfjG5A)
* [4 ways to handle multiple promises](https://twitter.com/housecor/status/1596534347473080324?s=20&t=jxn1Bfkdvtkq82tGxfjG5A)
* [JSON.stringify maps](https://twitter.com/Steve8708/status/1623824604417646592?s=20&t=kVcJ-ih4s17jM4Ug9iIzRg)
* [typescript reset](https://twitter.com/mattpocockuk/status/1627686847030743043?s=20) + [github link](https://github.com/total-typescript/ts-reset)
* [just](https://github.com/angus-c/just) -- utility library
* [state machines](https://bholmes.dev/blog/writing-a-state-machine-in-one-line-with-typescript/) -- bholmes.dev
* [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)


## db

* [kappa-architecture.com](https://milinda.pathirage.org/kappa-architecture.com/)
* https://github.com/kappa-db
* [kappa-core](https://github.com/kappa-db/kappa-core)
* https://github.com/kappa-db/kappa-core/blob/master/intro.md
* [planetscale db](https://www.planetscale.com/) -- "The database for developers"
* [supabase](https://supabase.io/) -- The Open Source
Firebase Alternative
* [upstash](https://upstash.com/)
* [kappa db](https://github.com/kappa-db)
* [vaxine](https://medium.com/lunar-ventures/vaxine-the-database-for-social-software-6e3a292a53ca)
* [harperDB](https://dev.to/andrewbaisden/how-to-use-harperdb-custom-functions-to-build-your-entire-backend-a2m)
* [cockroach DB](https://www.cockroachlabs.com/)
* [hasura](https://hasura.io/)
* [How SQLite Helps You Do ACID](https://fly.io/blog/sqlite-internals-rollback-journal/)
* [Things You Should Know About Databases](https://architecturenotes.co/things-you-should-know-about-databases/)
* [wunderbase](https://github.com/wundergraph/wunderbase)
* [DefraDB -- a Peer-to-Peer Edge Database](https://github.com/sourcenetwork/defradb)

-------

* [Cozo -- a general-purpose, transactional, relational database](https://github.com/cozodb/cozo)
* [Relational Databases Explained](https://architecturenotes.co/things-you-should-know-about-databases/)
* [Building a database in the 2020s](https://me.0xffff.me/build-database-in-2020s.html)

-----

* [interested in p2p databases?](https://twitter.com/gustafjt/status/1654514487922155522)
* [Merklizing the key/value store for fun and profit](https://joelgustafson.com/posts/2023-05-04/merklizing-the-key-value-store-for-fun-and-profit)


### fancy local-first DBs

* [replicache](https://replicache.dev/)
* [dolt](https://www.dolthub.com/)
* [riffle](https://riffle.systems/)
* [riffle / Building data-centric apps with a reactive relational database](https://riffle.systems/essays/prelude/) -- an essay
* [litestream](https://litestream.io/) -- Fully-replicated database with no pain and little cost
* [ditto](https://www.ditto.live/)
* [instantDB](https://www.instantdb.com/)
* [ccorcos/tuple-database](https://github.com/ccorcos/tuple-database/)
* [triplit](https://www.triplit.dev/)
see also -- [github repo](https://github.com/aspen-cloud/triplit/tree/main/packages/db)

----------------------------------

## to read

* [Photo Gallery](https://eleventy-gallery.netlify.app/) & [code](https://github.com/tannerdolby/eleventy-photo-gallery)
* [How to enable Gatsby Functions on Netlify](https://www.netlify.com/blog/2021/06/03/how-to-enable-gatsby-functions-on-netlify/)
* [Build your own shop with the Shopify Storefront API, Eleventy, and serverless functions](https://www.netlify.com/blog/2021/07/20/build-your-own-shop-with-the-shopify-storefront-api-eleventy-and-serverless-functions/?utm_medium=social&utm_source=twitter&utm_campaign=devex-ph&utm_content=shopify-11ty)
* [Dive into the new Glitch data starter apps](https://blog.glitch.com/post/dive-into-the-new-glitch-data-starter-apps)

-------------------------------------------

* [earthstar comments](https://github.com/earthstar-project/earthstar/blob/main/docs/tutorial.js)


## money

* [rechargepayments.com](https://rechargepayments.com/)
* [swell](https://www.swell.is/) -- seen in a [video](https://www.youtube.com/watch?v=72E-EY9EEBY&ab_channel=ColbyFayock) about vercel + ecommerce
* [medusa](https://medusajs.com/)
* [Build a SaaS Platform with Stripe](https://jonmeyers.io/blog/build-a-saas-platform-with-stripe)
* [Cart and Theme Storage](https://jessedit.netlify.app/articles/client-side-routing/13-cart-and-theme-storage)


## more misc

* [State of libp2p](https://fosdem.org/2022/schedule/event/libp2p/)
* [Hyper Hyper Space: In-browser p2p applications](https://fosdem.org/2022/schedule/event/hyperhyper/)
* [fly.io -- global image service article](https://fly.io/docs/app-guides/run-a-global-image-service/)
* [hydrogen / shopify](https://docs.netlify.com/integrations/frameworks/hydrogen/)
* [Setup and run Pi-Hole on a Raspberry Pi](https://privacyinternational.org/guide-step/4341/raspberry-pi-setup-and-run-pi-hole)
* [Faculty Best Practices](https://faculty.com/standards/best-practices)
* [Ever wondered how the Kademlia DHT works?](https://twitter.com/n0computer/status/1623744085436628995?s=20&t=kVcJ-ih4s17jM4Ug9iIzRg)
* [How NAT traversal works](https://tailscale.com/blog/how-nat-traversal-works/)
* [Proof of X](https://julian.digital/2020/08/06/proof-of-x/) -- "At their core, social networks are primarily about one thing: Building social capital through signaling."
* [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)

---------

* [Piet Mondrian's calling card](https://twitter.com/AndrewRusseth/status/1645946723683160065?s=20)

---------

* [Convert images to AVIF for free, fast](https://avif.io/)
* [avif.io source code](https://github.com/justinschmitz97/avif.io/) -- use Rust with wasm-pack to compile a converter library into WASM and call the Rust code in the browser, from a WebWorker. 


### video misc

* [the terrys](https://www.imdb.com/title/tt1851076/)

### sailing + bicycles
* [earthstar hyperloop metaphor](https://earthstar-project.org/get-started/like-a-bicycle)
* [Hold Fast](https://vimeo.com/15351476) -- Moxie documentary video
* [Hundred Rabbits](https://www.youtube.com/watch?v=BW32yUEymvU) -- a
  presentation
* [Local-first software - Peter Van Hardenberg](https://www.youtube.com/watch?v=KrPsyr8Ig6M) -- bicycle vs aircraft carrier


## storage

* [min.io](https://min.io/) -- Multi-Cloud Object Storage
* [webiny](https://www.webiny.com/) -- Build  Serverless  Solutions in Minutes
* [cloudinary](https://cloudinary.com/) -- media server
* [web3.storage](https://web3.storage/) -- free stuff
* [storj](https://www.storj.io/)
* [backblaze](https://www.backblaze.com/) -- used by [wormhole app](https://wormhole.app/)
* [imgix](https://imgix.com/)

## new things

* [Introducing Quiet - Encrypted P2P team chat without servers, just Tor - Holmes Wilson](https://youtu.be/owSd7uuGwmw?t=170)
  - IPFS, orbitDB, Tor
* [Check out this speed run where our Applied Researcher Jess builds a decentralized Flickr clone in under 10 minutes](https://twitter.com/FISSIONcodes/status/1590478358181093376?s=20&t=5SNfVr2fkMZwr9uwWxa1Hw)
* [lynn and tonic](https://lynnandtonic.com/thoughts/)
* [HOW TO MAKE A WEBSITE](https://henry.codes/writing/how-to-make-a-website/)
* [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)
* [Bring Your Own Client](https://www.geoffreylitt.com/2021/03/05/bring-your-own-client.html) -- choose your favorite application to interact with some data

