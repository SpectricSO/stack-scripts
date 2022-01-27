// ==UserScript==
// @name         Legacy Questions [Auto Update Version]
// @namespace    https://github.com/SpectricSO/stack-scripts
// @description  Cool stuff
// @author       SpectricSO
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://api.stackexchange.com/*
// @exclude     *://blog.*.com/
// @exclude     *://chat.*.com/
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @updateURL    https://github.com/SpectricSO/stack-scripts/raw/main/scripts/LegacyQuestions/latest.user.js
// @version      1.3.1
// @grant        none
// ==/UserScript==

(function () {
    var $ = window.jQuery;
    function render() {
        $('.s-post-summary').each(function () {
            const post = $(this);
            if (post.attr('data-legacyquestions-rendered') == undefined) {
                const bounty = post.find('.has-bounty');
                if (bounty.length) {
                    const bountyIndicator = $('<div class="bounty-indicator"></div>')
                    bountyIndicator.text(bounty.text())
                    bountyIndicator.prependTo($('.s-post-summary--content-title', post))
                    bounty.remove();
                }
                $('.s-post-summary--stats-item', post).each(function () {
                    const item = $(this);
                    const text = item.text().trim().split(" ");
                    const header = $('<div>');
                    header.text(text[0]).addClass("mini-counts");
                    item.empty();
                    item.append(header, text[1]);
                })
            }
            post.attr('data-legacyquestions-rendered', true);
        })
    }
    $(document).ready(function () {
        const styles = `<style>.s-post-summary--stats{flex-direction:row;width:unset;display:flex;flex-wrap:nowrap;align-items:flex-start;margin-right:0;padding:0 8px 0 0;box-sizing:content-box;flex-shrink:0}.s-post-summary--stats-item{height:100%}.mini-counts{font-size:1.30769231rem;line-height:1;margin-bottom:4px}.s-post-summary{padding-left:8px}.s-post-summary--stats-item{display:inline-block;margin:0 3px 0 0;min-width:44px;height:auto;font-size:11px;padding:6px;border:1px solid transparent;border-radius:3px;text-align:center;color:var(--fc-light)}.s-post-summary--stats-item.has-answers{padding:6px!important}.is-watched{display:none}@media (max-width: 980px){.mini-counts{display:inline;font-size:12px;font-weight:bold;margin-right:3px}.s-post-summary--stats-item{padding:4px 0;line-height:1;box-sizing:border-box;width:auto;height:auto;border-radius:3px;min-width:auto;text-align:left;margin:0 4px 0 0}}</style>`
        $(document.head).append(styles);
        render();
        $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url == '/posts/ajax-load-realtime-list/') {
                render();
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
