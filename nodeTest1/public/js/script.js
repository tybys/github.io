var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var today = new Date();

window.addEventListener('load', function()
{
    // date
    var _dateStr = today.getDate().toString() + " " + months[today.getMonth()].toString();
    var _dateInput = document.getElementById("_date");
    _dateInput ? _dateInput.setAttribute('value', _dateStr) : '';


    //marr = [
    //    {
    //        id: 18,
    //        graph: 654112,
    //        lku: 'все плохо',
    //        lkf: 'плановых работ не ведется',
    //        rb: 'странный сайт, вроде бы живой и давно умерший',
    //        sc: 'активно не верстается',
    //        pp: 'аналогично витрине',
    //        rest: 'все идет согласно плану',
    //        _date: '23 June'
    //    },
    //    {
    //        id: 17,
    //        graph: 123432,
    //        lku: 'wip on 3.3 iteration and some bugs!',
    //        lkf: 'new auth page!',
    //        rb: 'nothing',
    //        sc: 'step by step we mark our site :)',
    //        pp: 'woops',
    //        rest: 'well, we are great!',
    //        _date: '13 September'
    //    }
    //];

    /*
    $("#GraphCollector").on("click", function ()
    {
        var partner = $("#LkuGraph").val();
        var my = $("#LkfGraph").val();
        var main = $("#RbGraph").val();
        var rest = $("#RestGraph").val();
        var rb_payments = $("#Rb_Payments").val();
        var showcase = $("#Showcase").val();

        GraphArray = new Array(partner, my, main, rest, rb_payments, showcase);
        graph();
    });
    */


    GraphArray = new Array($('#GraphCollector').val().split(""));
    numbarr = [GraphArray];
    _GraphArray = JSON.parse("["+numbarr+"]");



    // chart
    function graph(event) {
        new Chartist.Bar('.ct-chart', {
            labels: ['lku', 'lkf', 'rb', 'rest', 'rb_payments', 'showcase'],
            series: [
                //[1, 2, 3, 4.5]
                _GraphArray
            ]
        }, {
            low: 0,
            scaleMinSpace: 1,
            height: 250,
            high: 10
        }).on('draw', function(data) {
                if (data.type === 'bar')
                {
                    data.element.attr({
                        style: 'stroke-width: 30px'
                    });
                }
            });
    }
    graph();
});