$(function ()
{
    $("body").keydown(function(e) {
        var t = $(this);
        e.keyCode == 220 ? t.toggleClass("color-debug") :""
    });
    init_number();
    temp_menu();
});

var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["index", "главная"],
        ["category", "категории"],
        ["item-card", "карточка товара"],
        ["category-fast-view", "быстрый просмотр"],
        ["cart", "корзина"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
}

function init_number ()
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
 * author of this "implementation" method - Tabasov.K
 */
{
    var field = $('input');
    console.log(field)
    var numbValue = $('<span/>', { 'class': 'numb-value' });
    var arrUp = $('<span/>', { 'class': 'arr-up', 'role': 'ArrUp' });
    var arrDown = $('<span/>', { 'class': 'arr-down', 'role': 'ArrDown' });

    field.attr('type') == 'number' ? field.wrap('<span class="number-wrap" />').attr('hidden', 'hidden') : '';

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
};