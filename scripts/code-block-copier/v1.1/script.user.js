// ==UserScript==
// @name         Spectric's_Stack_Overflow_Code_Block_Copier
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Copy code blocks with a single click
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
    $(window).on('load',function() {
        var codeblocks = $('pre');
        var firstTime = localStorage.getItem("spectric-so-copy-codeblock-tool-first") == null;
        var enabledInStorage = localStorage.getItem("spectric-so-copy-codeblock-tool-enabled");
        var isEnabled =  enabledInStorage == null || enabledInStorage == "true" ? true : false;
        if(firstTime){
        	welcome();
        	localStorage.setItem("spectric-so-copy-codeblock-tool-enabled", true);
        	var modal = $('#spectric-so-copy-codeblock-tool-modal');
        	setTimeout(function(){modal.css('top','20px')},100);
        	$('#spectric-so-copy-codeblock-tool-modal-close').on('click', function(){
        		$('#spectric-so-copy-codeblock-tool-modal').css({'top': '-300px'});
        		localStorage.setItem("spectric-so-copy-codeblock-tool-first", true);
        	})
        }
        function showHelp(){
        	var modal = $('#spectric-so-copy-codeblock-tool-modal-help');
        	modal.css('top','20px');
        }
        function welcome(){
        	var welcomeDiv = document.createElement("div");
        	welcomeDiv.setAttribute("id", "spectric-so-copy-codeblock-tool-modal");
        	welcomeDiv.setAttribute("style", "color: black;position: fixed;top: -300px;width: 500px;height: auto;z-index: 10000;margin-left: calc((100% - 500px) / 2);box-shadow: 0 0 3px black;background-color: white;transition: 1s;padding: 1em;font-family: system-ui;");
        	var heading = document.createElement("h1");
        	heading.setAttribute("style", "padding-top:10px;");
        	heading.textContent="Welcome!";
        	var paragraph = document.createElement("p");
        	paragraph.innerHTML="<p>Thank you for using Spectric's Stack Overflow Code Block Copier.<br><br>To get started, click the OK button below and hover over a codeblock. Select the copy icon on the bottom right and the contents of the code block will be automatically copied to your clipboard.<br><br>To configure settings, click Ctrl+Shift+A</p>";
        	var button = document.createElement("button");
        	button.setAttribute("id", "spectric-so-copy-codeblock-tool-modal-close");
        	button.setAttribute("style","float: right;background-color: #3e86e8;border: none;color: white;width: 75px;height: 25px;border-radius: 3px;cursor: pointer;");
        	button.innerHTML="Ok";
        	welcomeDiv.appendChild(heading);
        	welcomeDiv.appendChild(paragraph);
        	welcomeDiv.appendChild(button);
        	document.body.appendChild(welcomeDiv);
        }
        function install() {
        	var helpDiv = document.createElement("div");
        	var toggleButtonStyles = document.createElement("style");
        	toggleButtonStyles.innerHTML="#spectric-so-copy-codeblock-tool-modal-help .switch {float:right;vertical-align:middle;position: relative;display: inline-block;width: 48px;height: 27.2px;}#spectric-so-copy-codeblock-tool-modal-help .switch input {opacity: 0;width: 0;height: 0;}#spectric-so-copy-codeblock-tool-modal-help .slider {position: absolute;cursor: pointer;top: 0;left: 0;  right: 0;  bottom: 0;  background-color: #ccc;  -webkit-transition: .4s;  transition: .4s;}#spectric-so-copy-codeblock-tool-modal-help .slider:before {  position: absolute;  content: \"\";  height: 20.8px;  width: 20.8px;  left: 3.2px;  bottom: 3.2px;  background-color: white;  -webkit-transition: .4s;  transition: .4s;}#spectric-so-copy-codeblock-tool-modal-help input:checked + .slider {  background-color: #2196F3;}#spectric-so-copy-codeblock-tool-modal-help input:focus + .slider {  box-shadow: 0 0 1px #2196F3;}#spectric-so-copy-codeblock-tool-modal-help input:checked + .slider:before {  -webkit-transform: translateX(20.8px);  -ms-transform: translateX(20.8px);  transform: translateX(20.8px);}";
        	document.head.appendChild(toggleButtonStyles);
        	helpDiv.setAttribute("id", "spectric-so-copy-codeblock-tool-modal-help");
        	helpDiv.setAttribute("style", "color: black;position: fixed;top: -300px;width: 500px;height: 150px;z-index: 10000;margin-left: calc((100% - 500px) / 2);box-shadow: 0 0 3px black;background-color: white;transition: 1s;padding: 1em;font-family: system-ui;");
        	var heading = document.createElement("h2");
        	heading.setAttribute("style", "padding-top:10px;");
        	heading.textContent="Code Block Copier Settings";
        	helpDiv.appendChild(heading);
        	var enabledLabel = document.createElement("p");
        	enabledLabel.innerHTML="Extension enabled (will reload to apply): ";
        	enabledLabel.setAttribute("style", "display:inline;vertical-align:middle;");
        	helpDiv.appendChild(enabledLabel);
        	helpDiv.innerHTML+='<label class="switch"><input type="checkbox"'+(isEnabled == true ? " checked " : " ")+'id="spectric-so-copy-codeblock-tool-option-enabled"><span class="slider"></span></label>';
        	var button = document.createElement("button");
        	button.setAttribute("id", "spectric-so-copy-codeblock-tool-modal-help-close");
        	button.setAttribute("style","background-color: #3e86e8; border: none; color: white; width: 75px; height: 25px; border-radius: 3px; cursor: pointer; position: absolute; right: 15px; bottom: 15px;");
        	button.innerHTML="Ok";
        	helpDiv.appendChild(button);
        	document.body.appendChild(helpDiv);
            var materialIcons = document.createElement("link");
            materialIcons.setAttribute("rel", "stylesheet");
            materialIcons.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
            document.head.appendChild(materialIcons);
        }

        function setup() {
            document.onkeydown = searchForShortcut;
            function searchForShortcut(evt){
              if (!evt) evt = event;
              if (evt.ctrlKey && evt.shiftKey && evt.keyCode==65){
                showHelp();
              }
            }
            for(let i = 0; i < codeblocks.length; i++){
            	if(codeblocks[i].offsetHeight != "600"){
            		$(codeblocks[i]).css('overflow-y', 'hidden');
            	}
            	$(codeblocks[i]).css('position', 'relative');
            }
            var copyButton = document.createElement("div");
            copyButton.setAttribute("style", "color: black;padding: 11.200px;background-color: white;border-radius: 50%;box-shadow: 0 0 3px black;display: inline-grid;user-select: none;cursor: pointer;position: absolute;right: 10px;bottom: -50px;transform: scale(0.7);transition:0.5s;")
            copyButton.setAttribute("class", "spectric-so-copy-codeblock-tool")
            copyButton.innerHTML = "<span class='material-icons'>content_copy</span>";
            codeblocks.append(copyButton);
            //Help page
        	$('#spectric-so-copy-codeblock-tool-modal-help-close').on('click', function(){
        		$('#spectric-so-copy-codeblock-tool-modal-help').css('top','-300px');
        		saveSettings();
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
        let helpModal = $('#spectric-so-copy-codeblock-tool-modal-help');
        let enabledOption = $('.switch input[type="checkbox"]', helpModal);
        function saveSettings(){
        	localStorage.setItem("spectric-so-copy-codeblock-tool-enabled", enabledOption[0].checked);
        	if(enabledOption[0].checked != isEnabled){
        		location.reload();
        	}
        }
        if(isEnabled){
        	function logic() {
                codeblocks.on('mouseover', function() {
                    $('.spectric-so-copy-codeblock-tool', this).css('bottom', '-2px');
                })
                codeblocks.on('mouseleave', function() {
                    $('.spectric-so-copy-codeblock-tool', this).css('bottom', '-50px');
                })
                var prevInterval;
                $('.spectric-so-copy-codeblock-tool').on('click',function() {
                    let plainCode = $(this).closest('pre')[0].innerText;
                    let processed = plainCode.substring(0, plainCode.length - 13);
                    if (prevInterval != null) {
                        clearInterval(prevInterval);
                    }
                    $(this).html('<span class="material-icons">done</span>');
                    var current = $(this);
                    prevInterval = setTimeout(function() {
                        current.html('<span class="material-icons"s>content_copy</span>');
                    }, 1000);
                    copyToClipboard(processed);
                })
            }
        	logic();
        }
    });
})();
/*
Copyright 2021 <Spectric @ https://stackoverflow.com/users/14251221/spectric>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
