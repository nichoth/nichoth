---

linkTitle: At Protocol, Bluesky
linkDesc: Refactoring Our Concerns
slug: dev-diary-bluesky
type: dev-diary
date: 2025-11-30

---

# Bluesky as a Backend

Good news everyone. It is possible to consume the Bluesky firehose without
spending money. This is a recipe about how to drink from the firehose,
store relevant data, and serve a custom feed API for free.

Why would you want to drink from a firehose? Using Bluesky as a backend means
that we get a higher level of abstraction for our application code.
Normally you have a database, and the database does not know or care about
what's in it. That's what your application code is for. By using Bluesky's
infrastructure, our app can deal directly with things like "posts" and social
interactions &mdash; "likes" and "follows" &mdash; and we don't have to think
about how to translate database records into those things.

## Moderation

The bigger benefit is that this effectively
[factors out moderation](#refactoring-our-concerns). Moderation is the really
sticky, unpleasant work on the internet, and now you do not have to do it.

## A Few Key Ingredients

### Fly.io

On [fly.io](https://fly.io/), inbound
bandwidth (ingress) is free. That means we can **drink from the firehose**
**without spending any money**. They do charge for outbound bandwidth (egress)
though, so if your app takes flight you might have to spend some money.

### Cloudflare D1

The database in this example is
[Cloudflare D1](https://developers.cloudflare.com/d1/), which also is free for
a small amount of data.

## Kappa Architecture

Hmm<span class="hellip">&hellip;</span> the blusky
"firehose"<span class="hellip">&hellip;</span> plus a
database with state derived from the firehose<span>&hellip;</span> this feels
oddly familiar&hellip; kind of like a
[kappa architecture DB](https://en.wikipedia.org/wiki/Lambda_architecture#Kappa_architecture),
as seen in
[Apache Kafka](https://kafka.apache.org/11/documentation/streams/architecture).

That's good news. Kappa/Kafka architecture is intuitive. This will make our
backend easy to reason about.


## At the End of the Day

It works, too. This is something that is totally feasible to do right now.
It is such nice hack that I've created two templates for it:

* [firehose-consumer](https://github.com/bskyprism/firehose-consumer)
  (fly.io websocket listener)
* [feed-worker](https://github.com/bskyprism/feed-worker)
  (the HTTP server/databse server)


## More Details

### The Firehose

We need a way to tell our application's messages from other applications', like
the Bluesky app's messages for example. There are two possibilities
here &mdash; use a [custom lexicon](https://atproto.com/guides/lexicon),
or re-use an existing Bluesky lexicon and add a unique tag to our
app's messages. Creating a new lexicon means that the Bluesky cient application
would not show our app's messages. Using a unique tag plus re-using the
existing
[Bluesky post lexicon](https://github.com/bluesky-social/atproto/blob/main/lexicons/app/bsky/feed/post.json) would result in our app's content being visible in
the Bluesky app.

For this example, we will use a unique tag. This has the benefit that
Bluesky's moderation policy definitely does apply to our messages, since they
are visible withing Bluesky. This does mean that anyone can create
a message for our application, but that is ok. We can add additional validation
as necessary.

In [at protocol](https://atproto.com/), tags are both extracted from the post
text, and can also be added programmatically if you are using the API. We will
do the latter, meaning that the tags we use are *invisible* to the app
users. They are just added by machines and read by machines, and that's good
becuase it would just be noise if it were visible.

```ts
// browser
import { Agent } from '@atproto/api'
const TAG = 'example'

// oauth result session
const agent = new Agent(result.session)

await agent.post({
    $type: 'app.bsky.feed.post',  // bluesky post type
    text,
    createdAt: new Date().toISOString(),

    // Additional hashtags, besides the post text and facets.
    tags: [TAG],  // <-- our app tag here

    embed: {
        $type: 'app.bsky.embed.images',
        images: [
            {
                alt,  // alt text
                image: data.blob,
                aspectRatio: {  // a hint to clients
                    width: img.naturalWidth,
                    height: img.naturalHeight
                }
            }
        ]
    }
})
```

After we create the post record by calling `agent.post`, the Bluesky servers
will get our post data, then it will be broadcast on the firehose, where it
will be seen by our fly.io server, and our server will call our database server,
which will result in a new record written to our database.

## Register the Custom Feed

So that's great. Now we have some infrastructure for saving our app's posts.
Our frontend only uses the Bluesky `Agent`. How does the agent know how to get
our app's posts, which have been indexed and stored in our DB?

We need to [register our custom feed](https://docs.bsky.app/docs/starter-templates/custom-feeds#publishing-your-feed).
That means calling a method on our `agent` with our custom feed's name. When
someone views our app's custom feed, the client/browser calls Bluesky's
app view backend, the Bluesky backend sees they are asking for our custom
feed, and then the Bluesky backend calls our server
(the Cloudflare server). The Buesky backend gets a "feed skeleton" from our
custom feed server, and then then hydrates the feed skeleton and returns it
to the client.

## Refactoring Our Concerns

This is interesting because effectively Bluesky has factored out moderation.
My application can create data (posts), but Bluesky has to moderate it, because
at the end of the day Bluesky's servers are hosting the data.

This is new. No other service works at that level &mdash; concerned with the
*content* of your data. This is great, because now I do not have to think about
moderation. I don't have to look at inappropriate images and
think about how to ban people, etc.

## See Also

* [A Bluesky post about this](https://bsky.app/profile/nichoth.com/post/3m6scdzclm22p)
* [Bluesky docs &mdash; custom feeds](https://docs.bsky.app/docs/starter-templates/custom-feeds#publishing-your-feed)
* [firehose-consumer](https://github.com/bskyprism/firehose-consumer)
  (fly.io websocket listener)
* [feed-worker](https://github.com/bskyprism/feed-worker)
  (the HTTP server/databse server)
