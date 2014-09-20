(function ($)
{
    $(function ()
    {

        /******************\
         *     DEBUG     *
         \_______________*/
        $('.units-row a').on('click', function (e)
        {
            e.preventDefault();
        });

        var bodyCalc = function ()
        {
            var bwidth = $(window).outerWidth(),
                bheight = $(window).outerHeight(),
                bbSum = (' width ' + bwidth + ' height ' + bheight);

            var uwidth = $('.unit-centered').eq(0).outerWidth();

            $('body').append('<div id="bodycalc" style="position: fixed; top: 15%; left: 5%;">'+ 'content width ' + uwidth +'</div>');
        }();

        // video link-panel
        var videoLink = function ()
        {
            var videoPanel = $('.video a'),
                videoPanelWidth = videoPanel.parent().outerWidth(),
                videoPanelHeight = videoPanel.parent().outerHeight();

            videoPanel.css
            ({
                left: videoPanelWidth / 4 - 18+'px',
                top: videoPanelHeight / 2 - 88+'px'
            });
        }();

        // temporary menu
        var rootMenu = $('<div id="sub" />').appendTo('body');
        var menu = new Array("index", "registration","login","news","history","catalog","item","wishlist","orderbuild", "cart", "contacts", "instructions", "faq");
        for (var i = 0; i < menu.length; i++)
        {
            var m = $('<a/>', {'href' : menu[i] + '.html'}).text(menu[i]);
            $('#sub').append('<span style="float: left; margin-right: 5px;">'+i+'</span>',m);
        }

        rootMenu.css({position: 'fixed',top: '15%',left: '1%',zIndex: '999', width: '10%'});
        rootMenu.find('a').css({display: 'block',padding: '0px',color: 'black'});

        /** ^_^ |.d.| ^,,,^ |.e.| ^_^ |.l.| ^,,,^ |.e.| ^_^ |.t.| ^,,,^ |.e.| ^_^ ^,,,^ |.m.| ^_^ |.e.| ^,,,^.  **/


        /**
         * worked prototype for input[type="number"]
         *
         * Copyright (c) 2011 Vladimir Axyonov - sketch43@gmail.com
         *
         * Dual licensed under the MIT and GPL licenses:
         *   http://www.opensource.org/licenses/mit-license.php
         *   http://www.gnu.org/licenses/gpl.html
         *
         *
         * author of this "implementation" method - Tabasov.K aka tybys
         */
        var init_number = function ()
        {
            field = $('input');
            numbValue = $('<span/>', { 'class': 'numb-value' });
            field.attr('type') == 'number' ? field.wrap('<span class="number-wrap" />').attr('hidden', 'hidden') : '';
            arrUp = $('<span/>', { 'class': 'arr-up', 'role': 'ArrUp' });
            arrDown = $('<span/>', { 'class': 'arr-down', 'role': 'ArrDown' });

            $('.number-wrap').prepend(numbValue);
            $('.number-wrap').prepend(arrUp);
            $('.number-wrap').prepend(arrDown);
            numbValue.text(field.val())

            arrUp.add(arrDown).click(function ()
            {
                var is_down = $(this).is('.' + 'arr-down'),
                    val = parseInt(field.val(), 10) || 0;
                field.val(is_down ? (val - 1) : (val + 1));
                numbValue.text(field.val())
            });

            arrUp.add(arrDown).bind('mousedown', function ()
            {
                var is_down = $(this).is('.' + 'arr-down'),
                    val = parseInt(field.val(), 10) || 0;
                press_interval = setInterval(function ()
                {
                    field.val(is_down ? (val--) : (val++));
                    numbValue.text(field.val())
                }, 100);
            });

            arrUp.add(arrDown).bind('mouseup', function ()
            {
                clearInterval(press_interval);
            });
        }();

    });
})(jQuery);