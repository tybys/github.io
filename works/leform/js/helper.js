(function ($)
{
    $(function ()
    {

        $('body').append('<span id="toggle">toggle</span>')
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        });


        if ($('body').outerWidth() < 600)
        {
//            $('.logotype').remove();
        }
    });
})(jQuery);