var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["home", "главная"],
        ["cart", "корзина"],
        ["category", "категория"],
        ["item-card", "товар"],
        ["tabs", "табы"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
}();

$(function () {
    var itemImg = $(".item .cube").find("img");

    // itemImg.outerHeight()
    itemImg.css({
        //marginTop: 50 - 10
    });

    //console.log(itemImg.outerHeight() / 2)

});