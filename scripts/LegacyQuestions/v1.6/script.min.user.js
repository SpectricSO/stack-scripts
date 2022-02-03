// ==UserScript==
// @name         Legacy Questions
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.6
// @description  Cool stuff
// @author       SpectricSO
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/
// @exclude     *://api.stackexchange.com/
// @exclude     *://blog.*.com/
// @exclude     *://chat.*.com/
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @grant        none
// ==/UserScript==

!function(){var t=window.jQuery;function s(){t(".s-post-summary").each(function(){const s=t(this);if(null==s.attr("data-legacyquestions-rendered")){const i=s.find(".has-bounty");if(i.length){const a=t('<div class="bounty-indicator"></div>');a.text(i.text()),a.prependTo(t(".s-post-summary--content-title",s)),i.remove()}t(".s-post-summary--stats-item",s).each(function(){const s=t(this),i=s.text().trim().split(/(?<=\d)(?!\d)/g),a=t("<div>");a.text(i[0]).addClass("mini-counts"),s.empty(),s.append(a,i[1])})}s.attr("data-legacyquestions-rendered",!0)}),setTimeout(function(){t(".s-tag__watched").removeClass("s-tag__watched")},500)}t(document).ready(function(){t(document.head).append("<style>.s-post-summary--stats{align-items:flex-start;box-sizing:content-box;display:flex;flex-direction:row;flex-shrink:0;flex-wrap:nowrap;margin-right:0;padding:0 8px 0 0;width:unset}.s-post-summary--stats-item{display:block!important}.mini-counts{font-size:1.30769231rem;line-height:1;margin-bottom:4px}.s-post-summary{padding-left:8px}.s-post-summary--stats-item{border:1px solid transparent;border-radius:3px;color:var(--fc-light);display:inline-block;font-size:11px;height:auto;margin:0 3px 0 0;min-width:44px;padding:6px;text-align:center}.s-post-summary--stats-item.has-answers{padding:6px!important}.is-watched{display:none}@media (max-width:980px){.mini-counts{display:inline;font-size:12px;font-weight:700;margin-right:3px}.s-post-summary--stats-item{border-radius:3px;box-sizing:border-box;height:auto;line-height:1;margin:0 4px 0 0;min-width:auto;padding:4px 0;text-align:left;width:auto}}.s-post-summary--stats .s-post-summary--stats-item.s-post-summary--stats-item__emphasized{color:var(--fc-light)!important}</style>"),s(),t(document).ajaxComplete(function(t,i,a){"/posts/ajax-load-realtime-list/"==a.url&&s()})})}();

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
