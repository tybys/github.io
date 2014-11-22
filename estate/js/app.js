(function ($) {
    $(function () {
        var windowWidth = $(window).outerWidth();
        var link320 = $("<link/>",
            {
                "rel": "stylesheet",
                "href": "css/not-apple.css",
                "media": "only screen and (min-device-width: 320px) and (min-device-height: 568px)"
            });


        BrowserDetect();
        Platform();
        Navigator();

        //$('body.Phone.Mac')
        alert($("body").attr("class"))

        $( "#datepicker" ).datepicker({
            numberOfMonths: windowWidth >= 320  <= 768 ? 1 : 3, // not good idea, but
            //numberOfMonths: 3,
            showButtonPanel: true,
            show: true
        });
        $("#datepicker").datepicker($.datepicker.regional[ "ru" ]);
        /**
         * phone
         * tablet
         * windows
         * mac
         * linux
         *
         */

    });
})(jQuery);

// browser detect
function BrowserDetect()
{
    navigator.sayswho = (function () {
        var navi = navigator.appName,
            ua = navigator.userAgent,
            tem,
            re_match = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

        if (re_match && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
            re_match[2] = tem[1];
        }

        if (re_match) {
            re_match = [re_match[1], re_match[2]];
        } else {
            re_match = [navi, '-?'];
        }

        // short code for ie8 detection
        var bversion = re_match[1],
            compClass = bversion.split('.', 1),
            cC = compClass.toString();

        $('body').addClass(re_match[0]).addClass(cC);
    })();
}

/*
 Changing class of body
 depending on - platform, devices and screen resolution
 for example <body class="desctop windows" />*/
function Platform()
{
    switch (!!navigator.platform.match) {
        case '/linux/i':
            $('body').addClass('linux');
            break;
        case '/win/i':
            $('body').addClass('windows');
            break;
        case '/iphone/i':
            $('body').addClass('iphone ios');
            break;
        case '/ipad/i':
            $('body').addClass('ipad ios');
            break;

            break;
    }
}

function Navigator()
{
    //console.time('test');
    //
    if (!!navigator.platform.match(/linux/i)) {
        $('body').addClass('Linux');
    } else if (!!navigator.platform.match(/win/i)) {
        $('body').addClass('Windows');
    } else if (!!navigator.platform.match(/iphone/i)) {
        $('body').addClass('Iphone iOS');
    } else if (!!navigator.platform.match(/ipad/i)) {
        $('body').addClass('Ipad iOS');
    } else if (!!navigator.platform.match(/macintel/i)) {
        $('body').addClass('Mac');
    }

    var windowWidth = parseInt($(window).width(), 10);
    if (windowWidth > 1000) {
        $('body').addClass('desktop');
    } else if (windowWidth > 758) {
        $('body').addClass('Tablet');
    } else {
        $('body').addClass('Phone');
    }
    //
    //console.timeEnd('test');
    // 77 firefox

    //var np = navigator.platform;
    //alert(np)
    //alert(np == np.match(/macintel/i)) ? alert(1) : alert(2)

}