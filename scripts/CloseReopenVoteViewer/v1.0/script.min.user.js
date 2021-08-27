// ==UserScript==
// @name         Close/Reopen Vote Viewer
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  Cool stuff
// @author       SpectricSO
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
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

!function(){"use strict";$(window).on("load",function(){const t=$(".question .js-post-menu .flex--item"),e="https://api.stackexchange.com/2.3/questions/"+StackExchange.question.getQuestionId()+("?site="+location.host+"&filter=!4(sMf_X*broLj(lWk&key=OwkuA2ZAoD8de0vLip5czw((");if(!(1==t.find(".js-close-question-link").length)){const o=$('<div class=flex--item><button class="s-btn s-btn__link"id=ViewCloseReopenVotesWithout3KRep type=button>Close</button></div>');$.get(e,function(e){if(e.items.length>0){const n=e.items[0],s=!!n.closed_date,i=(s?"Reopen":"Close")+" ("+(s?n.reopen_vote_count:n.close_vote_count)+")";o.find("#ViewCloseReopenVotesWithout3KRep").text(i),o.insertAfter(t.find(".js-follow-post").parent())}})}})}();

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
