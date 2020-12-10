# development diary

Reading here https://ssbc.github.io/scuttlebutt-protocol-guide/#blobs

> blobs.get asks a peer to send you the contents of a blob.

All blobs that you have on your machine are hosted at `localhost/<blobURL>`. See [ssb-serve-blobs](https://github.com/ssbc/ssb-serve-blobs) . I guess you need to call `blobs.get` first, then after that any blob is served on localhost. 

Also saw this [dat photots app](https://github.com/beakerbrowser/dat-photos-app). I have no idea how it works though. there is not even a package.json.

https://github.com/nichoth/eventual
#dev-diary 