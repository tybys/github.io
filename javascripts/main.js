(function ($)
{

    $(function ()
    {
        // top panel


        WebFontConfig = {
            google: { families: [ 'PT+Serif+Caption:400,400italic:cyrillic-ext,latin' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();

        $.fn.equalHeights = function(minHeight, maxHeight) {
            tallest = (minHeight) ? minHeight : 0;
            this.each(function() {
                if($(this).height() > tallest) {
                    tallest = $(this).height();
                }
            });
            if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
            return this.each(function() {
                $(this).height(tallest).css("overflow","auto");
            });
        }
        $.getJSON( "javascripts/all.json", function( data ) {
            titles = [];
            var hrefs = [];
            var tags = [];
            $.each(data, function (index, val) {
                //titles.push(data[index][0].name)
                //hrefs.push(data[index][0].logotype)
                var title = $("<h2/>", {html: data[index][0].name});
                var img = $("<img/>", {src: data[index][0].logotype, width: data[index][0].width, height: data[index][0].height});
                //var skills = $("<p/>", {html: data[index][0].skils});

                var info = $("<a/>", {target: "_blank", html: title});
                var items = $("<li/>", {"class": "items "+data[index][0].name}).append(info);


                items.appendTo('#wrap')
                //console.log(data[index][0].skils)
                items.equalHeights(150)
                var sum = items.outerHeight() - img.outerHeight();
                console.log(sum)

                $(".items img").css({
//                    top: sum
                });
            });

        });
    });
})(jQuery);