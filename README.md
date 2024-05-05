# nichoth.com

https://nichoth.com/

My website, from the distant past, that i have no memory of

---------------------


## WIP
* [Half Light](https://github.com/ssc-half-light/)


## templates

__Links to various templates__

* [template-js](https://github.com/nichoth/template-js) -- A template for JS projects
* [template-ts](https://github.com/nichoth/template-ts) -- A template for Node typescript dependency modules
* [template-ts-browser](https://github.com/nichoth/template-ts-browser) -- Template for typescript projects in a browser environment
* [template-ts-preact-htm](https://github.com/nichoth/template-ts-preact-htm) -- Template for peact, htm, and typescript
* [template-ts-preact-htm-app](https://github.com/nichoth/template-ts-preact-htm-app) -- Template for applications using htm & preact
* [template-netlify-preact-htm-app](https://github.com/nichoth/template-netlify-preact-htm-app) -- Template for netlify, htm, preact
* [template-tonic-spa](https://github.com/nichoth/template-tonic-spa) -- Tonic framework + client-side routing
* [template-web-ssc](https://github.com/nichoth/template-web-ssc) -- Use the same source code to build web apps and native apps

## notes
[Links and notes](https://github.com/nichoth/notes/discussions)

plus, [a list](https://nichoth.com/list/)

## build
```sh
npm run build
```

## start a local dev server
```sh
npm start
```

## deploy to surge
```sh
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

__a watch script__

```sh
mkdir -p public/chat && budo src/chat.js:chat.js --dir=public/chat --live --pushstate --open -- -p esmify -dv
```

__build script__

```sh
browserify src/chat.js > public/chat/chat.js -dv
```

## comments

See [aleksandrhovhannisyan.com](https://www.aleksandrhovhannisyan.com/blog/static-site-comments-github-issues/#how-it-works-storing-comments-in-github-issues) -- github issues as comments. I didn't use this because it uses github issues for composing comments, which I don't like so much.

[greenash.net comments](https://greenash.net.au/thoughts/2022/03/email-based-comment-moderation-with-netlify-functions/)

1. Use netlify forms to submit a comment
2. Comment gets saved in netlify
3. Use [submission created event](https://docs.netlify.com/functions/trigger-on-events/) to send an email to yourself
4. Site admin approves the comment, which then writes it to github, with the [Github contents API](https://docs.github.com/en/rest/reference/repos#contents)
5. Also you can delete the comment from netlify with the [forms API](https://docs.netlify.com/api/get-started/#delete-submissions)
6. netlify rebuilds due to github commit, as usual

You could also use a lambda function to handle form submissions, which would remove the limit of 100 submissions per month of netlify forms.

Netlify forms has built-in spam prevention, which is nice
