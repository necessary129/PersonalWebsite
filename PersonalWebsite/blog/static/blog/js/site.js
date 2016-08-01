$(document).ready(function() {
    $('#main-navbar').find('a[href="' + this.location.pathname + '"]').parents('li').addClass('active');
});



jQuery(document).ready(function($) {

        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }

                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
});

$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

$('#contactForm').submit(function(event){
    event.preventDefault();
    $('#success').html("<div class='alert alert-info'>");
    $('#success > .alert-info').html("<span class='glyphicon glyphicon-refresh gly-spin' aria-hidden='true'>")
        .append("</span>")
        .append(" <strong>Please Wait....</strong>");
    $('#success > .alert-info')
        .append('</div>');
    $("#submitbtn").addClass("disabled");
    var firstName = $("input#name").val();
    if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
    }
    $.ajax({
        url: mailurl,
        type: "post",
        data: $(this).serialize(),
        cache: false,
        success: function(json){
            $("#submitbtn").removeClass("disabled");
            if (json['result'] === 'success'){
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");
        } else if (json['result'] === 'captcha-fail') {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Please complete the CAPTCHA challenge.");
            $('#success > .alert-danger').append('</div>');
        } else {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
        }
        },
        error: function(){
            $("#submitbtn").removeClass("disabled");
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');

        }
    });
    grecaptcha.reset();
});


