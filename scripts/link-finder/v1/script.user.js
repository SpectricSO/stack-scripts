// ==UserScript==
// @name         Spectric's_Link_Finder
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Copy direct links to comments and answers with a single click
// @author       Spectric </users/14251221 @ stackoverflow.com>
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*.stackexchange.com/*
//
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
//
// @exclude      *chat.*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    $(window).on('load', function(){
	var answers = $('.answer');
	var comments = $('.comment');
	function install(){
		var materialIcons = document.createElement("link");
        materialIcons.setAttribute("rel", "stylesheet");
        materialIcons.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
        document.head.appendChild(materialIcons);
	}
	function setup(){
		var styles = document.createElement("style");
		styles.innerHTML=".spectric-link-finder{transition:0.5s;cursor:pointer;border-radius:50%;}.spectric-link-finder.lf-answer{padding:0.2em;margin: auto;user-select: none;margin-top: 10px;}.spectric-link-finder:hover{background-color:#ededed;}.spectric-link-finder.lf-comment{opacity: 0.5;font-size: 1.5em;vertical-align: middle;user-select: none;position: absolute;margin-left: 10px;display:none;}";
		document.head.append(styles);
		var answerLinkButton = document.createElement("span");
		answerLinkButton.setAttribute("class","material-icons spectric-link-finder lf-answer");
		answerLinkButton.innerHTML="link";
		var commentLinkButton = document.createElement("span");
		commentLinkButton.setAttribute("class", "material-icons spectric-link-finder lf-comment");
		commentLinkButton.innerHTML="link";
		var answerToolbar = $('.js-voting-container', answers);
		answerToolbar.append(answerLinkButton);
		var commentEnding = $('.comment-body', comments);
		commentEnding.append(commentLinkButton);
	}
	function logic(){
		comments.on('mouseover', function(){
			$('.lf-comment', this).css('display','inline');
		})
		comments.on('mouseleave', function(){
			$('.lf-comment', this).hide();
		})
		var prevIntervalAnswer;
		var loc = location.toString();
		var poundIndex = loc.indexOf('#');
		var questionId = loc.substring(loc.lastIndexOf('/')+1, (poundIndex == -1 ? loc.length : poundIndex));
		var stripped = loc.substring(0,(poundIndex == -1 ? loc.length : poundIndex));
		$('.spectric-link-finder.lf-answer').on('click', function(){
			if(prevIntervalAnswer != null){
				clearInterval(prevIntervalAnswer);
			}
			var id = $(this).closest('.answer').data('answerid');
			copyToClipboard(stripped+'#'+id);
			$(this).html('check');
			var currentButton = $(this);
			prevIntervalAnswer = setTimeout(function(){currentButton.html('link');},1000);
		})
		var prevIntervalComment;
		$('.spectric-link-finder.lf-comment').on('click', function(){
			if(prevIntervalComment != null){
				clearInterval(prevIntervalComment);
			}
			var id = $(this).closest('.comment').data('comment-id');
			var constructed = stripped + '#comment'+id+'_'+questionId;
			copyToClipboard(constructed);
			$(this).html('check');
			var currentButton = $(this);
			prevIntervalComment = setTimeout(function(){currentButton.html('link');},1000);
		})
	}
	function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
            throw new Error('[Spectric\'s Stack Overflow Code Block Copier] Your browser does not support copying text');
        }
        document.body.removeChild(textArea);
    }
	install();
	setup();
	logic();
})
})();
