---

linkTitle: development diary — fission & cypress
linkDesc: Using cypress
slug: dev-diary-fission-cypress
type: dev-diary
date: 10-16-2021

---

# cypress

Interestingly the identity used in the cypress tests persists between runs of the tests. I would recommend manually clicking through the sign in process the first time the tests run, with a fake email address

I feel like that's a bug with chrome/cypress. It should give you a totally blank slate each time it runs.

