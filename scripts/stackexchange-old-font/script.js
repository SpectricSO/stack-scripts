// ==UserScript==
// @name         Stack Overflow Old Font
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Uses the previous default SO font instead of system defualt
// @author       SpectricSO
// @match        https://*stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     $(document.head).append('<style>*:not(pre){font-family:Arial !important;}</style>');
})();
