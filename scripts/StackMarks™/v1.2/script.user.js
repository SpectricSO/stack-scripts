// ==UserScript==
// @name         StackMarks™
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.2
// @description  even more cool stuff!
// @author       SpectricSO
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
//
// @grant        none
// ==/UserScript==
$(document).ready(function() {
    function a() {
        return JSON.parse(localStorage.getItem("stack-marks-data"))
    }

    function t(a) {
        localStorage.setItem("stack-marks-data", a)
    }

    function e(e) {
        var s = a();
        if (null != s[e]) {
            var n = s;
            delete n[e], t(JSON.stringify(n))
        }
    }

    function s() {
        var t = a(),
            l = $(".stackmarks-list", d);
        l.empty();
        var i = 0;
        for (var r in t) {
            i++;
            var o = document.createElement("div");
            o.classList.add("stackmarks-category");
            var c = document.createElement("h2");
            c.classList.add("stackmarks-category-name"), $(c).css({
                margin: "10px 0px",
                "border-bottom": "1px solid"
            });
            var m = document.createElement("a");
            m.classList.add("stackmarks-category-delete"), m.innerHTML = '<i class="material-icons">delete</i>', $(m).on("dblclick", () => {
                e(r), s()
            }), c.textContent = r, c.appendChild(m), o.appendChild(c);
            var k = document.createElement("div");
            k.classList.add("stackmarks-category-list"), Array.from(t[r].links).forEach(a => {
                var t = document.createElement("div");
                if (t.classList.add("stackmarks-category-item"), null != a.notes && a.notes.length > 0) {
                    t.setAttribute("title", a.notes), t.setAttribute("data-controller", "s-tooltip"), t.setAttribute("data-s-tooltip-placement", "top-start");
                    var e = document.createElement("span");
                    e.innerText = "[N]", e.style.color = "grey", e.style.marginRight = "5px", t.appendChild(e)
                }
                var l = document.createElement("a");
                l.href = a.url, l.innerText = a.title;
                var d = document.createElement("a");
                d.classList.add("stackmarks-delete"), d.innerHTML = '<i class="material-icons">delete</i>';
                var i = document.createElement("span");
                $(i).css({
                    color: "grey",
                    float: "right"
                }), i.textContent = a.date, t.appendChild(l), t.appendChild(d), t.appendChild(i), k.appendChild(t), $(d).on("dblclick", () => {
                    n(r, a.url), s()
                })
            }), o.appendChild(k), l.append(o)
        }
        i || l.append('<span style="color:grey">You have not added any StackMarks yet</span>')
    }

    function n(e, s) {
        var n = a();
        if (null != n[e]) {
            var l = n;
            l[e].links.forEach(a => {
                if (a.url == s) return l[e].links.splice(l[e].links.indexOf(a), 1), void t(JSON.stringify(l))
            })
        }
    }
    var l, d, i, r;

    function o(a, t, e) {
        null != l && clearTimeout(l), $(document.body).append(`<div class="s-toast" aria-hidden="true" role="alertdialog" aria-labelledby="notice-message" id="stackmarks-notice">\n    <aside class="grid s-notice s-notice__${t}" role="status">\n     <div class="grid--cell mr8">\n     </div>\n     <div class="grid--cell lh-lg">\n         ${a}\n     </div>\n </aside>\n </div>`), setTimeout(() => {
            $("#stackmarks-notice").attr("aria-hidden", "false")
        }, 10), l = setTimeout(() => {
            let a = $("#stackmarks-notice");
            a.attr("aria-hidden", "true"), setTimeout(() => {
                a.remove()
            }, 100)
        }, e)
    }
    null == a() && localStorage.setItem("stack-marks-data", "{}"), $(document.head).append('<style>\n    .stackmarks-list .stackmarks-delete, .stackmarks-list .stackmarks-category-delete{\n        display:none;\n        color:#D1383D;\n        margin-left:10px;\n        float: right;\n    }\n    .stackmarks-list .material-icons{\n        font-size:18px;\n    }\n    .stackmarks-category-item:hover > .stackmarks-delete{\n        display:inline;\n    }\n    .stackmarks-list .stackmarks-category-name:hover > .stackmarks-category-delete{\n        display:inline;\n    }\n    </style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document" style="width:80%; min-width:600px">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - Dashboard</h1>\n                <p class="s-modal--body" id="modal-description">Better bookmarks for a better experience, brought to you by <a href="https://stackoverflow.com/users/14251221/spectric">SpectricSO</a></p>\n                <p style="color:red">Double click on the delete icon to delete a bookmark</p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="stackmarks-new-category" style="\n    margin-bottom: 10px;\n    display: none;\n">\n    <input class="s-input w90" id="stackmarks-new-category-input" type="text" placeholder="Category name"><button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category-btn" style="\n    margin-left: 5px;\n">Add</button>\n</div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button" data-action="s-modal#hide">Save and Close</button>\n                    <button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category">New Category</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide"  id="stackmarks-modal-cancel">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-add-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - New</h1>\n                <div class="s-modal--body" id="modal-description">\n            </div>\n            <div class="stackmarks-add-data">\n            <input class="s-input w90" id="stackmarks-add-title" type="text" placeholder="Category name" style="\n    margin-top: 10px;\n    ">\n    <textarea style="margin-top:10px;" class="grid--cell s-textarea" id="stackmarks-add-notes" placeholder="Notes"></textarea>\n    </div>\n            <p></p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button"  id="stackmarks-add-category-confirm">Add</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), $(".question .votecell.post-layout--left .js-voting-container").append('<a class="js-post-issue grid--cell s-btn s-btn__unset c-pointer py6 mx-auto" id="stackmarks-add-new" href="javascript:void(0)" aria-label="Add StackMark">+SM\n    </a>'), setTimeout(() => {
        d = $("#stackmarks-modal"), i = $("#stackmarks-add-modal"), r = $("#stackmarks-add-new"),
            function() {
                var e = a();
                r.on("click", () => {
                    ! function() {
                        var t = $(".s-modal--body", i);
                        t.empty();
                        var e = a(),
                            s = 0;
                        for (var n in $("#stackmarks-add-title").val($(".question-hyperlink").first().text()), e) {
                            s++;
                            var l = document.createElement("label");
                            l.classList.add("s-menu--label", "grid"), l.setAttribute("for", "stackmarks-category-option-" + s);
                            var d = document.createElement("div");
                            d.classList.add("grid--cell", "mr8");
                            var r = document.createElement("input");
                            r.type = "radio", r.classList.add("s-radio"), r.name = "stackmarks-category-option", r.id = "stackmarks-category-option-" + s, d.appendChild(r);
                            var o = document.createElement("div");
                            o.classList.add("grid-cell");
                            var c = document.createElement("div");
                            c.classList.add("s-label"), c.innerText = n, o.appendChild(c), l.appendChild(d), l.appendChild(o), t.append(l)
                        }
                        s || t.append('<span style="color:grey">You have not created any categories yet</span>')
                    }(), Stacks.showModal(i[0])
                }), $("#stackmarks-add-category-confirm").on("click", () => {
                    var e = $(".s-label", $("input[name=stackmarks-category-option]:checked", i).closest(".s-menu--label"));
                    e.text().length > 0 ? (function(e, s, n, l) {
                        var d = a(),
                            i = d[e];
                        const r = new Date;
                        var o = `Y${r.getFullYear()}-M${r.getMonth()+1}-D${r.getDate()}`;
                        if (null == i) {
                            let a = d;
                            a[e] = {
                                links: [{
                                    url: s,
                                    title: n,
                                    date: o,
                                    notes: ""
                                }]
                            }, t(JSON.stringify(a))
                        } else {
                            i.links.forEach(a => {
                                a.url
                            });
                            let a = d;
                            a[e].links.push({
                                url: s,
                                title: n,
                                date: o,
                                notes: null == l ? "" : l
                            }), t(JSON.stringify(a))
                        }
                    }(e.text(), location.pathname, $("#stackmarks-add-title").val(), $("#stackmarks-add-notes").val()), Stacks.hideModal(i[0]), o("Successfully added StackMark", "success", 2e3)) : o("Please choose a category", "danger", 2e3)
                }), $(document).on("keyup", t => {
                    var n = window.event || t;
                    n.ctrlKey && n.shiftKey && 75 == n.keyCode && (e = a(), s(), Stacks.showModal(d[0]))
                }), $("#stackmarks-modal-cancel").click(() => {
                    t(JSON.stringify(e)), o("Cancelled changes", "info", 2e3)
                });
                var n = $(".stackmarks-new-category"),
                    l = $("#stackmarks-new-category-input");
                $("#stackmarks-new-category").click(() => {
                    n.slideToggle()
                }), $("#stackmarks-new-category-btn").click(() => {
                    n.slideUp();
                    var e = l.val();
                    e.length > 0 && (function(e) {
                        var s = a();
                        if (null == s[e]) {
                            var n = s;
                            n[e] = {
                                links: []
                            }, t(JSON.stringify(n))
                        }
                    }(e), s())
                })
            }()
    }, 50)
});

/**
MIT License
Copyright (c) 2021 SpectricSO <https://stackoverflow.com/users/14251221/spectric>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/
