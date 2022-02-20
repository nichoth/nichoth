---

linkTitle: ucan demo
linkDesc: A demonstration of using UCANs for an invitation-only web app
slug: ucan-demo
type: miscellany
date: 2-19-2022

---

[nichoth/ucan-demo](https://github.com/nichoth/ucan-demo)

# UCAN demo

There is a kind of verbose description at the demo website -- https://ucan-demo.netlify.app/ .

We are using an invitation code that is redeemed by a host (the country club, in this case). If the code is valid, then the host creates a UCAN for the client. The client then needs to save the UCAN somehow, and the UCAN is sent with any request that requires verification.

This is an example app that runs entirely client-side, but in real life you would use a proper backend.

