(function ($) {
    $(function () {

        // grid stuff
        var grid_options = $(".options ul li");

        grid_options.on("click", function () {
           $(this).attr("id") == "min" ? "" : "";

            if ($(this).attr("id") == "max") {
                $("#items").attr("class", "five").find("img").attr("height", "200");
            }

            if ($(this).attr("id") == "middle") {
                $("#items").attr("class", "four").find("img").attr("height", "238");
            }

            if ($(this).attr("id") == "min") {
                $("#items").attr("class", "three").find("img").attr("height", "292");


            }

        });

        // callback switcher
        $(".phones > a").hover(function () {
            $(".block").show();
        });

        $(".block").mouseleave(function () {
            $(this).hide();
        });
    });
})(jQuery);
