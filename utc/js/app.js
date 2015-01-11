$(function ()
{
    temp_menu();
});

var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["index", "главная"],
        ["category", "категории"],
        ["item-card", "карточка товара"],
        ["category-fast-view", "быстрый просмотр"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
    //$('.row').append("<div id='grid' />");
}