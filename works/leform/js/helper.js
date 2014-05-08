(function ($)
{
    $(function ()
    {
        var itemHeight = $('.item-scroller').outerHeight();
        $('.big').css('height', itemHeight)

        var date = $('.page-title.date span').outerWidth();
        var dateTitle = $('.page-title.date h2').css({
            //'margin-left': "calc(50% -" + date + ")"
            position: 'relative',
            left: ~"calc(50% - " +date +")"
        });

        // temporary menu
        var rootMenu = $('<div id="sub" />').appendTo('body');
        var menu = new Array(
            "index",
            "contacts",
            "history",
            "item",
            "item-wall",
            "journal",
            "personal-info",
            "cart",
            "ordering",
            "404",
            "posts",
            "video-post",
            "strange-article",
            "recruit",
            "index-mobile-details");
        for (var i = 0; i < menu.length; i++)
        {
            var m = $('<a/>', {'href' : menu[i] + '.html'}).text(menu[i]);
//            $('#sub').append('<span style="display: inline;background: black;color: white;;">/</span>', m);
            $('#sub').append(m);
        }

        rootMenu.css({position: 'fixed',top: '1%',left: '1%',zIndex: '999'});
        rootMenu.find('a').css({display: 'inline',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
        $('.row .container').append("<div id='grid' style='display: none' />");
//        $('.shapeshift-container')
//        .shapeshift({
//            enableDrag: false,
//            enableCrossDrop: false,
//
//            align: "left",
//            minColumns: 3,
//            gutterX: 0,
//            gutterY: 0,
//            paddingX: 0,
//            paddingY: 0
//        });



        $('body').append('<span id="toggle">toggle</span>')
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        });

        // second menu
        var window_width = $(window).outerWidth();
        var window_height = $(window).outerHeight();
        var  sm = function ()
        {
            var second_menu = $('#second_menu');

            second_menu.css({
                position: 'absolute',
                top: window_height / 4
            });
        }();

        // img resizer, bad idea, wait for fear
        var ir = function ()
        {
            var img = $('.index');

        }();

        var cap_height = $('.top').outerHeight();
        var menu_height = $('.menu').outerHeight();
        var sum = window_height - (cap_height + menu_height)

        $('.index').css('height', sum)

        $('.navbar-toggle').on('click', function ()
        {
            $(this).toggleClass('down');
            $('#top_nav').slideToggle();
        });


    });
})(jQuery);