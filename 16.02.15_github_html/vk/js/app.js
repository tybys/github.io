(function ($) {
    $(function () {
       // water timer
       setTimeout(function () {
           //$(".water").addClass("start");
       }, 3000);

//        var formHeight = $(".moveto:visible").outerHeight();
//        $("form").css("height", formHeight + 16);
//
//        $("#scopes input").change(function () {
//            var currentValue = $(this).attr("data-scope");
//            var partForm = $(this).parents("fieldset").nextAll(".active").attr("id");
//
//            if (currentValue == partForm) {
//                $(".moveto").removeClass("active");
//            }
//        });

        $('#fileUpload').change(function () {
            var filepath = this.value;
            m = filepath.match(/([^\/\\]+)$/),
                filename = m[1];
            var fileExtension = filename.split(".").pop();

            if (filename.length !== 0) {
                $("#fileWrap").find("i").attr("class", "icon-trash");
                $('#filename span').addClass("ass");
                $("#cleaner").html("Удалить").addClass("cleaner");
                //filename.length > 23 ? alert(fileExtension) : ""; 
                if (filename.length > 23) {
                    $('#filename span').html(filename+fileExtension);
                }
            }

            $('#filename span').html(filename);
            //console.log($('#fileUpload').val());

        });

        $("#cleaner").click(function () {
            if (!$(this).hasClass("icon-paperclip")) {
                $('#filename span').html("Прикрепить");
                $("#fileWrap").find("i").attr("class", "icon-paperclip").removeClass("cleaner").html("(страница с фотографией)");
                $('#fileUpload').val("");
                $('#filename span').removeClass("ass");
                
                //console.log($('#fileUpload').val());
            }
        });
    });
})(jQuery);