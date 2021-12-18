// ==UserScript==
// @name         Legacy Profiles - cache version
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      -1
// @author       SpectricSO
// @match       *://*.askubuntu.com/users*
// @match       *://*.mathoverflow.net/users*
// @match       *://*.serverfault.com/users*
// @match       *://*.stackapps.com/users*
// @match       *://*.stackexchange.com/users*
// @match       *://*.stackoverflow.com/users*
// @match       *://*.superuser.com/users*
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

/**
 * This is a cached version of the LegacyProfiles script which will only retrieve new profile data every 5 minutes
 * The cached data will be stored in localStorage. If the browser does not support localStorage or the user is in 
 * a mode which does not preserve localStorage data, it will default to no cache.
 * 
 * Intended to save quota for users who use many userscripts that access the API.
 * Results returned from StackExchange API are heavily cached either way.
 */

this.$ = this.jQuery = jQuery.noConflict(true);
(function () {
    'use strict';
    var tabGetValue = new URLSearchParams(location.search).get("tab");
    if (/\/users\/(-)?[0-9]+\/.+/si.test(location.pathname) && !tabGetValue || tabGetValue == "profile") {
        var convertToHumanReadableFormat = function (e) {
            var s, n, t = Math.abs(e);
            return t > 31536e6 ? (s = parseInt(t / 31536e6, 10), n = "years") : t > 2592e6 ? (s = parseInt(t / 2592e6, 10), n = "months") : t > 6048e5 ? (s = parseInt(t / 6048e5, 10), n = "weeks") : t > 864e5 ? (s = parseInt(t / 864e5, 10), n = "days") : t > 36e5 ? (s = parseInt(t / 36e5, 10), n = "hours") : t > 6e4 ? (s = parseInt(t / 6e4, 10), n = "minutes") : (s = parseInt(t / 1e3, 10), n = "seconds"), s + " " + n.substring(0, 1 == s ? n.length - 1 : n.length)
        };
        function setProfileData(lastSeen, viewCount, joinDate) {
            const lastSeenDifference = convertToHumanReadableFormat(new Date() - new Date(lastSeen));
            $("#content .list-reset li").eq(1).replaceWith(`<li class=flex--item><div class="ai-center d-flex gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden=true class="iconClock svg-icon"height=18 viewBox="0 0 18 18"width=18><path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z"></path></svg></div><div class=flex--item>Last seen ${lastSeen.toLocaleString()} (${lastSeenDifference} ago)</div></div>`)
            const HTML = `<ul class="d-flex fc-light fw-wrap gs8 list-reset mln4 s-anchors s-anchors__inherit"><li class="flex--item"><div class="d-flex ai-center gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden="true" class="svg-icon iconHistory" height="18" viewBox="0 0 19 18" width="19"><path d="M3 9a8 8 0 113.73 6.77L8.2 14.3A6 6 0 105 9l3.01-.01-4 4-4-4h3L3 9zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5z"></path></svg></div><div class="flex--item"><div>Member since ${joinDate}</div></div></div></li><li class="flex--item"><div class="d-flex ai-center gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden="true" class="svg-icon iconEye" height="18" viewBox="0 0 18 18" width="18"><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 110-8 4 4 0 0 1 0 8zm0-2a2 2 0 002-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"></path></svg></div><div class="flex--item"><div>${viewCount} profile views</div></div></div></li></ul>`;
            $(HTML).insertAfter($("#content .list-reset").first());
        }
        $(document).ready(function () {
            const data = window.localStorage ? localStorage.getItem('legacyprofiles') : "{}"; //check whether browser supports localStorage
            let cache;
            try {
                cache = data ? JSON.parse(data) : {}; //handle bad JSON
            } catch {
                cache = {};
                console.error('Dumped bad JSON');
            }
            if ((Date.now() - cache.last_update) < 300000 && cache.lastSeen && cache.viewCount && cache.joinDate) { //300000ms = 5 minutes (refresh cache every 5 mins)
                setProfileData(cache.lastSeen, cache.viewCount, cache.joinDate);
            } else {
                console.log('Fetched new data'); //debug
                var apiKey = "LRILX0AC1L*6Ho2Pafa0tg((";
                const userid = location.pathname.split("/")[2];
                const endpoint = "https://api.stackexchange.com/2.3/users/";
                const params = "?order=desc&site=" + location.host + "&filter=!40D72h-7nG92Z1_td&key=" + apiKey;
                const url = endpoint + userid + params;
                $.get(url, function (response) {
                    if (response.quota_remaining == 0) {
                        $('#user-card ul').first().append(`<li class="flex--item ow-break-word"><div class="ai-center d-flex gs4 gsx fc-error">You've exceeded the API limit</div></li>`);
                    } else if (response.items.length == 0) {
                        console.error("No user with that userid found");
                    } else {
                        const userData = response.items[0];
                        const lastSeen = new Date(userData.last_access_date * 1000);
                        const viewCount = userData.view_count;
                        const joinDate = new Date(userData.creation_date * 1000).toLocaleString();
                        setProfileData(lastSeen, viewCount, joinDate);
                        localStorage.setItem('legacyprofiles', JSON.stringify({ last_update: Date.now(), lastSeen: lastSeen, viewCount: viewCount, joinDate: joinDate })); //update cache
                    }
                })
            }
        })
    }
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
