(function ($)
{
    $(function ()
    {
        $('body').hide();
        // css builder, delete after
        var stylesheet_builder = function ()
        {
            stylesheet = [
                ["css/import.css", "stylesheet", "all"],
                ["css/custom.css", "stylesheet", "all"],
                ["css/defaults.css","stylesheet", "all"],
                ["css/1920.css", "stylesheet", "all and (min-width: 1920px)"],
                ["css/1024_1920.css", "stylesheet", "screen and (min-width : 1024px) and (max-width: 1920px)"],
                ["css/340.css", "stylesheet", "screen and (min-width : 320px) and (max-width: 640px)"],
                ["css/ipad_portrait.css", "stylesheet", "only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)"],
                ["css/ipad_land.css", "stylesheet", "only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)"]
            ];

            for (var i = 0; i < stylesheet.length; i++)
            {
                var stylesheet_tag = $('<link/>', {'href' : stylesheet[i][0], 'type': 'text/css', 'rel': stylesheet[i][1], 'media': stylesheet[i][2]});
                $('head').append(stylesheet_tag)
            }

        };


        // some global vars
        var window_width = $(window).outerWidth();
        var window_height = $(window).outerHeight();

        // fonts builder, for faer, do something plase (:
        var fonts_builder = function ()
        {
            var link = new Array(
                "https://s3.amazonaws.com/fonts.typotheque.com/WF-021765-007124",
                "http://fonts.typotheque.com/WF-021765-007125",
                "http://fonts.typotheque.com/WF-021765-007127",
                "http://fonts.typotheque.com/WF-021765-007128",
                "http://fonts.typotheque.com/WF-021765-007129",
                "http://fonts.typotheque.com/WF-021765-007130"
            );
            for (var i = 0; i < link.length; i++)
            {
                var link_font = $('<link/>', {'href' : link[i] + '.css', 'type': 'text/css', 'rel': 'stylesheet'});
                $('head').append(link_font);
            }
        };

        //
        $('.navbar-toggle').on('click', function ()
        {
            $(this).toggleClass('down');
            $('#top_nav').slideToggle();
        });

        // grab imgs height on item page
        var item_height_calculate = function ()
        {
            var itemHeight = $('.item-scroller').outerHeight();
            $('.big').css('height', itemHeight)

            var date = $('.page-title.date span').outerWidth();
            var dateTitle = $('.page-title.date h2').css({
                //'margin-left': "calc(50% -" + date + ")"
                position: 'relative',
                left: ~"calc(50% - " + date +")"
            });
        }();

        // mosaic block wall items-wall.html

        // setting top position for second menu on main page
        var  sm = function ()
        {
            var second_menu = $('#second_menu');

            second_menu.css({position: 'absolute', top: window_height / 4 + 100+'px'});
            if (window_height <= 560)
            {
                second_menu.css({top: 0});
                second_menu.find('a').css({fontSize: 52});
            }
            else if (window_height <= 1024)
            {
                second_menu.css({top: window_height / 4.5});
                second_menu.find('a').css({fontSize: 52});
            }
        }();

        var social_background_toggling = function ()
        {
            $('.share span').hover(function ()
            {
                $(this).prepend('<span id="background" />');
            }, function ()
            {
                $('#background').remove();
            });
        }();

        $('.share img').hover(function ()
        {
            $(this).animate({
                top: "-96"
            })
            $(this).next().animate({
                top: "0"
            })
        }, function ()
        {
            $(this).animate({
                top: "0"
            })
            $(this).next().animate({
                top: "96"
            })
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
            total = $('<span/>', {'class' : 'total'}).text('73 300 р.'),
            btn_text = $('<span/>', {'class' : 'text'}).text('Оформить заказ'),
            btn = $('<button/>', {'class' : 'button simple-transparent input-icon', 'style': 'margin-left: 25px'}).text('Обновить данные');

        var items_parent = $('.cart-items');
        var item = items_parent.find('.item').last();

        wrapper.append(heading, total, wrapper_buttons).appendTo(item)
        wrapper_buttons.append(wrapper_buttons_.append(btn_text)).after().append(btn)

        //
        //  debug shit, delete after
        //
        // temporary menu
        var temp_menu = function ()
        {
            var rootMenu = $('<div id="sub" />').appendTo('body');
            var menu = [
                ["index", "главная"],
                ["contacts", "контакты"],
                ["history", "история"],
                ["item", "товар"],
                ["item-wall", "товар плиткой"],
                ["journal", "журналы"],
                ["personal-info", "личная информация"],
                ["cart", "корзина"],
                ["ordering", "заказ"],
                ["404", ""],
                ["posts", "пост"],
                ["video-post", "видео-пост"],
                ["strange-article", "статья"],
                ["recruit", "вакансии"],
                ["index-mobile-details", 'главная+'],
                ["controls", "формы"]
            ]
            for (var i = 0; i < menu.length; i++)
            {
                var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
                $('#sub').append(m);
            }

            rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
            rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
            $('.row').append("<div id='grid' />");
        }();

        //$('body').append('<span id="toggle">toggle</span>');
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        });
        $('#grid').show();

        $.when( $(document) ).then(function() {
            fonts_builder();
            $('body').show()
        });


        // index backround sizer
        var background_sizer = function ()
        {
            var cap_height = $('.top').outerHeight();
            var menu_height = $('.menu').outerHeight();
            var sum = window_height - (cap_height + menu_height)

            console.log('window height' + window_height, 'cap height' + cap_height, 'menu height' + menu_height, 'sum' + sum)
            $('.index').css('height', sum) // must be 749

            $(window).resize(function ()
            {
                // $('.index').css('height', sum)
            });
        }();

        //stylesheet_builder();
    });
})(jQuery);