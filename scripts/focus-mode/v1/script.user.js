// ==UserScript==
// @name         Stack Exchange Focus Mode
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1
// @description  Focus mode for Stack Overflow
// @author       SpectricSO
// @match        https://stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*.stackexchange.com/*
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
// @exclude      *chat.*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    $(document).ready(function() {
        var icons = document.createElement("link");
        icons.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
        icons.setAttribute("rel", "stylesheet");
        $(document.head).append(icons);
        var styles = document.createElement("style");
        styles.innerHTML = `
	.left-sidebar-toggle-a, .right-sidebar-toggle-a{
	position: fixed;
    top: calc((100% - 44px)/2);
    z-index: 10000;
    padding: 10px;
    background-color: white;
    border-radius: 50%;
    transition:0.5s;
    height:fit-content;
    cursor:pointer;
    }
    .left-sidebar-toggle-a{
    left: 50px;
    }
    .right-sidebar-toggle-a{
		right:50px;
    }
    .left-sidebar-toggle-a:hover{
    background-color:#ededed;
    }
    .right-sidebar-toggle-a:hover{
    background-color:#ededed;
    }`;
        $(document.head).append(styles);
        var leftSidebar = $('.left-sidebar');
        leftSidebar.fadeToggle();
        var leftToggle = document.createElement("span");
        leftToggle.setAttribute("class", "material-icons left-sidebar-toggle-a");
        leftToggle.innerHTML = "keyboard_arrow_right";
        $(document.body).append(leftToggle);
        console.log(leftToggle);
        $(leftToggle).on('click', function() {
            leftSidebar.fadeToggle();
        })
        var toHideModules = $('.sidebar-linked');
        if (toHideModules.length == 0) {
            toHideModules = $('#sidebar');
        } else {
            toHideModules = toHideModules.siblings();
        }
        toHideModules.toggle();
        var rightToggle = document.createElement("span");
        rightToggle.setAttribute("class", "material-icons right-sidebar-toggle-a");
        rightToggle.innerHTML = "keyboard_arrow_left";
        $(document.body).append(rightToggle);
        $(rightToggle).on('click', function() {
            toHideModules.toggle();
        })
    })
})();
