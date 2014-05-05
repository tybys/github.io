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
        var rootMenu = $('<div id="sub" hidden />').appendTo('body');
        var menu = new Array("index", "contacts", "history", "item", "item-wall", "journal", "personal-info", "cart", "ordering", "404", "posts");
        for (var i = 0; i < menu.length; i++)
        {
            var m = $('<a/>', {'href' : menu[i] + '.html'}).text(menu[i]);
            $('#sub').append('<span style="display: inline;">'+i+'</span>',m);
        }

        rootMenu.css({position: 'fixed',top: '1%',left: '1%',zIndex: '999'});
        rootMenu.find('a').css({display: 'inline',paddingRight: '5px',color: 'black'});
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
            $('body').toggleClass('debug');
            rootMenu.fadeToggle('hidden')
        });


        if ($('body').outerWidth() < 600)
        {
//            $('.logotype').remove();
        }

        $('.navbar-toggle').on('click', function ()
        {
            $(this).toggleClass('down');
            $('#top_nav').slideToggle();
        });


    });
})(jQuery);