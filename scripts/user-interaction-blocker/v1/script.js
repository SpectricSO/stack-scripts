// ==UserScript==
// @name         Spectric's User Interaction blocker
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Useful userscript to prevent accidental voting fraud when using multiple accounts
// @author       You
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
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
$(window).on('load', function(){
	var blockedUsers = JSON.parse(localStorage.getItem("spectric-block-interactions-users"));
	if(blockedUsers == null){
		blockedUsers = [];
	}
	function install(){
		var styles = document.createElement("style");
		styles.innerHTML = ".spectric-block-interactions-modal{display:none;overflow:hidden;position: fixed;top: 20%;left: 20%;width: 60%;height: 60%;background-color: white;box-shadow: 0 0 3px black;z-index: 10000;border-radius: 5px;font-family: 'Roboto';padding: 2em;}.spectric-block-interactions-modal .spectric-block-interactions-save{position: absolute;bottom: 30px;right: 30px;}.spectric-block-interactions-modal button{padding: 1em;background: var(--theme-button-primary-background-color);color: white;border: none;border-radius: 5px;cursor: pointer;box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 40%);outline: none;}.spectric-block-interactions-modal .spectric-block-interactions-user:hover{background-color:#ededed;}.spectric-block-interactions-modal .spectric-block-interactions-user{margin-bottom: 0; padding: 0.5em;}.spectric-block-interactions-modal .spectric-block-interactions-user .material-icons{cursor:pointer;display:none;user-select:none;vertical-align: middle;float: right;color: red;font-size: 20px;}.spectric-block-interactions-modal .spectric-block-interactions-user:hover .material-icons {display: block;}.spectric-block-interactions-alert{position: fixed;left: 50px;bottom: -50px;height: 47px;width: auto;border-radius: 10px;color: white;font-family: 'Roboto';padding: 1em;font-size: 1.1em;z-index: 1000;transition:1s}";
		var roboto = document.createElement("link");
		roboto.setAttribute("rel", "stylesheet");
		roboto.setAttribute("href","https://fonts.googleapis.com/css?family=Roboto&display=swap");
		document.head.appendChild(roboto);
		var modal = document.createElement("div");
		modal.setAttribute("class","spectric-block-interactions-modal");
		var header = document.createElement("h1");
		header.setAttribute("style", "margin-bottom:5px;");
		header.innerHTML = "User Interactions Blocker";
		var subheader = document.createElement("h3");
		subheader.innerHTML = "Add and remove blocked users";
		var credits = document.createElement("p");
		credits.innerHTML = 'By: <a href="https://stackoverflow.com/users/14251221/spectric">Spectric</a>';
		var line = document.createElement("hr");
		var saveButton = document.createElement("button");
		saveButton.innerHTML = "Save";
		saveButton.setAttribute("class", "spectric-block-interactions-save");
		var userContainer = document.createElement("div");
		userContainer.setAttribute("class", "spectric-block-interactions-user-list");
		userContainer.setAttribute("style", "height: 70%;overflow: auto;");
		var input = document.createElement("input");
		input.setAttribute("class","s-input");
		input.setAttribute("style", "width: 50%;position: absolute;bottom: 30px;left: 30px;");
		input.setAttribute("placeholder", "Enter a username, then press ENTER to add");
		modal.append(userContainer);
		modal.appendChild(header);
		modal.appendChild(subheader);
		modal.appendChild(credits);
		modal.appendChild(line);
		modal.appendChild(userContainer);
		modal.appendChild(saveButton);
		modal.appendChild(input);
		document.body.appendChild(modal);
		var error = document.createElement("div");
		error.setAttribute("class", "spectric-block-interactions-alert");
		document.head.appendChild(styles);
		document.body.appendChild(error);
	}
	function setup(){
		var modal = $('.spectric-block-interactions-modal .spectric-block-interactions-user-list');
		checkEmpty();
			for(let i = 0; i < blockedUsers.length; i++){
				var user = document.createElement("p");
				user.setAttribute("class", "spectric-block-interactions-user");
				user.innerText = blockedUsers[i];
				user.innerHTML += '<span class="material-icons" onclick="$(this).parent().remove();checkEmpty();">delete</span>';
				modal.append(user);
			}
		function checkEmpty(){
			if($('.user', modal).length == 0){
				modal.html("<p id='spectric-block-interactions-empty-user-list-warning' style='color:#bfbfbf;text-align:center;'>You have not blocked interactions with any users yet</p>");
			}
		}
		jQuery(document).on('keydown', '.spectric-block-interactions-modal input', function(ev) {
		    if(ev.key === 'Enter') {
		    	var username = ev.target.value;
		    	if(username != null && username.length > 0){
		    		$('#spectric-block-interactions-empty-user-list-warning').hide();
		    		var user = document.createElement("p");
					user.setAttribute("class", "spectric-block-interactions-user");
					user.innerText = username;
					user.innerHTML += '<span class="material-icons">delete</span>';
					modal.append(user);
					$('.material-icons', user).on('click', function(){
						$(this).parent().remove();
						checkEmpty();
					})
					ev.target.value = "";
		    	}
		        return false;
		    }
		});
	}
	function logic(){
		var question = $('.question')[0];
		if(question != undefined){
			var username = $('.user-details a', question).last().text().trim();
			if (blockedUsers.includes(username)) {
				var upvoteBtn = $('.js-vote-up-btn', question);
				upvoteBtn.off('click');
				var downvoteBtn =$('.js-vote-down-btn', question);
				downvoteBtn.off('click');
				$(upvoteBtn).on('click', function(){
					showAlert();
				})
				$(downvoteBtn).on('click', function(){
					showAlert();
				})
			}
		}
		var answers = $('.answer');
		for (let i = 0; i < answers.length; i++) {
			var username = $('.user-details a', answers[i]).last().text().trim();
			if (blockedUsers.includes(username)) {
				var upvoteBtn = $('.js-vote-up-btn', answers.get(i));
				upvoteBtn.off('click');
				var downvoteBtn =$('.js-vote-down-btn', answers.get(i));
				downvoteBtn.off('click');
				$(upvoteBtn).on('click', function(){
					showAlert();
				})
				$(downvoteBtn).on('click', function(){
					showAlert();
				})
			}
		}
		document.onkeydown = searchForShortcut;
        function searchForShortcut(evt){
          if (!evt) evt = event;
          if (evt.ctrlKey && evt.shiftKey && evt.keyCode==69){
            $('.spectric-block-interactions-modal').fadeToggle();
          }
        }
		$('.spectric-block-interactions-save').on('click', function(){
			save();
		})
		var alert = $('.spectric-block-interactions-alert');
		var prevTimeout;
		function showAlert(){
			if(prevTimeout != null){
				clearTimeout(prevTimeout);
			}
			alert.css({'bottom': '30px', 'background-color':'#ff3838'});
			alert.text('You have disabled interactions with this user.');
			prevTimeout = setTimeout(function(){alert.css('bottom', '-50px');}, 2000);
		}
		function save(){
			var usernames = $('.spectric-block-interactions-user');
			blockedUsers = [];
			for(let i = 0;  i< usernames.length; i++){
				blockedUsers.push(usernames[i].innerText);
			}
			localStorage.setItem("spectric-block-interactions-users", JSON.stringify(blockedUsers));
			blockedUsers = JSON.parse(localStorage.getItem("spectric-block-interactions-users"));
			$('.spectric-block-interactions-modal').fadeToggle();
			alert.css({'bottom': '30px', 'background-color':'#2ed400'});
			alert.text('Successfully updated blocked users. Reload for changes to be put into effect.');
			setTimeout(function(){alert.css('bottom', '-50px');}, 2000);
		}
	}
	install();
	setup();
	logic();
})
})();
/*
Copyright 2021 <Spectric @ https://stackoverflow.com/users/14251221/spectric>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
