# nichoth.com

http://nichoth.com/

My website, from the distant past, that i have no memory of

---------------------

The links in the `/projects` page are created in the html directly, and the navigation is a matter of convention.

------------------------

## build
Create the html and JS from `ssb-ev` posts
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

------------------------------------------------

## estimate reading time
* Get your total word count (including the headline and subhead).
* Divide total word count by 200. The number before the decimal is your minutes.

```css
.projects a:after {
    content: "";
    position: relative;
    padding-top: 0rem;
    border-bottom: 2px solid black;
    width: 50%;
    display: block;
    top: 0.8rem;
}
```

```js
var str = "your long string with many words.";
var wordCount = str.match(/(\w+)/g).length;
alert(wordCount); //6
```

