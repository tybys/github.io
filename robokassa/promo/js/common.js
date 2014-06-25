(function ($) {
    $(function () {
        var window_width = $('body').outerWidth();
        var window_height = $(window).outerHeight();

        console.log(window_height)

        var row = $('.row').not('.head').not('.footer');
        row.css({
            height: window_height
        });
    });
})(jQuery);