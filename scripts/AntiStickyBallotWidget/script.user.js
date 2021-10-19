// ==UserScript==
// @name         Anti-Sticky Ballot Widget
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  Cool stuff
// @author       SpectricSO
// @match       *://*.askubuntu.com/election*
// @match       *://*.mathoverflow.net/election*
// @match       *://*.serverfault.com/election*
// @match       *://*.stackapps.com/election*
// @match       *://*.stackexchange.com/election*
// @match       *://*.stackoverflow.com/election*
// @match       *://*.superuser.com/election*
// @exclude     *://api.stackexchange.com/
// @exclude     *://blog.*.com/
// @exclude     *://chat.*.com/
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(f
