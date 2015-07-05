var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var today = new Date();

window.addEventListener('load', function()
{
    // date
    var _dateStr = today.getDate().toString() + " " + months[today.getMonth()].toString();
    var _dateInput = document.getElementById("_date");
    _dateInput ? _dateInput.setAttribute('value', _dateStr) : '';

    foo = [
    {
        id: 1,
        graph: '983454',
        lku: 'lku text',
        lkf: 'lkf text',
        rb: 'rb text',
        sc: 'sc text',
        pp: 'pp tet',
        rest: 'rest text',
        _date: '27 June',
        taskRow: 'qwertyui'
    },
    {
        id: 2,
        graph: '983454',
        lku: 'lku text',
        lkf: 'lkf text',
        rb: 'rb text',
        sc: 'sc text',
        pp: 'pp tet',
        rest: 'rest text',
        _date: '27 June',
        taskRow: 'uioytrewq'
    }];

    Array.prototype.getObject = function(name, param)
    {
        for(var i = 0; i < this.length; i++)
        {
            var el = this[i];

            if (el[param] == name)
            {
                return el;
            }
        }
    }

    //te = foo.getObject('2', 'id');
    //fid = [];
    //for (var key in te) {
    //    if (te.hasOwnProperty(key))
    //    {
    //        fid.push(te['id']);
    //    }
    //    break;
    //}

    //uniq = foo.getObject('2', 'id');
    //for (var i=0;i<uniq.length;i++){
    //    console.log(uniq[i])
    //}
    // results.getObject(req.query.reportPicker, 'id');

});

(function ($)
{
    $(function ( )
    {
        if ($('#GraphCollector').length > 0)
        {
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
        }
    });
})(jQuery);