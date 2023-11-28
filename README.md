# nichoth.com

http://nichoth.com/

My website, from the distant past, that i have no memory of

---------------------

## templates
Links to various templates

* [template-ts](https://github.com/nichoth/template-ts) -- A template for Node JS typescript dependency modules
* [template-ts-browser](https://github.com/nichoth/template-ts-browser) -- Template for typescript projects in a browser environment
* [template-ts-preact-htm](https://github.com/nichoth/template-ts-preact-htm) -- Template for peact, htm, and typescript
* [template-ts-preact-htm-app](https://github.com/nichoth/template-ts-preact-htm-app) -- Template for applications using htm & preact
* [template-netlify-preact-htm-app](https://github.com/nichoth/template-netlify-preact-htm-app) -- Template for netlify, htm, preact

## build
```
npm run build
```

## start a local dev server
```
npm start
```

## deploy to surge
```
npm run deploy
```

----------------------------------------------------------

## chat

make a file `src/_chat.html`
copy the file to `public/chat/index.html`
`_chat.html` should have a link like `/chat/chat.js`

`src="/chat/chat.js"`

need to copy the html file, and browserify the script

or add to the build script

the problem is that there's no `watch` script for developing

a watch script
`mkdir -p public/chat && budo src/chat.js:chat.js --dir=public/chat --live --pushstate --open -- -p esmify -dv`
build script
`browserify src/chat.js > public/chat/chat.js -dv`
