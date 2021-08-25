// ==UserScript==
// @name         LinkPreview
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
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
// @exclude     *://blog.*.com/*
// @exclude     *://chat.*.com/*
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

this.$=this.jQuery=jQuery.noConflict(true);!function(){"use strict";$(window).on("load",function(){const i=$('<div class=linkpreview-tooltip-body><div class=linkpreview-link></div><div class="d-flex linkpreview-details"><div class="d-flex ai-center flex--item mr8"><div class="linkpreview-origin-indicator"></div></div><div class=flex--item><div class=linkpreview-origin-text></div><div class=link-preview-origin-description></div></div></div></div>');$(document.head).append("<style>.linkpreview-origin-indicator{width:10px;height:10px;border-radius:50%;margin-top:4.5px}.linkpreview-details{margin-top:8px;border-top:1px solid #ededed}.linkpreview-origin-indicator.origin-local{background-color:var(--green-400)}.linkpreview-origin-indicator.origin-se-local{background-color:var(--yellow-400)}.linkpreview-origin-indicator.origin-external{background-color:var(--red-400)}.linkpreview-origin-text{font-weight:bold;margin-top:5px}.link-preview-origin-description{color:grey}</style>");const o={"origin-local":{title:"Local",description:"This link points toward the same host - it is safe to visit",color:"var(--green-400)"},"origin-se-local":{title:"SE-Local",description:"This link points towards a Stack Exchange site - it is safe to visit",color:"var(--yellow-800)"},"origin-external":{title:"External",description:"This link points toward an external site - visit with caution",color:"red"}},e=["askubuntu.com","mathoverflow.net","serverfault.com","stackapps.com","stackexchange.com","superuser.com","stackoverflow.com"];$(".js-post-body a:not(.s-notice__info a):not(.post-tag):not(:has(img)), .comment .comment-copy a").each(function(){const t=this.href,n=$(this);if(t.trim().length>0){const r=i.clone();r.find(".linkpreview-link").text(t);const s=function(i){const o=new URL(i).host;if(o==location.host)return"origin-local";const t=function(i){return i.split(".").length-1==2?i.substring(i.indexOf(".")+1):i}(o);if(e.includes(t))return"origin-se-local";return"origin-external"}(t),l=o[s],c=r.find(".linkpreview-origin-indicator"),a=r.find(".linkpreview-origin-text"),d=r.find(".link-preview-origin-description");c.addClass(s),a.text(l.title),d.text(l.description),n.css("color",l.color),"origin-external"==s&&n.css("font-weight","bold"),Stacks.setTooltipHtml(this,r.html(),{placement:"top"}),setTimeout(function(){n.next(".s-popover").on("mouseenter",function(){$(this).addClass("is-visible")})},500)}})})}();

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
