# images

Create an image component

Needs a base64 param that is the blurry image.

It displays the blurry image, then lazy loads the real image.

## Could make a build tool

thinking about *my website* -- just static HTML

Use a function that returns the right HTML

```js
createImage({ src })

function createImage ({ src }) {
    const blurBase64 = '' // ...

    return `<img src="${src}"
        style="background-image: url('data:image/svg...')"
    ></img>`
}
```

see [industrial empathy](https://www.industrialempathy.com/posts/image-optimizations/#blurry-placeholder)


