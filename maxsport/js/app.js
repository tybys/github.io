var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["index", "main"],
        ["inside", "inside"],
        ["inside-catalog", "inside-catalog"],
        ["inside-catalog-item", "inside-catalog-item"],
        ["cart", "cart"],
        ["cart_", "cart#2"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
    //$('.row').append("<div id='grid' />");

    $(".menu li").hover(function ()
    {
//        var t = $(this);
//        if (t.find("ul.sub"))
//        {
//            t.show();
//            t.mouseleave(function () {
//                $(".sub").hide();
//            });
//        }
    });
}();