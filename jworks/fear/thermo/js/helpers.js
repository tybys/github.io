(function ($)
{
    $(function ()
    {
        // global parameters for window
        var bwidth = $(window).outerWidth(),
            bheight = $(window).outerHeight(),
            bbSum = (' width ' + bwidth + ' height ' + bheight);

        var uwidth = $('.unit-centered').eq(0).outerWidth();

        var bodyCalc = function ()
        {
            $('body').append('<div id="bodycalc" style="position: fixed; top: 15%; left: 5%;">'+ 'content width ' + uwidth +'</div>');
        }();

        $(window).resize(function ()
        {
//            $('#bodycalc').html(bbSum)
        });

        // video link-panel
        var videoPanel = $('.video a'),
            videoPanelWidth = videoPanel.parent().outerWidth(),
            videoPanelHeight = videoPanel.parent().outerHeight();

        videoPanel.css
        ({
            left: videoPanelWidth / 4 - 18+'px',
            top: videoPanelHeight / 2 - 88+'px'
        });
    });
})(jQuery);