jQuery(document).ready(function() {

    $("a[rel*=leanModal]").leanModal();

    $("select").ikSelect({
        autoWidth:false
    });


    var menuRight = document.getElementById("cbp-spmenu-s2"), showRight = document.getElementById("showRight"), showRightPush = document.getElementById("showRightPush"), body = document.body;

    showRightPush.onclick = function() {
        classie.toggle(this, "active");
        classie.toggle(body, "cbp-spmenu-push-toleft");
        classie.toggle(menuRight, "cbp-spmenu-open");
        disableOther("showRightPush");
    };

    function disableOther(button) {
        if (button !== "showRightPush") {
            classie.toggle(showRightPush, "disabled");
        }
    }


    function close_accordion_section() {
        jQuery(".accordion .accordion-section-title").removeClass("active");
        jQuery(".accordion .accordion-section-content").slideUp(300).removeClass("open");
    }
    jQuery(".accordion-section-title").click(function(e) {
        var currentAttrValue = jQuery(this).attr("href");
        if (jQuery(e.target).is(".active")) {
            close_accordion_section();
        } else {
            close_accordion_section();
            jQuery(this).addClass("active");
            jQuery(".accordion " + currentAttrValue).slideDown(300).addClass("open");
        }
        e.preventDefault();
    });
});

$(document).ready(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    $('a.smooth-scroll').click(function() {
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        if ($.browser.safari) {
            $("body").animate({
                scrollTop:destination
            }, 1100);
        } else {
            $("html").animate({
                scrollTop:destination
            }, 1100);
        }
        return false;
    });
    var $menu = $("#block-fixed");
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100 && $menu.hasClass("default")) {
            $menu.removeClass("default").addClass("fixed");
        } else if ($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
            $menu.removeClass("fixed").addClass("default");
        }
    });
});
