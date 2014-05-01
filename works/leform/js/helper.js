(function ($)
{
    $(function ()
    {

        $('body').append('<span id="toggle">toggle</span>')
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        })
    });
})(jQuery);