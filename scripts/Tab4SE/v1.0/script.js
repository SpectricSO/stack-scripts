// ==UserScript==
// @name         Tab4SE
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  Enables the tab key in the answer textarea
// @author       SpectricSO
// @license      MIT License
// @icon         https://www.gravatar.com/avatar/0fdacb141bca7fa57c392b5f03872176?s=24&d=identicon&r=PG&f=1
//               ^ look its me :D - Spectric
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://api.stackexchange.com/*
// @exclude     *://blog.*.com/*
// @exclude     *://chat.*.com/*
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function () {
        const spaces = 4;
        /*     ^^^
         Modify this variable to change the number of spaces added on [TAB]
     
         E.g, to change it to 2, use: 'const spaces = 2;'. Default is 4
         */

        const HTML = '<li id="wmd-tabs4se-button"><div class="d-flex ai-center h100 ml4 mr4 jc-space-between w100"><label style="color:#bbc0c4" class="flex--item s-label" for="tab4se-toggle">Tab4SE</label><div class="flex--item s-toggle-switch"><input id="tab4se-toggle" type="checkbox"><div class="s-toggle-switch--indicator"></div></div></div></li>';
        const lookFor = 9;
        const editor = $('#wmd-input');
        $(HTML).insertAfter($('#wmd-redo-button'));
        editor.on('keydown', function (e) {
            const code = e.keyCode;
            if (lookFor == code) {
                e.preventDefault();
                const selectionStart = this.selectionStart;
                this.value = this.value.substring(0, selectionStart) + ' '.repeat(spaces) + this.value.substring(selectionStart);
                this.selectionEnd = selectionStart + 4;
            }
        })
    })
})();

/*
MIT License

Copyright (c) 2021 SpectricSO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
