---

linkTitle: notes on github actions
linkDesc: Finally learning syntax for github actions
slug: gh-actions
type: miscellany

---

# github actions

[digitalocean/action-doctl](https://github.com/digitalocean/action-doctl)

Create a file at `./github/workflows/main.yml`

See an example -- [fission drive](https://github.com/fission-suite/drive/blob/develop/.github/workflows/main.yml#L48-L53)

The field `uses` references a public repo by `owner/name`. So the example references fission's publish action:
```
uses: fission-suite/publish-action@v1
```

Prior to publishing to fission it installs dependencies and builds. Thats the steps `Check out repository` -- `build`.

-----------------------------------------

It looks like the `run` key is used for local commands, and `uses` is an external repo.

----------------------------------------

## digital ocean

https://github.com/digitalocean/action-doctl

[create a token](https://docs.digitalocean.com/reference/api/create-personal-access-token/)

> This action enables you to interact with DigitalOcean services by installing the doctl command-line client.

* first [create a DigitalOcean API token](https://docs.digitalocean.com/reference/api/create-personal-access-token/)

------------------------------------------

https://resources.github.com/whitepapers/GitHub-Actions-Cheat-sheet/

https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository

* [then add it as a secret to the repo](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)

------------------------------------------------

* [deploy a node app to DO](https://www.digitalocean.com/community/tutorials/deploying-a-node-app-to-digital-ocean)
* [https://medium.com/@haxzie/deploying-node-js-application-to-digitalocean-setting-up-the-server-99e1d65fa291](https://medium.com/@haxzie/deploying-node-js-application-to-digitalocean-setting-up-the-server-99e1d65fa291)


