(function ($) {
    $(function () {
        $(window).load(function () {
            var ul = $("#slider_ul");
            var _eachWidth = ul.children('li').eq(0).outerWidth(true);
            var currIndex = 3;

            ul.on("click", "div.arr", function ()
            {
                var items = ul.children('li');
                var items_text = items.find(".text")
                var sel = ul.find("li._sel");
                var bPrev = $(this).hasClass("prev");
                var nx = bPrev ? sel.prev() : sel.next();

                sel.removeClass("_sel");
                nx.addClass("_sel");

                if (bPrev)
                {
                    $(".text").hide();
                    ul.animate({
                        left: _eachWidth - 198
                    }, 500, function () {
                        items.last().remove();
                        ul.prepend(ul.find("li").last().clone());
                        ul.css("left", -198);
                        currIndex = (currIndex + 5) % 6;
                        $(".markers").attr("class", "markers m" + currIndex);
                        text();
                    });
                }
                else
                {
                    ul.animate({
                        left: -_eachWidth - 198
                    }, 500, function () {
                        items.first().remove();
                        ul.append(ul.find("li").first().clone());
                        ul.css("left", -198);
                        currIndex = (currIndex + 1) % 6;
                        $(".markers").attr("class", "markers m" + currIndex);
                        text();
                    });
                }
            });

            ul.on("click", "li", function ()
            {
                var t = $(this);
                $(".text").hide();
                if (!t.hasClass("_sel"))
                {                    
                    slideSliderToItem(parseInt(t.attr("class"), 10) -1);
                }
            });

            function slideSliderToItem(newIdx)
            {
                if (newIdx != currIndex)
                {
                    var items = ul.children('li');
                    var sel = ul.find("li._sel");
                    var d = currIndex - newIdx;
                    if (d > 3) d = d - 6;
                    else if (d < -3) d = 6 + d;

                    var nx = items.eq(3 - d);

                    sel.removeClass("_sel");
                    nx.addClass("_sel");

                    if (d > 0)
                    {
                        for (var i = 0; i < d; i++) { ul.prepend(ul.find("li").eq(-2 - i).clone()); }
                        ul.css("left", -198 - d * _eachWidth);

                        ul.animate({
                            left: -198
                        }, 500, function () {
                            for (var i = 0; i < d; i++) { items.eq(-1 - i).remove(); }
                            currIndex = newIdx;
                            $(".markers").attr("class", "markers m" + currIndex);
                            text();
                        });
                    }
                    else
                    {
                        for (var i = 0; i < -d; i++) { ul.append(ul.find("li").eq(1 + i).clone()); }
                        ul.animate({
                            left: -198 + d * _eachWidth
                        }, 500, function () {
                            for (var i = 0; i < -d; i++) { items.eq(i).remove(); }
                            ul.css("left", -198);
                            currIndex = newIdx;
                            $(".markers").attr("class", "markers m" + currIndex);
                            text();
                        });
                    }
                }
            }

            var strings = [
                "∞∞∞∞∞∞∞∞∞",
                "80000000-",
                "83%------",
                "100000000"
            ];

            $(".pipka").click(function () {
                $(this).addClass("sel");
                
                var i = parseInt($(".rulet").data("index"));

                displayItem((i + 1) % strings.length);

                setTimeout(function () {
                    $(".pipka").removeClass("sel");
                }, 300);                        
            });

            displayItem(0);

            function displayItem (i) 
            {
                $(".rulet").data("index", i);
                displayNumericStr(strings[i]);
                $(".rulet-content").attr("class", "rulet-content info" + i);
            }

            function text()
            {
                setTimeout(function () {
                    $("._sel .text").fadeIn('slow')
                }, 50);
            }

            function displayNumericStr(str)
            {
                var unit = -47;
                
                $(".cycle").each(function (index, el) {
                    var pos = "0123456789∞-%".indexOf(str.substr(index, 1));
                    if (pos != -1)
                    {
                        $(el).css('top', pos * unit);
                    }
                });
                
            }
        });
    });
})(jQuery);