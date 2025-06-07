# webmentions

see https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/

`mxbck` uses the `deploy-succeeded.js` lambda function in netlify to parse the `notes.json` file and then send any new ones to twitter, etc.

To check if there are new notes, we fetch the currently deployed notes from our live site:
```js
exports.handler = async () => {
    return fetch('https://mxb.dev/notes.json')
        .then(response => response.json())
        .then(processNotes)
        .catch(err => ({
            statusCode: 422,
            body: String(err)
        }))
}
```

see [finished lambda function](https://gist.github.com/maxboeck/77c3c8e244f190147cca2f7383d5f183)

Then compare our list to a [search of twitter](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/)
> We can then search twitter for tweets containing the latest note’s URL 

```js
const processNotes = async notes => {
    // assume the last note was not yet syndicated
    const latestNote = notes[0]

    // check if the override flag for this note is set
    if (!latestNote.syndicate) {
        return {
            statusCode: 400,
            body: 'Latest note has disabled syndication.'
        }
    }

    // check twitter for any tweets containing note URL.
    // if there are none, publish it.
    const search = await twitter.get('search/tweets', { q: latestNote.url })
    if (search.statuses && search.statuses.length === 0) {
        return publishNote(latestNote)
    } else {
        return {
            statusCode: 400,
            body: 'Latest note was already syndicated.'
        }
    }
}
```

## note format

Use a markdown format, with frontmatter

```
---

linkTitle: title
linkDesc: my new description
slug: my-slug
type: note
date: 3-10-2022

---
```

**how to deal with replies and things like that?**

-------------

This log format of *notes* is like the ssb log.

Could maybe put the hash of the previous message in each message, then you wouldn't need to trust the twitter servers.

