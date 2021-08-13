---

slug: flobz
linkName: preact + ssr + client-side routing

---

# flobz

https://flobz.netlify.app/

https://github.com/nichoth/flobz

----------------------------------

[flobz](https://github.com/nichoth/flobz) -- 
A nonesense name for an example demonstrating preact + server-side rendering

* [developit/htm-ssr.js](https://gist.github.com/developit/699c8d8f180a1e4eed58167f9c6711be)

* [Build a SSR App With Preact, Unistore, and Preact Router](https://www.digitalocean.com/community/tutorials/build-a-ssr-app-with-preact-unistore-and-preact-router)

> To summarize, the idea is to initially render the app on the server first and then render the components on the browser.

-------------------------------------------

## it actually works

### the situation
So you have a website, and there is too much content to make a single page app. You want the website to be fast, and also be SEO'd. That means we can make a static website for the SEO part, and static sites are pretty fast too. 

But it would be a *little bit faster* if once you loaded the first page on the site, each subsequent page that you visited requested *just the content* for that page, instead of full markup. That way you could re-use redundant parts like navigation elements (things that appear on every page).

That's what this is. It is a real thing and it is hosted on netlify -- [https://flobz.netlify.app/](https://flobz.netlify.app/)

---------------------------------------

In netlify, create the site and [add netlify-cms](https://www.netlifycms.org/docs/add-to-your-site/). 

In the `/admin/config.yml` file, make sure that new posts are created in the `/public` folder. This is important because we want to request the `md` content whenever we navigate within the site.

```yml
  folder: "public/_posts/blog" 
```

There are two important scripts here. One is a node file that will generate a static site, and the other is the entry file for the website.

In the node file, we want to read all our content files, generate a page with them, and write the page to the right path in the site.

For every source file in the site, we match it against the router, and write the result to the filesystem

```js
import router from './routes'
var hyperstream = require('hyperstream')

fs.readdir(__dirname + '/../public/_posts/blog', (err, files) => {
  files.forEach(fileName => {
    var m = router.match('/posts/' + path.basename(fileName, '.md'))
    var { view, getContent } = m.action(m)

    getContent().then(content => {
      var el = html`<${shell} active=${path.basename(fileName, '.md')}
          links=${_files}
      >
          <${view} content=${content} />
      <//>`

      mkdirp(dirPath).then(() => {
        var hs = hyperstream({
            '#content': {
                _appendHtml: renderToString(el)
            }
        })

        var rs = fs.createReadStream(__dirname + '/index.html');
        var ws = fs.createWriteStream(indexPath)
        rs.pipe(hs).pipe(ws)
      })
    })
  })
})
```

Also during this stage, be sure to write a json file with all the routes in it. We can use that file to generate the navigation in the front end site.

```js
var _files = files.map(file => path.basename(file, '.md'))
fs.writeFileSync(__dirname + '/links.json', JSON.stringify(_files))
```

We pass in the `links` prop when rendering the preact component
```js
var el = html`<${shell} active=${path.basename(fileName, '.md')}
    links=${_files}
>
```

In the frontend JS file, we want to use the same router. We should be able to just import the same file in both places, but [a bug](https://github.com/mattdesl/esmify/issues/15) prevents this at the moment. So there is a file `routes-browser.js` that has the same routes as the backend, but we are using the `fetch` function to request the source `.md` content instead of reading from `fs`.

-----------------------------

So what happens is that the first time you load the site in a browser, it will download and display the static webpage. So you see the content asap. Then we `hydrate` the content with preact. 

Then every time you navigate via the page's links, we will request the `.md` content for that route, and re-render the site using preact. So it is as quick as possible, and also SEO.

It nice to independently come to the same conclusion as [an internet article](https://www.digitalocean.com/community/tutorials/build-a-ssr-app-with-preact-unistore-and-preact-router) --

> To summarize, the idea is to initially render the app on the server first and then render the components on the browser.


