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

		// price
		$('#price, #color').on("hover", function () {
			$(this).removeClass("background").addClass("active");
			$(".value", $(this)).show();
		});

        // price slider
        $( "#slider" ).slider({
            range: true,
            min: 3000,
            max: 50000,
            step: 10,
            values: [0, 50000],
            slide: function(event, ui) {
                var delay = function() {
                    var handleIndex = $(ui.handle).data('index.uiSliderHandle');
                    var label = handleIndex == 0 ? "#min" : "#max";
                    $(label).html(ui.value + "&nbsp;руб.").position({
                        my: 'center top',
                        at: 'center bottom',
                        of: ui.handle,
                        offset: "0, 10"
                    });
                };

                // wait for the ui.handle to set its position
                setTimeout(delay, 5);
            }
        }); 

        $("<div>", {"id": "min"}).appendTo($(".ui-slider-handle").eq(0));
        $("<div>", {"id": "max"}).appendTo($(".ui-slider-handle").eq(1));

        $("min").html("руб." + $("#slider").slider("values", 0)).position({
            my: "center top",
            at: "center bottom",
            of: $("#slider a:eq(0)"),
            offset: "0, 10"
        });

        $("#max").html($("#slider").slider("values", 1) + "&nbsp;руб.").position({
            my: "center top",
            at: "center bottom",
            of: $("#slider a:eq(1)"),
            offset: "0, 10"
        });

        // size slider
        $( "#sliderStep" ).slider({
          value: 40,
          min: 40,
          max: 120,
          step: 10,
          slide: function( event, ui ) {
            //$( "#amount" ).val( "$" + ui.value );
            console.log($(".ui-slider-handle").attr("style"))
            if ($(".ui-slider-handle").attr("style") == "left: 12.5%") {

            }
          }
        });

        // and then we can apply pips to it!
        $("#sliderStep").slider("pips", {
            rest: "sdflabel"
        });

        // selects…

         $("select").multipleSelect({
            onOpen: function () {
                /*
                style
                collection
                specs
                */
                //$("#specs").addClass("active");
            },
            onClose: function () {
                //$("#specs").removeClass("active");
            }
         });
         $(".ms-drop.bottom").mouseleave(function () {
            $(this).hide();
         });

        $(".ms-choice").click(function (e) {
            console.log($(this).parents(".parr"))
            $(this).parents(".parr").addClass("active")
        });
    });
})(jQuery);
