// ==UserScript==
// @name         Dark Mode 4 Chats - Stack Exchange - SpectricSO
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1
// @description  Dark Mode for Stack Exchange Chats
// @author       SpectricSO
// @match        https://chat.stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var styles = document.createElement("style");
    styles.innerHTML = ` .fr a {background-color: #2d2d2d;color: white !important;border: 1px solid;}.tabs a,.subtabs a{color:white !important;}.nav ul li a{color:white !important;}.ob-post-tag, .ob-user-tag {color:black !important;}.room-mini, .roomcard, .usercard {background-color:#3d3d3d !important;}.usercard-xxl, .roomcard-xxl {background-color:#3d3d3d !important;}body{background-color:#393939 !important;}html, body, ul, table, h1, h3, h4, section, hgroup, header, footer, nav, article, div, span, form, img, blockquote {color:#ededed !important;}#sidebar #info #roomtitle{text-shadow:0 1px 0px black !important;}.messages{background-color:#2D2D2D !important;}#input-area{background-color:#2D2D2D !important;border-top:1px solid white;}.stars .img, #hlogo, #footer-logo, #transcript-logo{filter:invert(.5) brightness(2);}#input{background-color:#3e3e3e !important;color:#ededed;}a{color: #acadac !important;}#allrooms{background-color:#2D2D2D !important;}.mention {background-color: #efefef !important;color: black !important;}.popup, #main.message-admin-mode .message-controls, #conversation-sel{background-color:#393939 !important;}.calendar{color:black !important;}.popup .btn-close, #conversation-sel .btn-close{color:black !important;}div.message .meta{background-color:#3D3D3D !important;}a.button, button{background-color:#2d2d2d !important;color:black;}#chat-buttons button{background-color:black !important;}#chat-buttons button.disabled{background-color:#aaa !important;}.wmd-prompt-dialog {background-color:#3d3d3d !important;}.wmd-mini-button{background-color:black !important;}.monologue .timestamp{background-color:#3d3d3d !important;}input ,textarea{background-color:#3d3d3d !important;color:#ededed !important;}.reply-parent *,.reply-child *{color:black !important;}button, input[class="button"], a[class="button"] {border: 1px solid !important;}.tag{color:black !important;}.system-message-container .system-message{background: linear-gradient(270deg, #3d3d3d, white);}.highlight {background-color: #878787 !important;}.ob-post{background-color:#3d3d3d !important;}#tabs .disabled{color:#aaa !important;cursor:not-allowed;}`;
    $(document.head).append(styles);
    $(document).ready(function(){
        $('.links-container').first().prepend('<span class="topbar-menu-links" style=""><a href="#" title="Dark Mode for Chats"><b>Dark Mode for Chats</b></a></span>');

    })
})();
