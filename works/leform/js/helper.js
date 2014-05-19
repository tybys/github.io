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
            "index-mobile-details",
            "controls");
        for (var i = 0; i < menu.length; i++)
        {
            var m = $('<a/>', {'href' : menu[i] + '.html'}).text(menu[i]);
//            $('#sub').append('<span style="display: inline;background: black;color: white;;">/</span>', m);
            $('#sub').append(m);
        }

        rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
        rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
        $('.row .container').append("<div id='grid' style='display: none' />");


        // mosaic block wall items-wall.html


        //$('body').append('<span id="toggle">toggle</span>')
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        });


        // img resizer, bad idea, wait for fear
        var ir = function ()
        {
        //    var img = $('.index');

        }();





        $('.navbar-toggle').on('click', function ()
        {
            $(this).toggleClass('down');
            $('#top_nav').slideToggle();
        });

        ////////////////
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

        // index backround sizer
        var cap_height = $('.top').outerHeight();
        var menu_height = $('.menu').outerHeight();
        var sum = window_height - (cap_height + menu_height)
        $('.index').css('height', sum)

        $(window).resize(function ()
        {
//            $('.index').css('height', sum)
        });

        $('.share span').hover(function ()
        {
            $(this).prepend('<span id="background" />');
        }, function ()
        {
            $('#background').remove();
        });

        // cart total template, LOL
        /*
         <<div class="cart-total">>
             <span class="heading">общая стоимость</span>
             <span class="total">123123 р.</span>
             <div class="controls custom few-buttons">
                 <div class="button black">
                     <span class="text">Оформить заказ</span>
                     <span class="text">Оформить заказ</span>
                 </div>

                <button class="button simple-transparent input-icon">Обновить данные</button>
             </div>
         </div>


         var $wrapper = $("<div/>", { class: "wrapper" }),
         $inner = $("<div/>", { class: "inner" }),
         $text = $("<span/>", { text: "Some text" });
         Then put it all together with append et al:

         $wrapper.append($inner.append($text)).appendTo("#whatever");
         */
        var wrapper = $('<div/>', {'class' : 'cart-total', 'style': 'width: 325px;'}),
            wrapper_buttons = $('<div/>', {'class' : 'controls custom few-buttons'}),
            wrapper_buttons_ = $('<div/>', {'class' : 'button black'}),
            heading = $('<span/>', {'class' : 'heading'}).text('общая стоимость'),
            total = $('<span/>', {'class' : 'total'}).text('123123 р.'),
            btn_text = $('<span/>', {'class' : 'text'}).text('Оформить заказ'),
            btn = $('<button/>', {'class' : 'button simple-transparent input-icon', 'style': 'margin-left: 25px'}).text('Обновить данные');

        var items_parent = $('.cart-items');
        var item = items_parent.find('.item').last();

        wrapper.append(heading, total, wrapper_buttons).appendTo(item)
        wrapper_buttons.append(wrapper_buttons_.append(btn_text)).after().append(btn)

    });
})(jQuery);