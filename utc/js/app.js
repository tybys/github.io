$(function ()
{
    $("body").keydown(function(e) {
        var t = $(this);
        e.keyCode == 220 ? t.toggleClass("color-debug") :""
    });

    temp_menu();

    /** BLOCKS ZOOMING SHITCODE
     * default specs
     * width: 175, height: 285
     * width must be 217
     *
     *     $(this).animate({
             width: 300,
             height: 400,
             top: -80,
             left: -45
           }, 'fast');
     $(this).animate().css('box-shadow', '0 0 5px #000');
     $(this).css({
             zIndex: 100
           });*/

    $(".item .inner", $(".custom-grid")).hover(function ()
    {
        var t = $(this);

        t.stop(true).animate({
            //marginLeft: -15,
            //width: 205,
            //zIndex: 2,
            //minHeight: 465
        }, 300)
    }, function ()
    {
        var t = $(this);

        t.animate({
            //marginLeft: 0,
            //width: 175,
            //zIndex: 1,
            //minHeight: 285
        }, 150)
    });
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