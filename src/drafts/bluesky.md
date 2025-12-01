# Use Bluesky as a Backend

Consume the bluesky firehose, store relevant data, and serve a custom feed API.

## A Few Key Ingredients

An important note about [fly.io](https://fly.io/) is that inbound
bandwidth is free. That means we can **drink from the firehose without spending**
**any money**. They do charge for outbound bandwidth (egress) though, so
if your app takes flight, then you might have to spend some money.

Hmm&hellip; the blusky "firehose"&hellip; plus a database with state derived from
the firehose&hellip; this feels oddly familiar&hellip; kind of
like a [kappa architecture DB](https://en.wikipedia.org/wiki/Lambda_architecture#Kappa_architecture),
as seen in [Apache Kafka](https://kafka.apache.org/11/documentation/streams/architecture).

That's good news. Kappa/Kafka architecture is intuitive. I can think about it.


## At the End of the Day

And it works. This is something that is totally feasible to do right now.
It is such a good idea that I've created two templates for it:

* [firehose-consumer](https://github.com/bskyprism/firehose-consumer)
* [feed-worker](https://github.com/bskyprism/feed-worker)
  (the HTTP server/databse server)

The database in this example is
[Cloudflare D1](https://developers.cloudflare.com/d1/), which also is free for
a small amount of data.


## The Firehose

We need a way to tell our application's messages from other applications', like
the Bluesky app. There are two possibilities here &mdash; use a
[custom lexicon](https://atproto.com/guides/lexicon)
or re-use an existing Bluesky lexicon, and add a unique tag to our
app's messages. Creating a new lexicon means that the Bluesky cient applications
would not show our app's messages, whereas using a unique tag + re-using the
existing
[Bluesky post lexicon](https://github.com/bluesky-social/atproto/blob/main/lexicons/app/bsky/feed/post.json) would result in our app's content being visible in
the Bluesky app.

For this example, we will use a unique tag. This does mean that anyone can
create a message for your application, but that is ok.

In [at protocol](https://atproto.com/), tags are both extracted from the post
text, and can also be added programmatically if you are using the API. We will
do the latter. This means that the tags we use are *invisible* to the app
users. They are just added by machines and read by machines.

```ts
// browser
import { Agent } from '@atproto/api'

// oauth result session
const agent = new Agent(result.session)

await agent.post({
    $type: 'app.bsky.feed.post',  // bluesky post type
    text,
    createdAt: new Date().toISOString(),

    // Additional hashtags, besides the post text and facets.
    tags: [TAG],

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

After we create that post record and call `agent.post`, the Bluesky servers
will get our post data, then it will be broadcast on the firehose, where it
will be seen by our fly.io server, and our server will call our database server,
which will result in a new record written to our database.

## Register the Custom Feed

So that's great. Now we have some infrastructure for saving posts for our app.
Our frontend app only uses the Bluesky `Agent`, so how does it know how to get
our app's posts, which have been indexed and stored in our DB?

We need to [register our custom feed](https://docs.bsky.app/docs/starter-templates/custom-feeds#publishing-your-feed).
That means calling a method on our `agent` with our custom feed's name. When
someone views our app's custom feed, the client/browser calls the Bluesky's
app view backend, the Bluesky backend sees they are asking for your custom
feed, and the Bluesky backend calls our backend service
(the Cloudflare server). The Buesky server then then hydrates the "feed skeleton"
returned by our server, and returns the hydrated feed view to the client.


## Cost Breakdown

- **Fly.io**: ~$5/month for a small always-on VM
- **Cloudflare Workers**: Free tier covers most hobby projects (100k requests/day)
- **Cloudflare D1**: Free tier includes 5GB storage, 5M rows read/day

For a hobby project or early-stage app, you're looking at under $10/month.

## Going Further

- Add **engagement tracking** by also consuming likes and reposts from the firehose
- Implement **algorithmic feeds** with scoring based on engagement, recency, or user preferences
- Use **Durable Objects** for real-time features like WebSocket connections to your own clients
- Add **rate limiting** and **authentication** for multi-user support

The AT Protocol gives you the data. This architecture gives you the flexibility to build whatever you want on top of it.