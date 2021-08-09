# How to make your userscript LegacyProfiles compatible
<sup>Version 1.4 and up required</sup>

If you want to make your userscript LegacyProfiles compatible, LegacyProfiles provides a way to do so.

## The `legacyProfileConfig` global variable

The `legacyProfileConfig` global variable defines the configuration for your userscript.

The variable can have the properties `isCompatible` and `listElement`.

If you want to make your userscript compatible with LegacyProfiles, set `isCompatible` to `true` and set `listElement` to the element you wish to insert the stats into (should be a `ul` or `ol` element).

For example:

```js
const list = document.createElement("ul");
//...
window.legacyProfileConfig = {isCompatible: true, listElement:list}
```
