respondToVisibility = function (element, callback, parent = null) {
    var options = {
        root: parent,
        threshold: 1,
    }

    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.isIntersecting > 0);
        });
    }, options);

    observer.observe(element);
}

function VideoSrc() {



    $("video").each(function (i) {
        if ($(this).is(':visible')) {
            var s = $(this).find("source").data("src");
            $(this).attr("src", s).attr("autoplay", true);
        }

    });

}

function lineSplitter(el, sd = 0) {
    var t = el.html(),
        p = t, //.replace(/(<([^>]+)>)/ig, ''),
        p = t.replace('<br>', ''),
        test = $("<span>", {}).css({
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            "white-space": "nowrap",
        });
    el.css({
        "min-width": el.width() * 1.005
    }).html(null);
    el.append(test);
    var allWords = p.match(/\S+/g);
    var lines = [];
    var currentLine = "";
    for (var i = 0; i < allWords.length; i++) {
        var newLine = currentLine + allWords[i] + " ";
        test.html(newLine);
        if (test.width() > el.width()) {
            lines.push(currentLine.trim());
            currentLine = allWords[i] + " ";
        } else {
            currentLine = newLine;
        }
    }

    lines.push(currentLine.trim());

    for (var i = 0; i < lines.length; i++) {

        var lineWrapper = $("<span>", {
            class: "mask-appear-wrapper",
        }).appendTo(el);

        var lineText = lines[i] + " ";

        var line = $("<span>", {
            html: lineText,
            class: "mask-appear-inner",
            css: {
                "transition-delay": (sd + 0.15 * i) + "s",
            },
        }).appendTo(lineWrapper);



    }

    test.remove();

}

function popup(el) {

    $(".document").toggleClass("popup-active", true);
    $(".js-popup").toggleClass("active", false);
    $(el).toggleClass("active", true).scrollTop(0);

    lenis.stop();

    return;

}

function popupClose() {

    $(".js-popup").toggleClass("active", false);
    $(".document").toggleClass("popup-active", false);

    lenis.start();

    return;

}

$(".js-popup-close").click(function (e) {
    e.preventDefault();
    popupClose();
    return;
});

$("[data-popup]").click(function (e) {

    var el = $(this).data("popup");
    popup(el);

    return;


});

$("[data-target]").click(function (e) {
    popupClose();
});

$(".js-selector").each(function (i) {
    var select = $(this),
        dd = select.find(".js-selector-list"),
        holder = select.find(".js-selector-value");

    $("body").prepend(dd);

    select.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var pos = select.offset(),
            pl = pos.left,
            pt = pos.top + select.outerHeight();
        dd.css({
            left: pl,
            top: pt,
            "max-width": select.outerWidth()
        });

        if ($(this).hasClass("active")) {
            $(".js-selector").removeClass("active");
            $(".js-selector-list").removeClass("active");
        } else {
            $(".js-selector").removeClass("active");
            $(".js-selector-list").removeClass("active");
            $(this).addClass("active");
            dd.addClass("active");
        }


    });

    dd.find(".js-selector-option").click(function (e) {
        e.stopPropagation();

        var v = $(this).attr("data-value"),
            m = $(this).data("message");

        if (v) {
            holder.val(v);
        }

        $(".selector-message").removeClass("active");

        if (m) {

            $(m).addClass("active");

        }

        lenis.resize();

        dd.find(".active").removeClass("active");
        $(this).addClass("active");
        dd.removeClass("active");
        select.removeClass("active");
        return;
    });

});

$("html").on("click", function () {
    $(".js-selector").removeClass("active");
    $(".js-selector-list").removeClass("active");
});


$(window).on("resize", function () {


    $(".js-selector").removeClass("active");
    $(".js-selector-list").removeClass("active");

});



$(".player-container").each(function (i) {

    var video = $(this).find(".player-video")[0];

    $(this).on("click", function () {


        $(this).toggleClass("active");

        if ($(this).hasClass("active")) {

            video.currentTime = 0;
            video.volume = 1.0;
            video.play();

        } else {

            video.pause();

        }

    });

});


var currentAppHeight = 0;

const appVars = () => {
    document.documentElement.style.setProperty('--app-height', window.innerHeight + "px");
    document.documentElement.style.setProperty('--app-width', $("body").prop("clientWidth") + "px");
    document.documentElement.style.setProperty('--headroom-height', $("#headroom").innerHeight() + "px");

    if (window.innerWidth >= 1024) {

        currentAppHeight = window.innerHeight;

    }

}


$(".bottombar").each(function (i) {

    respondToVisibility(this, visible => {

        $(".footer-runner").toggleClass("visible", visible);

    });

});


