var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var today = new Date();

window.addEventListener('load', function()
{
    // date
    var _dateStr = today.getDate().toString() + " " + months[today.getMonth()].toString();
    var _dateInput = document.getElementById("_date");
    _dateInput ? _dateInput.setAttribute('value', _dateStr) : '';


    marr = [
        {
            id: 18,
            graph: 654112,
            lku: 'все плохо',
            lkf: 'плановых работ не ведется',
            rb: 'странный сайт, вроде бы живой и давно умерший',
            sc: 'активно не верстается',
            pp: 'аналогично витрине',
            rest: 'все идет согласно плану',
            _date: '23 June'
        },
        {
            id: 17,
            graph: 123432,
            lku: 'wip on 3.3 iteration and some bugs!',
            lkf: 'new auth page!',
            rb: 'nothing',
            sc: 'step by step we mark our site :)',
            pp: 'woops',
            rest: 'well, we are great!',
            _date: '13 September'
        }
    ];

    //for (var i in marr)
    //{
    //    splittedData = marr[i]
    //    console.log(splittedData)
    //}



    // serie = seriesData.getObject(serieName, 'series'),

});