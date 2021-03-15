# hypercore report

[Paul walks through the Hypercore Protocol API stack](https://www.youtube.com/watch?v=tFpjKdrTQnQ)
--------------
* https://hypercore-protocol.org/guides/
* https://hypercore-protocol.org/guides/workshops/
* https://hypercore-protocol.org/guides/walkthroughs/
* https://hypercore-protocol.org/guides/getting-started/standalone-modules/


## [Paul walks through the Hypercore Protocol API stack](https://www.youtube.com/watch?v=tFpjKdrTQnQ)

hyperdive & hyperbee -- top level data structures, usually the things you will be building off of. Lower level is plumbing.

`hypercore` is an append-only log, the core data strucute. All other data structues are built off of it, including hyperbee & hyperdrive

`corestore` utility for managing many hypercores on disk

`hyperswarm` is the connectivity layer. Helps devices find each other





