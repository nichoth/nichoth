---

linkTitle: development diary — fission & cypress
linkDesc: Using cypress
slug: dev-diary-fission-cypress
type: dev-diary
date: 2021-10-16

---

# cypress

* [example of cypress in the blog app](https://github.com/nichoth/blog/blob/383413be0b487031f693375fed4f6150a68ff5c4/cypress/integration/posts.spec.js)

Interestingly the identity used in the cypress tests persists between runs of the tests. I would recommend manually clicking through the sign in process the first time the tests run, with a fake email address

I feel like that's a bug with chrome/cypress. It should give you a totally blank slate each time it runs.

