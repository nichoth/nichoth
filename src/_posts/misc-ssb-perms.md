---

linkTitle: ssb permissions
linkDesc: A bit of info about secret-stack permissions
slug: ssb-perms
type: miscellany
date: 12-28-2021

---

See this [on
github](https://github.com/ssbc/ssb-server/issues/736#issuecomment-712443456)

Plugins specify permissions:
https://github.com/ssb-js/secret-stack/blob/main/PLUGINS.md#pluginpermissions-object-optional

To make a method public, it should be included in the anonymous array in the permissions object.
e.g. the example in the above linked file makes a localPeers method public:

```js
  permissions: {
    anonymous: [ 'localPeers' ]                                         
  },
```

`createHistoryStream` has it specified here:
https://github.com/ssbc/ssb-db/blob/master/index.js#L50

`anonymous` is the permission group that all remote callers are in by default. The local user and `ssb-master-authenticated` callers can call any method by default.

