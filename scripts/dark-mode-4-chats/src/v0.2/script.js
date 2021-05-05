// ==UserScript==
// @name         Dark Mode 4 Chats - Stack Exchange - SpectricSO
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      0.2
// @description  Dark Mode for Stack Exchange Chats
// @author       SpectricSO
// @include      https://chat*.com*
// @include      https://chat*.com/rooms*
// @include      https://chat*.com/users*
// @include      https://chat*.com/faq*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function resetLocalStorage(){
        localStorage.setItem("darkmode4chats", JSON.stringify({
            bgprimary: "#393939",
            textprimary: "#ededed",
            outlineprimary: "#3d3d3d",
            textlink: "#acadac",
            textareabg: "#3e3e3e"
        }));
    }
    if (localStorage.getItem("darkmode4chats") == null) {
        resetLocalStorage();
    }
    var styles = document.createElement("style");
    styles.innerHTML = `/** Dashboard Customizations **/
    :root{
        --bg-primary:#393939;
        --text-primary:#ededed;
        --outline-primary:#3d3d3d;
        --text-link:#acadac;
        --textarea-bg:#3e3e3e;
    }
    .fr a {
        background-color: #2d2d2d;
        color: white !important;
        border: 1px solid;
    }
    .tabs a,.subtabs a{
        color:white !important;
    }
    .nav ul li a{
        color:white !important;
    }
    .ob-post-tag, .ob-user-tag {
        color:black !important;
    }
    .room-mini, .roomcard, .usercard {
        background-color:#3d3d3d !important;
    }
    .usercard-xxl, .roomcard-xxl {
        background-color:var(--outline-primary) !important;
    }
    /** Chat Room customizations**/
    body{
        background-color:var(--bg-primary) !important;
    }
    html, body, ul, table, h1, h3, h4, section, hgroup, header, footer, nav, article, div, span, form, img, blockquote {
        color:var(--text-primary) !important;
    }
    #sidebar #info #roomtitle{
        text-shadow:0 1px 0px black !important;
    }
    .messages{
        background-color:#2D2D2D !important;
    }
    #input-area{
        background-color:#2D2D2D !important;
        border-top:1px solid white;
    }
    .stars .img, #hlogo, #footer-logo, #transcript-logo{
        filter:invert(.5) brightness(2);
    }
    #input{
        background-color:var(--textarea-bg) !important;
    }
    a{
        color: var(--text-link) !important;
    }
    #allrooms{
        background-color:#2D2D2D !important;
    }
    .mention {
        background-color: #efefef !important;
        color: black !important;
    }
    .popup, #main.message-admin-mode .message-controls, #conversation-sel{
        background-color:var(--bg-primary) !important;
    }
    .calendar{
        color:black !important;
    }
    .popup .btn-close, #conversation-sel .btn-close{
        color:black !important;
    }
    div.message .meta{
        background-color:var(--outline-primary) !important;
    }
    a.button, button{
        background-color:#2d2d2d !important;
        color:black;
    }
    #chat-buttons button{
        background-color:black !important;
    }
    #chat-buttons button.disabled{
        background-color:#aaa !important;
    }
    .wmd-prompt-dialog {
        background-color:var(--outline-primary) !important;
    }
    .wmd-mini-button{
        background-color:black !important;
    }
    .monologue .timestamp{
        background-color:var(--outline-primary) !important;
    }
    input ,textarea{
        background-color:var(--outline-primary) !important;
        color:var(--text-primary) !important;
    }
    .reply-parent *,.reply-child *{
        color:black !important;
    }
    button, input[class="button"], a[class="button"] {
        border: 1px solid !important;
    }
    .tag{
        color:black !important;
    }
    .system-message-container .system-message{
        background: linear-gradient(270deg, var(--outline-primary), white);
    }
    .highlight {
        background-color: #878787 !important;
    }
    .ob-post{
        background-color:var(--outline-primary) !important;
    }
    #tabcomplete li {
        background-color: var(--bg-primary);
    }
    .calendar-small {
        color:black !important;
    }
    `;
    $(document.head).append(styles);
    var html = `<style>.dark-mode-settings-modal *{color:#ededed !important;}.dark-mode-settings-modal{background-color:#3d3d3d !important;height: fit-content; width: 600px; position: fixed; left: calc((100% - 600px) / 2); top: 25%; background-color: var(--bg-primary); z-index: 100000; box-shadow: 0 0 3px white; border-radius: 5px; padding: 2em;}.dark-mode-settings-modal .dark-mode-options{margin-top:20px;}.dark-mode-settings-modal .dark-mode-option{display: flex; justify-content: space-between; margin: 10px 0px;}</style><div class="dark-mode-settings-modal"> <h1>Dark Mode for Chats</h1> <h3>By: <a href="https://stackoverflow.com/users/14251221/spectric">Spectric</a></h3> <div class="dark-mode-options"> <div class="dark-mode-option"> <p>Background: </p><input type="color" id="dark-mode-bg-primary"> </div><div class="dark-mode-option"> <p>Text Color (Primary): </p><input type="color" id="dark-mode-text-primary"> </div><div class="dark-mode-option"> <p>Outline Primary: </p><input type="color" id="dark-mode-outline-primary"> </div><div class="dark-mode-option"> <p>Text Color (Link): </p><input type="color" id="dark-mode-text-link"> </div><div class="dark-mode-option"> <p>Textarea Color: </p><input type="color" id="dark-mode-textarea-bg"> </div></div><b id="dark-mode-reset" style="cursor:pointer;text-decoration:underline">[Reset Preferences]</b></div>`;
    $(document.body).append(html);
    var modal = $('.dark-mode-settings-modal');
    modal.hide();
    calibrate();
    function updateInputs(){
        var preferences = JSON.parse(localStorage.getItem("darkmode4chats"));
        $('#dark-mode-bg-primary').val(preferences.bgprimary);
        $('#dark-mode-text-primary').val(preferences.textprimary);
        $('#dark-mode-outline-primary').val(preferences.outlineprimary);
        $('#dark-mode-text-link').val(preferences.textlink);
        $('#dark-mode-textarea-bg').val(preferences.textareabg);
    }
    updateInputs();
    function calibrate() {
        var preferences = JSON.parse(localStorage.getItem("darkmode4chats"));
        document.documentElement.style.setProperty('--bg-primary', preferences.bgprimary);
        document.documentElement.style.setProperty('--text-primary', preferences.textprimary);
        document.documentElement.style.setProperty('--outline-primary', preferences.outlineprimary);
        document.documentElement.style.setProperty('--text-link', preferences.textlink);
        document.documentElement.style.setProperty('--textarea-bg', preferences.textareabg);
    }
    function reset(){
        document.documentElement.style.removeProperty('--bg-primary');
        document.documentElement.style.removeProperty('--text-primary');
        document.documentElement.style.removeProperty('--outline-primary');
        document.documentElement.style.removeProperty('--text-link');
        document.documentElement.style.removeProperty('--textarea-bg');
        resetLocalStorage();
        updateInputs();
    }
    function edit(id, value) {
        var preferences = JSON.parse(localStorage.getItem("darkmode4chats"));
        switch (id) {
            case "dark-mode-bg-primary":
                preferences.bgprimary = value;
                break;
            case "dark-mode-text-primary":
                preferences.textprimary = value;
                break;
            case "dark-mode-outline-primary":
                preferences.outlineprimary = value;
                break;
            case "dark-mode-text-link":
                preferences.textlink = value;
                break;
            default:
                preferences.textareabg = value;
        }
        localStorage.setItem("darkmode4chats", JSON.stringify(preferences));
        calibrate();
    }
    $(document).ready(function () {
        $('.links-container').first().prepend('<span class="topbar-menu-links" style=""><a href="#" title="Dark Mode for Chats"><b>Dark Mode for Chats</b></a></span>');
        var icons = document.createElement("link");
        icons.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
        icons.setAttribute("rel", "stylesheet");
        $(document.head).append(icons);
        $(document.body).append('<div class="dark-mode-settings" style="position: fixed;top: 50px;padding: 10px;background-color: black;border-radius: 0 50% 50% 0px;box-shadow: 0 0 3px white;text-align: right;cursor: pointer;user-select: none;z-index: 100000;"><span class="material-icons" style="vertical-align: middle;">settings</span></div>');
        $('.dark-mode-settings').on('click', function () {
            modal.toggle();
        })
        $('input', modal).on('input', function () {
            var t = $(this);
            edit(t.attr('id'), t.val());
        })
        $('#dark-mode-reset', modal).on('click', function(){
            reset();
        })
    })
})();
