(function ($)
{
    $(function ()
    {
        var itemHeight = $('.item-scroller').outerHeight();
        $('.big').css('height', itemHeight)

        $('.shapeshift-container')
        .shapeshift({
            enableDrag: false,
            enableCrossDrop: false,

            align: "left",
            minColumns: 3,
            gutterX: 0,
            gutterY: 0,
            paddingX: 0,
            paddingY: 0
        });



        $('body').append('<span id="toggle">toggle</span>')
        $('#toggle').click(function ()
        {
            $('#grid').fadeToggle();
        });


        if ($('body').outerWidth() < 600)
        {
//            $('.logotype').remove();
        }

        $('.navbar-toggle').on('click', function ()
        {
            $(this).toggleClass('down');
            $('#top_nav').slideToggle();
        });


    });
})(jQuery);