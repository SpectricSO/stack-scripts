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
$(document).ready(function(){var e=document.createElement("link");e.setAttribute("href","https://fonts.googleapis.com/icon?family=Material+Icons"),e.setAttribute("rel","stylesheet"),$(document.head).append(e);var t=document.createElement("style");t.innerHTML="\n\t.left-sidebar-toggle-a, .right-sidebar-toggle-a{\n\tposition: fixed;\n    top: calc((100% - 44px)/2);\n    z-index: 10000;\n    padding: 10px;\n    background-color: white;\n    border-radius: 50%;\n    transition:0.5s;\n    height:fit-content;\n    cursor:pointer;\n    }\n    .left-sidebar-toggle-a{\n    left: 50px;\n    }\n    .right-sidebar-toggle-a{\n\t\tright:50px;\n    }\n    .left-sidebar-toggle-a:hover{\n    background-color:#ededed;\n    }\n    .right-sidebar-toggle-a:hover{\n    background-color:#ededed;\n    }",$(document.head).append(t);var n=$(".left-sidebar");n.fadeToggle();var o=document.createElement("span");o.setAttribute("class","material-icons left-sidebar-toggle-a"),o.innerHTML="keyboard_arrow_right",$(document.body).append(o),console.log(o),$(o).on("click",function(){n.fadeToggle()});var a=$(".sidebar-linked");(a=0==a.length?$("#sidebar"):a.siblings()).toggle();var r=document.createElement("span");r.setAttribute("class","material-icons right-sidebar-toggle-a"),r.innerHTML="keyboard_arrow_left",$(document.body).append(r),$(r).on("click",function(){a.toggle()})});
})();
