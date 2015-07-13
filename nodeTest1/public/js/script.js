var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var today = new Date();

window.addEventListener('load', function()
{
    // date
    var _dateStr = today.getDate().toString() + " " + months[today.getMonth()].toString();
    var _dateInput = document.getElementById("_date");
    _dateInput ? _dateInput.setAttribute('value', _dateStr) : '';



});

(function ($)
{
    $(function ( )
    {
        taskCount = $("table").find("tr").not(":first").length;
        var newState = $('td:contains("New")').length;
        var resoldevState = $('td:contains("Resolved")').length;
        var closedState = $('td:contains("Closed")').length;

        var text = {
            ta: 'кол-во задач: '+taskCount,
            ns: '<span class="notclosed">незакрытых</span>: '+newState,
            rs: '<span class="fixed">исправленных</span>: '+resoldevState,
            cs: '<span class="closed">закрытых</span>: '+closedState
        };

        $('#tasks').html(text.ta+', '+text.ns+', '+text.rs+', '+text.cs);

        //
        $(".workers p:contains('занят')").addClass('busy');
        $(".workers p:contains('свободен')").addClass('free');

        //
        $('body').css({
            'padding-top': $(window).height()
        });
        $('.dvl p').css({
            left: ($(window).width() - $('.dvl p').width()) / 2,
            top: ($(window).height() - $('.dvl p').height()) /2
        });
        var s = $('.dvl p').html();
        var result = '';

        for (var i=0;i<s.length;i++)
        {
            result += "<" + "span>" + s[i] + "</" + "span>";
        }
        $('.dvl p').html(result);



            setInterval(function()
            {
                $.each($('.dvl p span'), function( index, value ) {
                    $(this).fadeTo("fast", (Math.random() * 0.5)+ 0.2);
                });
            }, 4000);





        if ($('#GraphCollector').length > 0)
        {
            //GraphArray = new Array($('#GraphCollector').val().split(""));
            //numbarr = [GraphArray];
            //_GraphArray = JSON.parse("["+numbarr+"]");
            //
            //function graph(event) {
            //    new Chartist.Bar('.ct-chart', {
            //        labels: ['lku', 'lkf', 'rb', 'rest', 'rb_payments', 'showcase'],
            //        series: [
            //            //[1, 2, 3, 4.5]
            //            _GraphArray
            //        ]
            //    }, {
            //        low: 0,
            //        scaleMinSpace: 1,
            //        height: 250,
            //        high: 10
            //    }).on('draw', function(data) {
            //            if (data.type === 'bar')
            //            {
            //                data.element.attr({
            //                    style: 'stroke-width: 30px'
            //                });
            //            }
            //        });
            //}
            //graph();



            var data = {
                series: [newState, resoldevState, closedState]
            };

            var sum = function(a, b) { return a + b };

            new Chartist.Pie('.ct-chart', data, {
                labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(sum) * 100) + '%';
                }
            });
        }
    });
})(jQuery);