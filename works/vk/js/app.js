(function ($) {
    $(function () {
       // water timer
       setTimeout(function () {
           //$(".water").addClass("start");
       }, 3000);

        $('#fileUpload').change(function () {
            var filepath = this.value;
            m = filepath.match(/([^\/\\]+)$/),
                filename = m[1];

            //filename.length !== 0 ? "" : "";

            if (filename.length !== 0) {
                $("#fileWrap").find("i").attr("class", "icon-trash");
                $('#filename span').toggleClass("ass")
            }

            $('#filename span').html(filename);
            //console.log($('#fileUpload').val());

        });

        $("#cleaner").click(function () {
            if (!$(this).hasClass("icon-paperclip")) {
                $('#filename span').html(window.messages.attachFile);
                $("#fileWrap").find("i").attr("class", "icon-paperclip");
                $('#fileUpload').val("");
                //console.log($('#fileUpload').val());
            }
        });
    });
})(jQuery);