function marquee() {


    $(".marquee").each(function (i) {

        var b = $(this),
            t = b.find(".marquee-container"),
            w = $(window).width();

        if (b.width() < w) {

            while (b.width() < w) {

                var c = t.clone(true, true);

                c.appendTo(b);

                return;

            }

        }

        var runner = b.html(),
            start = $("<div>", {
                class: "runner-start",
                html: runner
            }),
            end = $("<div>", {
                class: "runner-end",
                html: runner
            });

        b.html(null);
        b.append(start);
        b.append(end);

    });

}

const controller = new ScrollMagic.Controller();


$(function () {


    $(".js-expand").each(function (i) {

        var box = $(this),
            button = box.find(".js-expand-button"),
            top = box.find(".js-expand-offset");

        button.click(function (e) {
            e.preventDefault();
            box.toggleClass("active"); //.siblings().removeClass("active");


            if (box.hasClass("active") && top.length) {

                lenis.scrollTo(top[0], {
                    offset: 1,
                    duration: 1,
                });


            }


            setTimeout(() => {

                lenis.resize();

            }, 500);
        });

    });



    $(".mask-appear").each(function (i) {

        var maskGroup = $(this);
        var innerCont = maskGroup.html();


        $(window).on("resize ready", function () {


            maskGroup.html(null);
            maskGroup.removeAttr("style");
            maskGroup.html(innerCont);
            //console.log(innerCont);


            lineSplitter(maskGroup, .5);
            maskGroup.addClass("hidden");
        });



    });




    /* header transitions */

    $(".contrast-start, .contrast").each(function (i) {

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: $(this).height(), //"100%",
            triggerHook: 0.0,
            //reverse: true,
        }).on(

            "enter leave",

            function (e) {
                $(".document").toggleClass("invert", e.type == "enter");
            }
        ).addTo(controller);

    });

    $(".s5, .s7").each(function (i) {

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: 0,
            triggerHook: 0.0,
            reverse: true,
        }).on(

            "enter leave",

            function (e) {
                $(".document").toggleClass("invert", e.type == "enter");
            }
        ).addTo(controller);

    });

    $(".s4, .s6").each(function (i) {

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: 0,
            triggerHook: 0.0,
            reverse: true,
        }).on(

            "enter leave",

            function (e) {
                $(".document").toggleClass("invert", e.type == "leave");
            }
        ).addTo(controller);

    });


    new ScrollMagic.Scene({
        triggerElement: $(".footer-section")[0],
        duration: "100%",
        triggerHook: 0.0,
        reverse: true,
    }).setClassToggle(
        $(".header")[0],
        "hide-header"
    ).addTo(controller);


    $(".s8 .carousel").each(function (i) {


        new Swiper(this, {
            slidesPerView: 1,
            loop: true,
            slidesPerView: "auto",
            centeredSlides: true,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
        });


    });

    $(".s9 .carousel").each(function (i) {


        new Swiper(this, {
            slidesPerView: 1,
            loop: true,
            slidesPerView: "auto",
            centeredSlides: true,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
        });


    });

	
	$(".s15").each(function () {
		const $w = $(this);
		const $c = $w.find(".carousel");
		const $prev = $w.find(".carousel-button__prev");
		const $next = $w.find(".carousel-button__next");

		const slides = $c.find(".swiper-wrapper > .swiper-slide").length;
		const multi = slides > 1;

		if (!multi) {
			$prev.prop("hidden", true);
			$next.prop("hidden", true);
		}

		new Swiper($c[0], {
			slidesPerView: 1,
			speed: 1000,
			loop: multi,
			allowTouchMove: multi,
			watchOverflow: true,
			navigation: { prevEl: $prev[0], nextEl: $next[0] },
		});
	});


    $(".s19 .carousel").each(function (i) {


        new Swiper(this, {
            slidesPerView: 1,
            speed: 1000,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            loopAdditionalSlides: 1,
            //allowTouchMove: false,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    centeredSlides: false,
                },
            },
        });


    });

	
	$(".s20 .carousel").each(function () {
		
		const el = this;
		const slides = el.querySelectorAll(".swiper-slide").length;
		const canLoop = slides >= 3;

		new Swiper(el, {
			slidesPerView: "auto",
			centeredSlides: true,
			centeredSlidesBounds: true,
			centerInsufficientSlides: true,
			watchOverflow: true,
			loop: canLoop,
			speed: canLoop ? 5000 : 400,
			autoplay: canLoop ? { delay: 0, disableOnInteraction: false } : false,
		});
		
	});


    $(".s21").each(function (i) {

        var carousel = $(this).find(".carousel"),
            buttonPrev = $(this).find(".carousel-button__prev"),
            buttonNext = $(this).find(".carousel-button__next");

        let mySwiper = new Swiper(carousel[0], {
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            centeredSlides: true,
            loopAdditionalSlides: 1,
            navigation: {
                prevEl: buttonPrev[0],
                nextEl: buttonNext[0],
            },

            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    loop: false,
                    centeredSlides: false,
                },
            },
        });

        $(this).find(".s21-3 .carousel-button__prev").click(function (e) {
            e.preventDefault();
            mySwiper.slidePrev();
        });

        $(this).find(".s21-3 .carousel-button__next").click(function (e) {
            e.preventDefault();
            mySwiper.slideNext();
        });


    });

    $(".s22").each(function (i) {

        var carousel = $(this).find(".carousel"),
            buttonPrev = $(this).find(".carousel-button__prev"),
            buttonNext = $(this).find(".carousel-button__next");

        new Swiper(carousel[0], {
            slidesPerView: 1,
            speed: 1000,
            loop: true,
            loopAdditionalSlides: 1,
            centeredSlides: true,
            navigation: {
                prevEl: buttonPrev[0],
                nextEl: buttonNext[0],
            },
        });


    });

    $(".s24").each(function (i) {

        var carousel = $(this).find(".carousel"),
            buttonPrev = $(this).find(".carousel-button__prev"),
            buttonNext = $(this).find(".carousel-button__next");

        new Swiper(carousel[0], {
            slidesPerView: 1,
            speed: 1000,
            loop: true,
            loopAdditionalSlides: 1,
            centeredSlides: true,
            navigation: {
                prevEl: buttonPrev[0],
                nextEl: buttonNext[0],
            },
        });


    });


    $(".page-pattern").each(function (i) {

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: "50%",
            triggerHook: .5,
        }).setTween(

            new TimelineMax()
            .to(
                $(".page-pattern"),
                1.0, {
                    "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                }
            )

        ).addTo(controller);



    });

    /*
    
      new TimelineMax()
            .from(
                $(this).find(".s26-3"),
                1.0, {
                    y: "50%",
                }
            )
            .to(
                $(this).find(".s26-3"),
                1.0, {
                    y: "-50%",
                }
            )
    
    */



    $(".s26-1").each(function (i) {

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: "300%",
            triggerHook: 1,
        }).setTween(

            new TimelineMax()
            
            .add([
                
			TweenMax.fromTo($(this).find(".s26-3"), 1, {
                    y: "10%"
                }, {
                    y: "-50%",
                    ease: Linear.easeNone
                })
                
		      ])


        ).addTo(controller);



    });



    $(window).on("resize", function () {



        if (window.innerWidth >= 1024) {

            appVars();

        } else {

            if (currentAppHeight) {
                currentAppHeight = 0;
                appVars();
            }

        }

        lenis.resize();


    });

    $(window).trigger("resize");

    $(".footer-nav a, .topbar-nav > ul > li > a, .button__secondary .button-text, .button__clear .button-text, .bottombar a, .scrl-button, .tab-inner").each(function (i) {

        var box = $(this).html(),
            txt = "<span>" + box + "</span>",
            inner = $("<span>", {
                html: txt + txt,
                class: "scrl-inner"
            });


        $(this).addClass("scrl").html(null).append(inner);

    });



    if ($(".document").hasClass("loading")) {

        new Swiper(".preloader-title .swiper", {
            slidesPerView: 1,
            loop: true,
            direction: "vertical",
            slidesPerView: 1,
            centeredSlides: true,
            autoplay: {
                delay: 500,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
        });

        var images = $("img[src]"),
            imgLoad = images.imagesLoaded(),
            imgLen = images.length,
            imgLoadedNum = 0,
            perc = 0;

        lenis.stop();

        imgLoad.always(function (instance) {




        }).progress(function (instance, image) {

            if (imgLen) {

                imgLoadedNum++;
                perc = parseInt(imgLoadedNum * 100 / imgLen);

                $(".preloader-perc-val").text(perc);

            } else {

                perc = 100;

            }



        });



        $(".preloader").addClass("preloader-scene-1");

        const preloaderInterval = setInterval(function () {

            if (perc > 0 && !$(".preloader").hasClass("preloader-scene-2")) {
                $(".preloader").addClass("preloader-scene-2");
                return;

            }

            document.fonts.ready.then(function () {


                $(window).trigger("resize");

                if (perc == 100 && !$(".preloader").hasClass("preloader-scene-3")) {


                    $(".preloader").addClass("preloader-scene-3");
                    //return;
                    clearInterval(preloaderInterval);

                    //}
                    //if (perc == 100 && $(".preloader").hasClass("preloader-scene-3")) {

                    //clearInterval(preloaderInterval);

                    //$(".preloader").addClass("preloader-scene-4");


                    $(".document").removeClass("loading");
                    $(".document").addClass("animation-initialize");
                    VideoSrc();

                    marquee();

                    lenis.start();
                    return;



                }

            });




        }, 1000);





    } else {

        VideoSrc();
        $(".document").addClass("animation-initialize");
        marquee();
        lenis.start();

    }




});
