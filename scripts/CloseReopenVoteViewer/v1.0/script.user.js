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

(function () {
    'use strict';
    $(window).on('load', function () {
        const questionControls = $('.question .js-post-menu .flex--item');
        const questionID = StackExchange.question.getQuestionId();
        const filter = "!4(sMf_X*broLj(lWk";
        const apiKey = "OwkuA2ZAoD8de0vLip5czw((";
        const site = location.host;
        const requestParams = "?site=" + site + "&filter=" + filter + "&key=" + apiKey;
        const endpoint = "https://api.stackexchange.com/2.3/questions/" + questionID + requestParams;
        const hasPrivilegeAlready = questionControls.find('.js-close-question-link').length == 1;
        if (!hasPrivilegeAlready) {
            const element = $('<div class=flex--item><button class="s-btn s-btn__link"id=ViewCloseReopenVotesWithout3KRep type=button>Close</button></div>');
            $.get(endpoint, function (response) {
                if (response.items.length > 0) {
                    const questionData = response.items[0];
                    const isClosed = !!questionData.closed_date;
                    const text = (isClosed ? "Reopen" : "Close") + " (" + (isClosed ? questionData.reopen_vote_count : questionData.close_vote_count) + ")";
                    element.find('#ViewCloseReopenVotesWithout3KRep').text(text)
                    element.insertAfter(questionControls.find('.js-follow-post').parent());
                }
            })
        }
    })
})();   
