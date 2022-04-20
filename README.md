# nichoth.com

http://nichoth.com/

My website, from the distant past, that i have no memory of

---------------------

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
foo
