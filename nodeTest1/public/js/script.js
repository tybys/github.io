var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var today = new Date();

window.addEventListener('load', function()
{
    // date
    var _dateStr = today.getDate().toString() + " " + months[today.getMonth()].toString();
    var _dateInput = document.getElementById("_date");
    _dateInput ? _dateInput.setAttribute('value', _dateStr) : '';
});