// ==UserScript==
// @name         Legacy Profiles
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.1
// @description  Cool stuff
// @author       SpectricSO
// @match       *://*.askubuntu.com/users/*
// @match       *://*.mathoverflow.net/users/*
// @match       *://*.serverfault.com/users/*
// @match       *://*.stackapps.com/users/*
// @match       *://*.stackexchange.com/users/*
// @match       *://*.stackoverflow.com/users/*
// @match       *://*.superuser.com/users/*
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

!function(){"use strict";const e="https://api.stackexchange.com/2.3/users/"+location.pathname.split("/")[2]+("?order=desc&site="+location.host+"&filter=!40D72h-7nG92Z1_td");$.get(e,function(e){if(0==e.items.length)console.error("No user with that userid found");else{const i=e.items[0],s=new Date(1e3*i.last_access_date).toLocaleString(),t=i.view_count,a=`<li class="flex--item ow-break-word"><div class="ai-center d-flex gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden=true class="svg-icon iconHistory"height=18 viewBox="0 0 19 18"width=19><path d="M3 9a8 8 0 113.73 6.77L8.2 14.3A6 6 0 105 9l3.01-.01-4 4-4-4h3L3 9zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5z"></path></svg></div><div class=flex--item><div>Member since ${new Date(1e3*i.creation_date).toLocaleString()}</div></div></div><li class="flex--item ow-break-word"><div class="ai-center d-flex gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden=true class="svg-icon iconEye"height=18 viewBox="0 0 18 18"width=18><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 110-8 4 4 0 0 1 0 8zm0-2a2 2 0 002-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"></path></svg></div><div class=flex--item><div>${t} profile views</div></div></div><li class="flex--item ow-break-word"><div class="ai-center d-flex gs4 gsx"><div class="flex--item fc-black-350"><svg aria-hidden=true class="svg-icon iconClock"height=18 viewBox="0 0 18 18"width=18><path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6zM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5z"></path></svg></div><div class=flex--item><div>Last seen ${s}</div></div></div>`;$("#user-card ul").first().append(a)}})}();

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
