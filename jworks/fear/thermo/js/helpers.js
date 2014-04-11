(function ($)
{
    $(function ()
    {
        // global parameters for window
        var bwidth = $(window).outerWidth,
            bheight = $(window).outerHeight;

        $('body').append(bwidth, bheight);

    });
})(jQuery);