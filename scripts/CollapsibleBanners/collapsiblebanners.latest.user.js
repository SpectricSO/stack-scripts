// ==UserScript==
// @name         CollapsibleBanners
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  Collapse closed banner on questions
// @author       SpectricSO
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
// @exclude     *://api.stackexchange.com/
// @exclude     *://blog.*.com/
// @exclude     *://chat.*.com/
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @updateURL    https://github.com/SpectricSO/stack-scripts/raw/main/scripts/CollapsibleBanners/collapsiblebanners.latest.user.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
(function() {
    $(document).ready(function() {
        const toggleArrow = $('<svg aria-hidden=true class="iconArrowUp js-svg native svg-icon c-pointer t"height=18 style=float:right viewBox="0 0 18 18"width=18><path d="M1 13h16L9 5l-8 8z"style=color:#a6ceed></path></svg>');
        var isOpen = false;
        const banner = $('aside.s-notice.js-post-notice[role="status"]:contains("Closed")')
        banner.prepend(toggleArrow);
        const divider = banner.find('hr');
        const toHideInCollapsed = divider.nextAll();
        toHideInCollapsed.wrapAll('<div id="collapsiblebanner-collapsed-data"/>')
        const collapsedDataContainer = $('#collapsiblebanner-collapsed-data');
        collapsedDataContainer.slideUp(0)
        divider.hide();
        toggleArrow.click(function() {
            collapsedDataContainer.slideToggle('fast');
            if (!isOpen) {
                toggleArrow.css('transform', 'rotate(180deg)')
                divider.fadeIn();
            } else {
                toggleArrow.css('transform', 'rotate(360deg)');
                divider.fadeOut('fast');
            }
            isOpen = !isOpen;
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
