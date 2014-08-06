(function ($) {
    $(function () {

        var grid_options = $(".options ul li");

        grid_options.on("click", function () {
           $(this).attr("id") == "min" ? "" : "";

            if ($(this).attr("id") == "max") {
                $("#items").attr("class", "five")
            }

            if ($(this).attr("id") == "middle") {
                $("#items").attr("class", "four")
            }

            if ($(this).attr("id") == "min") {
                $("#items").attr("class", "three")
            }

        });

    });
})(jQuery);
