// ==UserScript==
// @name         StackMarks™
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.4.2
// @description  Better bookmarks
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
    var t, a, s, e, n, o = /^[/]\busers\/\b\d+[/][a-zA-Z0-9]+/gm.test(location.pathname);

    function r() {
        return JSON.parse(localStorage.getItem("stack-marks-data"))
    }

    function i(t) {
        localStorage.setItem("stack-marks-data", t)
    }

    function l(t, a, s, e) {
        var n = r(),
            o = n[t];
        const l = new Date;
        var c = `Y${l.getFullYear()}-M${l.getMonth()+1}-D${l.getDate()}`;
        if (null == o) {
            let e = n;
            e[t] = {
                links: [{
                    url: a,
                    title: s,
                    date: c,
                    notes: ""
                }],
                collapsed: !1
            }, i(JSON.stringify(e))
        } else {
            o.links.forEach(t => {
                t.url
            });
            let r = n;
            r[t].links.push({
                url: a,
                title: s,
                date: c,
                notes: null == e ? "" : e
            }), i(JSON.stringify(r))
        }
    }

    function c(t) {
        var a = r();
        if (null != a[t]) {
            var s = a;
            delete s[t], i(JSON.stringify(s))
        }
    }

    function d() {
        var t = r(),
            s = $(".stackmarks-list", a);
        s.empty();
        var e = 0,
            n = 0;
        for (var o in t) {
            e++;
            var l = document.createElement("div");
            l.classList.add("stackmarks-category");
            var m = document.createElement("div");
            m.classList.add("stackmarks-category-name-container");
            var p = document.createElement("h2");
            p.classList.add("stackmarks-category-name"), p.textContent = o, $(p).css({
                margin: "10px 0px",
                "border-bottom": "1px solid"
            });
            var u = document.createElement("a");
            u.classList.add("stackmarks-category-delete"), u.innerHTML = '<i class="material-icons">delete</i>', m.appendChild(p), m.appendChild(u), l.appendChild(m), $(u).on("dblclick", function() {
                c(o), d()
            });
            var b = document.createElement("div");
            b.classList.add("stackmarks-category-list"), Array.from(t[o].links).forEach(t => {
                n++;
                var a = document.createElement("div");
                if (a.classList.add("stackmarks-category-item"), null != t.notes && t.notes.length > 0) {
                    a.setAttribute("title", t.notes), a.setAttribute("data-controller", "s-tooltip"), a.setAttribute("data-s-tooltip-placement", "top-start");
                    var s = document.createElement("span");
                    s.innerText = "[N]", s.style.color = "grey", s.style.marginRight = "5px", a.appendChild(s)
                }
                var e = document.createElement("a");
                e.href = t.url, e.innerText = t.title, e.classList.add("stackmarks-item-link"), $(e).data("category", o);
                var r = document.createElement("a");
                r.classList.add("stackmarks-delete"), r.innerHTML = '<i class="material-icons">delete</i>';
                var i = document.createElement("span");
                $(i).css({
                    color: "grey",
                    float: "right"
                }), i.textContent = t.date, a.appendChild(e), a.appendChild(r), a.appendChild(i), b.appendChild(a), $(r).on("dblclick", () => {
                    k(o, t.url), d()
                })
            }), l.appendChild(b), s.append(l), null != t[o].collapsed && 1 == t[o].collapsed && $(b).slideUp(0)
        }
        $(".stackmarks-category-name").on("click", function() {
            $(this).parent().next(".stackmarks-category-list").slideToggle();
            var t = r()[o].collapsed;
            ! function(t, a) {
                var s = r();
                if (null != s[t]) {
                    var e = s;
                    e[t].collapsed = a, i(JSON.stringify(e))
                }
            }(o, null == t || !t)
        }), $("#stackmarks-categories-count").text(e), $("#stackmarks-bookmarks-count").text(n), e || s.append('<span style="color:grey">You have not added any StackMarks yet</span>')
    }

    function m(t, a) {
        var s = $(t, a);
        s.empty();
        var e = r(),
            n = 0;
        for (var o in e) {
            n++;
            var i = document.createElement("label");
            i.classList.add("s-menu--label", "grid"), i.setAttribute("for", "stackmarks-category-option-" + n);
            var l = document.createElement("div");
            l.classList.add("grid--cell", "mr8");
            var c = document.createElement("input");
            c.type = "radio", c.classList.add("s-radio"), c.name = "stackmarks-category-option", c.id = "stackmarks-category-option-" + n, l.appendChild(c);
            var d = document.createElement("div");
            d.classList.add("grid-cell");
            var m = document.createElement("div");
            m.classList.add("s-label", "stackmarks-category-option"), m.innerText = o, d.appendChild(m), i.appendChild(l), i.appendChild(d), s.append(i)
        }
        n || s.append('<span style="color:grey">You have not created any categories yet</span>')
    }

    function k(t, a) {
        var s = r();
        if (null != s[t]) {
            var e = s;
            e[t].links.forEach(s => {
                if (s.url == a) return e[t].links.splice(e[t].links.indexOf(s), 1), void i(JSON.stringify(e))
            })
        }
    }

    function p(a, s, e) {
        null != t && clearTimeout(t), $(document.body).append(`<div class="s-toast" aria-hidden="true" role="alertdialog" aria-labelledby="notice-message" id="stackmarks-notice">\n    <aside class="grid s-notice s-notice__${s}" role="status">\n     <div class="grid--cell mr8">\n     </div>\n     <div class="grid--cell lh-lg">\n         ${a}\n     </div>\n </aside>\n </div>`), setTimeout(() => {
            $("#stackmarks-notice").attr("aria-hidden", "false")
        }, 10), t = setTimeout(() => {
            let t = $("#stackmarks-notice");
            t.attr("aria-hidden", "true"), setTimeout(() => {
                t.remove()
            }, 100)
        }, e)
    }
    null == r() && localStorage.setItem("stack-marks-data", "{}"), String.prototype.includesIgnoreCase = function(t) {
        return -1 != this.toUpperCase().indexOf(t.toUpperCase())
    }, $(document.head).append('<style>\n    .stackmarks-list .stackmarks-delete, .stackmarks-list .stackmarks-category-delete{\n        display:none;\n        color:#D1383D;\n        margin-left:10px;\n        z-index:100;\n        user-select:none;\n    }\n    .stackmarks-list .stackmarks-category-delete{\n        position:absolute;\n        top:5px;\n        right:5px;\n    }\n    .stackmarks-list .stackmarks-delete{\n        float:right;\n    }\n    .stackmarks-list .material-icons{\n        font-size:18px;\n    }\n    .stackmarks-category-item:hover > .stackmarks-delete{\n        display:inline;\n    }\n    .stackmarks-list .stackmarks-category-name{\n        cursor:pointer;\n    }\n    .stackmarks-list .stackmarks-category-name-container:hover > .stackmarks-category-delete{\n        display:inline;\n    }\n    .stackmarks-list-filter{\n        position: absolute;\n    top: 25px;\n    right: 23px;\n    }\n    #stackmarks-modal #modal-description{\n        color:grey;\n    }\n    #stackmarks-modal .stackmarks-list-search{\n        position: absolute;\n    right: 24px;\n    bottom: 24px;\n    }\n    #stackmarks-search-empty-notice{\n        color:grey;\n        display:none;\n        margin-bottom:12px;\n    }\n    .stackmarks-category-name-container{\n        position:relative;\n    }\n    #stackmarks-import-bookmarks-modal .stackmarks-import-bookmarks-item-name{\n        font-size:15px;\n        margin-left:5px;\n    }\n    #stackmarks-import-bookmarks-modal .stackmarks-import-bookmarks-tools{\n        float:right;\n    }\n    #stackmarks-import-bookmarks-modal h3{\n        margin-bottom:5px;\n    }\n    </style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document" style="width:80%; min-width:600px">\n                <div class="stackmarks-list-filter">\n                <div class="s-btn-group">\n                <button class="s-btn s-btn__muted s-btn__outlined" role="button">Categories&nbsp;<span class="s-btn--badge">\n                        <span class="s-btn--number" id="stackmarks-categories-count"></span>\n                    </span>\n                </button>\n                <button class="s-btn s-btn__muted s-btn__outlined" role="button">Bookmarks&nbsp;<span class="s-btn--badge">\n                        <span class="s-btn--number" id="stackmarks-bookmarks-count"></span>\n                    </span>\n                </button>\n                \n            </div>\n                </div>\n                <p class="s-modal--body" id="modal-description">StackMarks™ Dashboard | <a href="https://stackoverflow.com/users/14251221/spectric">SpectricSO</a></p>\n                <div class="stackmarks-search-container">\n                </div>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <span  id="stackmarks-search-empty-notice"></span>\n                <div class="stackmarks-new-category" style="\n    margin-bottom: 10px;\n    display: none;\n">\n    <input class="s-input w90" id="stackmarks-new-category-input" type="text" placeholder="Category name"><button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category-btn" style="\n    margin-left: 5px;\n">Add</button>\n</div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button" data-action="s-modal#hide">Save and Close</button>\n                    <button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category">New Category</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide"  id="stackmarks-modal-cancel">Cancel</button>\n                </div>\n                <div class="stackmarks-list-search">\n    <div class="ps-relative">\n    <input class="s-input s-input__search w100" type="text" id="stackmark-list-search-input" placeholder="Search…"><svg aria-hidden="true" class="svg-icon iconSearch s-input-icon s-input-icon__search" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"></path></svg></div>\n</div>\n            </div>\n        </aside>\n    </div>'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-add-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - New</h1>\n                <div class="s-modal--body" id="modal-description"></div>\n            <div class="stackmarks-add-data">\n            <input class="s-input w90" id="stackmarks-add-title" type="text" placeholder="Category name" style="\n    margin-top: 10px;\n    ">\n    <textarea style="margin-top:10px;" class="grid--cell s-textarea" id="stackmarks-add-notes" placeholder="Notes"></textarea>\n    </div>\n            <p></p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button"  id="stackmarks-add-category-confirm">Add</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), o && ($(document.body).append('\n                <div data-controller="s-modal" id="stackmarks-import-bookmarks-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n                <div class="s-modal--dialog" role="document">\n    <h1 class="s-modal--header" id="modal-title">StackMarks™ - Import Bookmarks</h1>\n    <div class="s-modal--body" id="modal-description">\n    <h3>Select category to save bookmarks to:</h3>\n    <div class="stackmarks-import-bookmarks-category-list">\n\n    </div>\n    <hr/>\n    <h3>Select the bookmarks you wish to import:</h3>\n<div class="stackmarks-import-bookmarks-list">\n\n</div>\n</div>\n    <div class="stackmarks-list" style="margin-bottom:20px"></div>\n    <div class="grid gs8 gsx s-modal--footer">\n        <button class="grid--cell s-btn s-btn__primary" type="button" id="stackmarks-import-bookmarks-confirm">Add</button>\n        <button class="grid--cell s-btn" type="button" data-action="s-modal#hide">Cancel</button>\n        <div class="stackmarks-import-bookmarks-tools s-btn-group">\n        <button class="s-btn s-btn__muted s-btn__outlined" id="stackmarks-import-bookmarks-modal-select-all" role="button">Select All</button>\n        <button class="s-btn s-btn__muted s-btn__outlined" id="stackmarks-import-bookmarks-modal-deselect-all" role="button">Deselect All</button>\n        </div>\n    </div>\n</div></aside></div>'), $("#user-tab-bookmarks .subheader .grid--cell.mb0").append("<a id='stackmarks-bookmark-import' class=\"s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort\">+StackMarks™</a>")), $(".question .votecell.post-layout--left .js-voting-container").append('<a class="js-post-issue grid--cell s-btn s-btn__unset c-pointer py6 mx-auto" id="stackmarks-add-new" href="javascript:void(0)" aria-label="Add StackMark">+SM\n    </a>'), setTimeout(() => {
        a = $("#stackmarks-modal"), s = $("#stackmarks-add-modal"), e = $("#stackmarks-add-new"), n = $("#stackmarks-import-bookmarks-modal"),
            function() {
                o && ($("#stackmarks-bookmark-import").on("click", function() {
                    m($(".stackmarks-import-bookmarks-category-list", n), n),
                        function() {
                            var t = $(".stackmarks-import-bookmarks-list", n);
                            t.empty();
                            var a = $("#user-tab-bookmarks .user-tab-content .user-questions .question-summary.narrow .summary h3 a"),
                                s = 0;
                            a.each(function() {
                                s++;
                                var a = $(this),
                                    e = document.createElement("div");
                                e.classList.add("stackmarks-import-bookmarks-item", "grid--cell");
                                var n = document.createElement("div");
                                n.classList.add("grid", "gs8", "gsx");
                                var o = document.createElement("div"),
                                    r = document.createElement("input");
                                r.setAttribute("id", "stackmarks-import-bookmarks-option-" + s), r.classList.add("stackmarks-import-bookmarks-item-input", "s-checkbox"), r.setAttribute("data-href", a.attr("href")), r.setAttribute("data-title", a.text()), r.type = "checkbox", o.classList.add("grid--cell"), o.appendChild(r);
                                var i = document.createElement("label");
                                i.classList.add("grid--cell", "s-label", "fw-normal", "stackmarks-import-bookmarks-name"), i.innerText = a.text(), i.setAttribute("for", "stackmarks-import-bookmarks-option-" + s), n.appendChild(o), n.appendChild(i), e.appendChild(n), $(t).append(e)
                            }), s || t.append('<span style="color:grey">No bookmarks to import</span>')
                        }(), Stacks.showModal(n[0])
                }), $("#stackmarks-import-bookmarks-confirm").on("click", function() {
                    var t = $(".stackmarks-category-option", $("input[name=stackmarks-category-option]:checked", n).closest(".s-menu--label"));
                    if (t.text().length > 0) {
                        var a = 0;
                        $(".stackmarks-import-bookmarks-item-input").each(function() {
                            var s = $(this);
                            s.prop("checked") && (a++, l(t.text(), s.attr("data-href"), s.attr("data-title"))), a ? Stacks.hideModal(n[0]) : p("Please choose a bookmark", "danger", 2e3)
                        })
                    } else p("Please choose a category to save your bookmarks to", "danger", 3e3)
                }), $("#stackmarks-import-bookmarks-modal-select-all").on("click", function() {
                    $(".stackmarks-import-bookmarks-item-input").prop("checked", !0)
                }), $("#stackmarks-import-bookmarks-modal-deselect-all").on("click", function() {
                    $(".stackmarks-import-bookmarks-item-input").prop("checked", !1)
                })), $("#stackmark-list-search-input").on("input", function() {
                    ! function(t) {
                        t.length < 1 ? ($(".stackmarks-category-name").show(), d()) : ($(".stackmarks-category-name").hide(), $(".stackmarks-category-list").slideDown(0));
                        var s = 0;
                        $(".stackmarks-item-link", a).each(function() {
                            let a = $(this);
                            t.length < 1 ? a.parent().show() : a.text().includesIgnoreCase(t) || a.attr("href").includesIgnoreCase(t) ? (a.parent().show(), s++) : a.parent().hide()
                        });
                        var e = $("#stackmarks-search-empty-notice");
                        !s && t.length > 1 ? (e.text(`0 results for '${t}'`), e.show()) : e.hide()
                    }($(this).val())
                });
                var t = r();
                e.on("click", () => {
                    m($(".s-modal--body", s), s), $("#stackmarks-add-title").val($(".question-hyperlink").first().text()), Stacks.showModal(s[0])
                }), $("#stackmarks-add-category-confirm").on("click", () => {
                    var t = $(".stackmarks-category-option", $("input[name=stackmarks-category-option]:checked", s).closest(".s-menu--label"));
                    t.text().length > 0 ? (l(t.text(), location.pathname, $("#stackmarks-add-title").val(), $("#stackmarks-add-notes").val()), Stacks.hideModal(s[0]), p("Successfully added StackMark", "success", 2e3)) : p("Please choose a category", "danger", 2e3)
                }), $(document).on("keyup", s => {
                    var e = window.event || s;
                    e.ctrlKey && e.shiftKey && (75 == e.keyCode || 89 == e.keyCode)  && (t = r(), d(), Stacks.showModal(a[0]))
                }), $("#stackmarks-modal-cancel").click(() => {
                    i(JSON.stringify(t)), p("Cancelled changes", "info", 2e3)
                });
                var c = $(".stackmarks-new-category"),
                    k = $("#stackmarks-new-category-input");
                $("#stackmarks-new-category").click(() => {
                    c.slideToggle()
                }), $("#stackmarks-new-category-btn").click(() => {
                    c.slideUp();
                    var t = k.val();
                    t.length > 0 && (function(t) {
                        var a = r();
                        if (null == a[t]) {
                            var s = a;
                            s[t] = {
                                links: [],
                                collapsed: !1
                            }, i(JSON.stringify(s))
                        }
                    }(t), d())
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
