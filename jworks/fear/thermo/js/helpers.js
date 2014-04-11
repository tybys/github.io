(function ($)
{
    $(function ()
    {
        // global parameters for window
        var bwidth = $(window).outerWidth(),
            bheight = $(window).outerHeight(),
            bbSum = (' width ' + bwidth + ' height ' + bheight);

        var bodyCalc = function ()
        {
            $('body').append('<div style="position: fixed; top: 15%; left: 5%;">'+ bbSum +'</div>');
        }();

        $(window).resize(function ()
        {
            bodyCalc();
        });
    });
})(jQuery);