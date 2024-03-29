// ==UserScript==
// @name         StackMarks™
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.3.1
// @description  freezing stuff!
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
        var i = a(),
            r = $(".stackmarks-list", l);
        r.empty();
        var o = 0,
            c = 0;
        for (var d in i) {
            o++;
            var m = document.createElement("div");
            m.classList.add("stackmarks-category");
            var k = document.createElement("div");
            k.classList.add("stackmarks-category-name-container");
            var p = document.createElement("h2");
            p.classList.add("stackmarks-category-name"), p.textContent = d, $(p).css({
                margin: "10px 0px",
                "border-bottom": "1px solid"
            });
            var u = document.createElement("a");
            u.classList.add("stackmarks-category-delete"), u.innerHTML = '<i class="material-icons">delete</i>', k.appendChild(p), k.appendChild(u), m.appendChild(k), $(u).on("dblclick", function() {
                e(d), s()
            });
            var g = document.createElement("div");
            g.classList.add("stackmarks-category-list"), Array.from(i[d].links).forEach(a => {
                c++;
                var t = document.createElement("div");
                if (t.classList.add("stackmarks-category-item"), null != a.notes && a.notes.length > 0) {
                    t.setAttribute("title", a.notes), t.setAttribute("data-controller", "s-tooltip"), t.setAttribute("data-s-tooltip-placement", "top-start");
                    var e = document.createElement("span");
                    e.innerText = "[N]", e.style.color = "grey", e.style.marginRight = "5px", t.appendChild(e)
                }
                var i = document.createElement("a");
                i.href = a.url, i.innerText = a.title, i.classList.add("stackmarks-item-link"), $(i).data("category", d);
                var l = document.createElement("a");
                l.classList.add("stackmarks-delete"), l.innerHTML = '<i class="material-icons">delete</i>';
                var r = document.createElement("span");
                $(r).css({
                    color: "grey",
                    float: "right"
                }), r.textContent = a.date, t.appendChild(i), t.appendChild(l), t.appendChild(r), g.appendChild(t), $(l).on("dblclick", () => {
                    console.log("got it"), n(d, a.url), s()
                })
            }), m.appendChild(g), r.append(m), null != i[d].collapsed && 1 == i[d].collapsed && $(g).slideUp(0)
        }
        $(".stackmarks-category-name span").on("click", function() {
            $(this).parent().next(".stackmarks-category-list").slideToggle();
            var e = a()[d].collapsed;
            ! function(e, s) {
                var n = a();
                if (null != n[e]) {
                    var i = n;
                    i[e].collapsed = s, t(JSON.stringify(i))
                }
            }(d, null == e || !e)
        }), $("#stackmarks-categories-count").text(o), $("#stackmarks-bookmarks-count").text(c), o || r.append('<span style="color:grey">You have not added any StackMarks yet</span>')
    }

    function n(e, s) {
        var n = a();
        if (null != n[e]) {
            var i = n;
            i[e].links.forEach(a => {
                if (a.url == s) return i[e].links.splice(i[e].links.indexOf(a), 1), void t(JSON.stringify(i))
            })
        }
    }
    var i, l, r, o;

    function c(a, t, e) {
        null != i && clearTimeout(i), $(document.body).append(`<div class="s-toast" aria-hidden="true" role="alertdialog" aria-labelledby="notice-message" id="stackmarks-notice">\n    <aside class="grid s-notice s-notice__${t}" role="status">\n     <div class="grid--cell mr8">\n     </div>\n     <div class="grid--cell lh-lg">\n         ${a}\n     </div>\n </aside>\n </div>`), setTimeout(() => {
            $("#stackmarks-notice").attr("aria-hidden", "false")
        }, 10), i = setTimeout(() => {
            let a = $("#stackmarks-notice");
            a.attr("aria-hidden", "true"), setTimeout(() => {
                a.remove()
            }, 100)
        }, e)
    }
    null == a() && localStorage.setItem("stack-marks-data", "{}"), String.prototype.includesIgnoreCase = function(a) {
        return -1 != this.toUpperCase().indexOf(a.toUpperCase())
    }, $(document.head).append('<style>\n    .stackmarks-list .stackmarks-delete, .stackmarks-list .stackmarks-category-delete{\n        display:none;\n        color:#D1383D;\n        margin-left:10px;\n        position:absolute;\n        top:5px;\n        right:5px;\n        z-index:100;\n        user-select:none;\n    }\n    .stackmarks-list .material-icons{\n        font-size:18px;\n    }\n    .stackmarks-category-item:hover > .stackmarks-delete{\n        display:inline;\n    }\n    .stackmarks-list .stackmarks-category-name{\n        cursor:pointer;\n    }\n    .stackmarks-list .stackmarks-category-name-container:hover > .stackmarks-category-delete{\n        display:inline;\n    }\n    .stackmarks-list-filter{\n        position: absolute;\n    top: 25px;\n    right: 23px;\n    }\n    #stackmarks-modal #modal-description{\n        color:grey;\n    }\n    #stackmarks-modal .stackmarks-list-search{\n        position: absolute;\n    right: 24px;\n    bottom: 24px;\n    }\n    #stackmarks-search-empty-notice{\n        color:grey;\n        display:none;\n        margin-bottom:12px;\n    }\n    .stackmarks-category-name-container{\n        position:relative;\n    }\n    </style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document" style="width:80%; min-width:600px">\n                <div class="stackmarks-list-filter">\n                <div class="s-btn-group">\n                <button class="s-btn s-btn__muted s-btn__outlined" role="button">Categories&nbsp;<span class="s-btn--badge">\n                        <span class="s-btn--number" id="stackmarks-categories-count"></span>\n                    </span>\n                </button>\n                <button class="s-btn s-btn__muted s-btn__outlined" role="button">Bookmarks&nbsp;<span class="s-btn--badge">\n                        <span class="s-btn--number" id="stackmarks-bookmarks-count"></span>\n                    </span>\n                </button>\n                \n            </div>\n                </div>\n                <p class="s-modal--body" id="modal-description">StackMarks™ Dashboard | <a href="https://stackoverflow.com/users/14251221/spectric">SpectricSO</a></p>\n                <div class="stackmarks-search-container">\n                </div>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <span  id="stackmarks-search-empty-notice"></span>\n                <div class="stackmarks-new-category" style="\n    margin-bottom: 10px;\n    display: none;\n">\n    <input class="s-input w90" id="stackmarks-new-category-input" type="text" placeholder="Category name"><button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category-btn" style="\n    margin-left: 5px;\n">Add</button>\n</div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button" data-action="s-modal#hide">Save and Close</button>\n                    <button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category">New Category</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide"  id="stackmarks-modal-cancel">Cancel</button>\n                </div>\n                <div class="stackmarks-list-search">\n    <div class="ps-relative">\n    <input class="s-input s-input__search w100" type="text" id="stackmark-list-search-input" placeholder="Search…"><svg aria-hidden="true" class="svg-icon iconSearch s-input-icon s-input-icon__search" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"></path></svg></div>\n</div>\n            </div>\n        </aside>\n    </div>'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-add-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - New</h1>\n                <div class="s-modal--body" id="modal-description">\n            </div>\n            <div class="stackmarks-add-data">\n            <input class="s-input w90" id="stackmarks-add-title" type="text" placeholder="Category name" style="\n    margin-top: 10px;\n    ">\n    <textarea style="margin-top:10px;" class="grid--cell s-textarea" id="stackmarks-add-notes" placeholder="Notes"></textarea>\n    </div>\n            <p></p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button"  id="stackmarks-add-category-confirm">Add</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), $(".question .votecell.post-layout--left .js-voting-container").append('<a class="js-post-issue grid--cell s-btn s-btn__unset c-pointer py6 mx-auto" id="stackmarks-add-new" href="javascript:void(0)" aria-label="Add StackMark">+SM\n    </a>'), setTimeout(() => {
        l = $("#stackmarks-modal"), r = $("#stackmarks-add-modal"), o = $("#stackmarks-add-new"),
            function() {
                $("#stackmark-list-search-input").on("input", function() {
                    ! function(a) {
                        a.length < 1 ? ($(".stackmarks-category-name").show(), s()) : ($(".stackmarks-category-name").hide(), $(".stackmarks-category-list").slideDown(0));
                        var t = 0;
                        $(".stackmarks-item-link", l).each(function() {
                            let e = $(this);
                            a.length < 1 ? e.parent().show() : e.text().includesIgnoreCase(a) || e.attr("href").includesIgnoreCase(a) ? (e.parent().show(), t++) : e.parent().hide()
                        });
                        var e = $("#stackmarks-search-empty-notice");
                        console.log(e), !t && a.length > 1 ? (e.text(`0 results for '${a}'`), e.show()) : e.hide()
                    }($(this).val())
                });
                var e = a();
                o.on("click", () => {
                    ! function() {
                        var t = $(".s-modal--body", r);
                        t.empty();
                        var e = a(),
                            s = 0;
                        for (var n in $("#stackmarks-add-title").val($(".question-hyperlink").first().text()), e) {
                            s++;
                            var i = document.createElement("label");
                            i.classList.add("s-menu--label", "grid"), i.setAttribute("for", "stackmarks-category-option-" + s);
                            var l = document.createElement("div");
                            l.classList.add("grid--cell", "mr8");
                            var o = document.createElement("input");
                            o.type = "radio", o.classList.add("s-radio"), o.name = "stackmarks-category-option", o.id = "stackmarks-category-option-" + s, l.appendChild(o);
                            var c = document.createElement("div");
                            c.classList.add("grid-cell");
                            var d = document.createElement("div");
                            d.classList.add("s-label"), d.innerText = n, c.appendChild(d), i.appendChild(l), i.appendChild(c), t.append(i)
                        }
                        s || t.append('<span style="color:grey">You have not created any categories yet</span>')
                    }(), Stacks.showModal(r[0])
                }), $("#stackmarks-add-category-confirm").on("click", () => {
                    var e = $(".s-label", $("input[name=stackmarks-category-option]:checked", r).closest(".s-menu--label"));
                    e.text().length > 0 ? (function(e, s, n, i) {
                        var l = a(),
                            r = l[e];
                        const o = new Date;
                        var c = `Y${o.getFullYear()}-M${o.getMonth()+1}-D${o.getDate()}`;
                        if (null == r) {
                            let a = l;
                            a[e] = {
                                links: [{
                                    url: s,
                                    title: n,
                                    date: c,
                                    notes: ""
                                }],
                                collapsed: !1
                            }, t(JSON.stringify(a))
                        } else {
                            r.links.forEach(a => {
                                a.url
                            });
                            let a = l;
                            a[e].links.push({
                                url: s,
                                title: n,
                                date: c,
                                notes: null == i ? "" : i
                            }), t(JSON.stringify(a))
                        }
                    }(e.text(), location.pathname, $("#stackmarks-add-title").val(), $("#stackmarks-add-notes").val()), Stacks.hideModal(r[0]), c("Successfully added StackMark", "success", 2e3)) : c("Please choose a category", "danger", 2e3)
                }), $(document).on("keyup", t => {
                    var n = window.event || t;
                    n.ctrlKey && n.shiftKey && 75 == n.keyCode && (e = a(), s(), Stacks.showModal(l[0]))
                }), $("#stackmarks-modal-cancel").click(() => {
                    t(JSON.stringify(e)), c("Cancelled changes", "info", 2e3)
                });
                var n = $(".stackmarks-new-category"),
                    i = $("#stackmarks-new-category-input");
                $("#stackmarks-new-category").click(() => {
                    n.slideToggle()
                }), $("#stackmarks-new-category-btn").click(() => {
                    n.slideUp();
                    var e = i.val();
                    e.length > 0 && (function(e) {
                        var s = a();
                        if (null == s[e]) {
                            var n = s;
                            n[e] = {
                                links: [],
                                collapsed: !1
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
