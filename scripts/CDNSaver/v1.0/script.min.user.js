// ==UserScript==
// @name         CDNSaver
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  Never look for a CDN link more than once - CDNSaver allows you to save library CDN links for stack snippets.
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

$(window).on("load",function(){const e=new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"),t="Sorry, but that resource is invalid. Resources must begin with http:// or https:// and allowed extensions are: .css, .js";setTimeout(function(){function a(e,t){e.empty();const a=document.createElement("option");a.disabled=!0,a.selected=!0,a.textContent="Select...",e.append(a),t.forEach(t=>{const a=document.createElement("option");a.value=t.url,a.textContent=t.name,e.append(a)})}function r(){var e=localStorage.getItem("library-saver");if(null!=e){var t=(e=JSON.parse(e)).libraries;return Array.isArray(t)?t:[]}return localStorage.setItem("library-saver",JSON.stringify({libraries:[]})),[]}$("#wmd-snippet-button").on("click",function(){setTimeout(function(){const l=$(".snippet-holder"),s=l.find(".d-flex.gs4.gsy.fd-column.my24"),i=$('<div class="d-flex gs4 gsy fd-column my24"><label class="flex--item s-label c-default">Saved Libraries</label><div class="flex--item s-select"><select id="librarysaver-library-list"><option disabled="">Select...</option><option value="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">jQuery</option><option value="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">Bootstrap</option></select></div><div class="d-flex"><a href="#" id="librarysaver-add-new" class="flex--item s-btn s-btn__filled w100">Add library</a><a href="#" id="librarysaver-delete" class="flex--item s-btn s-btn__danger s-btn__filled ml4 w50">Delete</a></div></div>'),n=i.find("#librarysaver-library-list"),o=l.find("#snpte-html-container").find(".CodeMirror")[0].CodeMirror;n.on("change",function(){d.removeAttr("disabled"),this.value.lastIndexOf(".js")==this.value.length-3?o.setValue('<script src="'+this.value+'"><\/script>\n'+o.getValue()):o.setValue('<link href="'+this.value+'" rel="stylesheet"/>\n'+o.getValue())});const d=i.find("#librarysaver-delete");i.insertAfter(s),i.find("#librarysaver-add-new").on("click",function(){var l=prompt('Please enter name and the URL of an external JS or CSS file seperated by a space\n\nE.g, "<filename> <fileurl>"');if(null!=l){var s=l.split(" ");2==s.length&&s[0].length>0&&s[1].length>0?(!function(a,r){if(!e.test(r)||r.lastIndexOf(".js")!=r.length-3&&r.lastIndexOf(".css")!=r.length-4)alert(t);else{var l=localStorage.getItem("library-saver");if(null!=l)if(l=JSON.parse(l),Array.isArray(l.libraries)){var s=l.libraries;s.push({name:a,url:r}),localStorage.setItem("library-saver",JSON.stringify(l))}else localStorage.setItem("library-saver",JSON.stringify({libraries:[{name:a,url:r}]}));else localStorage.setItem("library-saver",JSON.stringify({libraries:[{name:a,url:r}]}))}}(s[0],s[1]),a(n,r()),d.attr("disabled","disabled")):alert("Incorrect format: name and url must be seperated by a space")}}),d.on("click",function(){var e=i.find(":selected");null==e.attr("disabled")&&(console.log("not default"),function(e,t){var a=localStorage.getItem("library-saver");if(null!=a&&(a=JSON.parse(a),Array.isArray(a.libraries))){var r=a.libraries.filter(a=>a.name==e&&a.url==t);console.log(r),0!=r.length&&(r.forEach(e=>a.libraries.splice(a.libraries.indexOf(e),1)),localStorage.setItem("library-saver",JSON.stringify(a)))}}(e.html(),e.val()),a(n,r()),d.attr("disabled","disabled"))}),a(n,r()),d.attr("disabled","disabled")},500)})},500)});

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