+ function(t, e, i) {
    "use strict";
    var s = {
        calc: !1
    };
    e.fn.rrssb = function(t) {
        var s = e.extend({
            description: i,
            emailAddress: i,
            emailBody: i,
            emailSubject: i,
            image: i,
            title: i,
            url: i
        }, t);
        s.emailSubject = s.emailSubject || s.title, s.emailBody = s.emailBody || (s.description ? s.description : "") + (s.url ? "\n\n" + s.url : "");
        for (var r in s) s.hasOwnProperty(r) && s[r] !== i && (s[r] = n(s[r]));
        s.url !== i && (e(this).find(".rrssb-facebook a").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + s.url), e(this).find(".rrssb-tumblr a").attr("href", "http://tumblr.com/share/link?url=" + s.url + (s.title !== i ? "&name=" + s.title : "") + (s.description !== i ? "&description=" + s.description : "")), e(this).find(".rrssb-linkedin a").attr("href", "http://www.linkedin.com/shareArticle?mini=true&url=" + s.url + (s.title !== i ? "&title=" + s.title : "") + (s.description !== i ? "&summary=" + s.description : "")), e(this).find(".rrssb-twitter a").attr("href", "https://twitter.com/intent/tweet?text=" + (s.description !== i ? s.description : "") + "%20" + s.url), e(this).find(".rrssb-hackernews a").attr("href", "https://news.ycombinator.com/submitlink?u=" + s.url + (s.title !== i ? "&text=" + s.title : "")), e(this).find(".rrssb-reddit a").attr("href", "http://www.reddit.com/submit?url=" + s.url + (s.description !== i ? "&text=" + s.description : "") + (s.title !== i ? "&title=" + s.title : "")), e(this).find(".rrssb-googleplus a").attr("href", "https://plus.google.com/share?url=" + (s.description !== i ? s.description : "") + "%20" + s.url), e(this).find(".rrssb-pinterest a").attr("href", "http://pinterest.com/pin/create/button/?url=" + s.url + (s.image !== i ? "&amp;media=" + s.image : "") + (s.description !== i ? "&description=" + s.description : "")), e(this).find(".rrssb-pocket a").attr("href", "https://getpocket.com/save?url=" + s.url), e(this).find(".rrssb-github a").attr("href", s.url)), (s.emailAddress !== i || s.emailSubject) && e(this).find(".rrssb-email a").attr("href", "mailto:" + (s.emailAddress ? s.emailAddress : "") + "?" + (s.emailSubject !== i ? "subject=" + s.emailSubject : "") + (s.emailBody !== i ? "&body=" + s.emailBody : ""))
    };
    var r = function() {
            var t = e("<div>"),
                i = ["calc", "-webkit-calc", "-moz-calc"];
            e("body").append(t);
            for (var r = 0; r < i.length; r++)
                if (t.css("width", i[r] + "(1px)"), 1 === t.width()) {
                    s.calc = i[r];
                    break
                }
            t.remove()
        },
        n = function(t) {
            if (t !== i && null !== t) {
                if (null === t.match(/%[0-9a-f]{2}/i)) return encodeURIComponent(t);
                t = decodeURIComponent(t), n(t)
            }
        },
        a = function() {
            e(".rrssb-buttons").each(function(t) {
                var i = e(this),
                    s = e("li:visible", i),
                    r = s.length,
                    n = 100 / r;
                s.css("width", n + "%").attr("data-initwidth", n)
            })
        },
        l = function() {
            e(".rrssb-buttons").each(function(t) {
                var i = e(this),
                    s = i.width(),
                    r = e("li", i).not(".small").eq(0).width(),
                    n = e("li.small", i).length;
                if (r > 170 && 1 > n) {
                    i.addClass("large-format");
                    var a = r / 12 + "px";
                    i.css("font-size", a)
                } else i.removeClass("large-format"), i.css("font-size", "");
                25 * n > s ? i.removeClass("small-format").addClass("tiny-format") : i.removeClass("tiny-format")
            })
        },
        o = function() {
            e(".rrssb-buttons").each(function(t) {
                var i = e(this),
                    s = e("li", i),
                    r = s.filter(".small"),
                    n = 0,
                    a = 0,
                    l = r.eq(0),
                    o = parseFloat(l.attr("data-size")) + 55,
                    c = r.length;
                if (c === s.length) {
                    var h = 42 * c,
                        u = i.width();
                    u > h + o && (i.removeClass("small-format"), r.eq(0).removeClass("small"), d())
                } else {
                    s.not(".small").each(function(t) {
                        var i = e(this),
                            s = parseFloat(i.attr("data-size")) + 55,
                            r = parseFloat(i.width());
                        n += r, a += s
                    });
                    var m = n - a;
                    m > o && (l.removeClass("small"), d())
                }
            })
        },
        c = function(t) {
            e(".rrssb-buttons").each(function(t) {
                var i = e(this),
                    s = e("li", i);
                e(s.get().reverse()).each(function(t, i) {
                    var r = e(this);
                    if (r.hasClass("small") === !1) {
                        var n = parseFloat(r.attr("data-size")) + 55,
                            a = parseFloat(r.width());
                        if (n > a) {
                            var l = s.not(".small").last();
                            e(l).addClass("small"), d()
                        }
                    }--i || o()
                })
            }), t === !0 && u(d)
        },
        d = function() {
            e(".rrssb-buttons").each(function(t) {
                var i, r, n, l, o, c = e(this),
                    d = e("li", c),
                    h = d.filter(".small"),
                    u = h.length;
                u > 0 && u !== d.length ? (c.removeClass("small-format"), h.css("width", "42px"), n = 42 * u, i = d.not(".small").length, r = 100 / i, o = n / i, s.calc === !1 ? (l = (c.innerWidth() - 1) / i - o, l = Math.floor(1e3 * l) / 1e3, l += "px") : l = s.calc + "(" + r + "% - " + o + "px)", d.not(".small").css("width", l)) : u === d.length ? (c.addClass("small-format"), a()) : (c.removeClass("small-format"), a())
            }), l()
        },
        h = function() {
            e(".rrssb-buttons").each(function(t) {
                e(this).addClass("rrssb-" + (t + 1))
            }), r(), a(), e(".rrssb-buttons li .rrssb-text").each(function(t) {
                var i = e(this),
                    s = i.width();
                i.closest("li").attr("data-size", s)
            }), c(!0)
        },
        u = function(t) {
            e(".rrssb-buttons li.small").removeClass("small"), c(), t()
        },
        m = function(e, s, r, n) {
            var a = t.screenLeft !== i ? t.screenLeft : screen.left,
                l = t.screenTop !== i ? t.screenTop : screen.top,
                o = t.innerWidth ? t.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                c = t.innerHeight ? t.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                d = o / 2 - r / 2 + a,
                h = c / 3 - n / 3 + l,
                u = t.open(e, s, "scrollbars=yes, width=" + r + ", height=" + n + ", top=" + h + ", left=" + d);
            u && u.focus && u.focus()
        },
        f = function() {
            var t = {};
            return function(e, i, s) {
                s || (s = "Don't call this twice without a uniqueId"), t[s] && clearTimeout(t[s]), t[s] = setTimeout(e, i)
            }
        }();
    e(document).ready(function() {
        try {
            e(document).on("click", ".rrssb-buttons a.popup", {}, function(t) {
                var i = e(this);
                m(i.attr("href"), i.find(".rrssb-text").html(), 580, 470), t.preventDefault()
            })
        } catch (i) {}
        e(t).resize(function() {
            u(d), f(function() {
                u(d)
            }, 200, "finished resizing")
        }), h()
    }), t.rrssbInit = h
}(window, jQuery);
