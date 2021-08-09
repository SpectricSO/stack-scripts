# Incorporating LegacyProfiles into your userscript

If you want to make your userscript LegacyProfiles compatible, LegacyProfiles provides a way to do so.

Define a `legacyProfileConfig` global variable. It should have the properties `isCompatible` and `listElement`.

If you want to make your userscript compatible with LegacyProfiles, set `isCompatible` to `true` and set `listElement` to the element you wish to insert the stats into (should be `ul`).

For example:

```js
const list = document.createElement("ul");
//...
window.legacyProfileConfig = {isCompatible: true, listElement:list}
```
