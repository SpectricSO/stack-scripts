// ==UserScript==
// @name         Stack Replies
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cool stuff
// @author       SpectricSO
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*.stackexchange.com/*
// @include      https://*stackapps.com/*
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// @grant        none
// ==/UserScript==

!function(){"use strict";$(window).on("load",function(){var t=document.createElement("style");t.innerHTML="\n            .stack-reply-btn{\n                display:inline-block;\n                display:none;\n            }\n        ",$(document.head).append(t),$(".comment-body").append('<a class="stack-reply-btn"> reply</a>'),$(".comment-body").on("mouseover",function(){$(".stack-reply-btn",this).css("display","inline-block")}),$(".comment-body").on("mouseleave",function(){$(".stack-reply-btn",this).hide()}),$(".stack-reply-btn").on("click",function(){let t=$(this).closest(".js-post-comments-component"),n=$(this).closest(".comment-text"),e=$("a.comment-link",n).attr("href"),o=$(".comment-copy",n).text();console.log(n);let c=t.find(".js-add-link.comments-link"),s="[Re:]("+(location.protocol+"//"+location.host+location.pathname+e)+"?message-contents="+encodeURIComponent((i=o,l=e,CryptoJS.AES.encrypt(i,l).toString()))+")";var i,l;c.click(),$("textarea",t).val(s)}),$(document).on("keyup",function(t){var n,e,o=window.event||t;if(o.ctrlKey&&o.shiftKey&&70==o.keyCode){let t=prompt("Enter the *full* URL of the comment to extract the original contents:"),o=decodeURIComponent(t).substring(t.indexOf("#")),c=o.substring(o.indexOf("?message-contents=")+18),s=(n=c,e=o.substring(0,o.indexOf("?message-contents=")),CryptoJS.enc.Hex.parse(CryptoJS.AES.decrypt(n,e).toString()).toString(CryptoJS.enc.Utf8));alert("Original message content: "+s)}})})}();
