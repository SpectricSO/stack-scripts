// ==UserScript==
// @name         Tab4SE
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.1
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

!function(){"use strict";$(window).load(function(){const e=4;var t,s=localStorage.getItem("tab4se-enabled");null==s||"true"==s?(t=!0,localStorage.setItem("tab4se-enabled","true")):t=!1;const i=$('<li id="wmd-tabs4se-button"><div class="d-flex ai-center h100 ml16 mr4 jc-space-between w90"><div class="flex--item s-toggle-switch"><input id="tab4se-toggle" type="checkbox" checked><div class="s-toggle-switch--indicator"></div></div><label style="color:#bbc0c4" class="flex--item s-label" for="tab4se-toggle">Tab4SE</label></div></li>'),l=i.find("label");c(t);const n=$("#wmd-input");function c(e){e?l.css("color","black"):l.css("color","#bbc0c4")}setTimeout(function(){i.insertAfter($("#wmd-redo-button")).find("#tab4se-toggle").prop("checked",t).on("change",function(){t=this.checked,localStorage.setItem("tab4se-enabled",t),c(t)})},100),n.on("keydown",function(s){const i=s.keyCode;if(t)if(s.shiftKey&&9==i){s.preventDefault();const t=this.selectionStart;var l=function(t){var s=0;for(let i=t.length-1;i>=0;i--){if(" "!=t.charAt(i)||i<t.length-1-e){t=t.slice(0,i+1);break}s++}return[t,s]}(this.value.substring(0,t));this.value=l[0]+this.value.substring(t),this.selectionEnd=t-l[1]}else if(9==i){s.preventDefault();const t=this.selectionStart;this.value=this.value.substring(0,t)+" ".repeat(e)+this.value.substring(t),this.selectionEnd=t+e}})})}();

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
