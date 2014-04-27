(function ($)
{
    $(function ()
    {
        $.ajax({
            //url: '/works/fear/leform/leform.html',
            url: 'works/fear/leform/leform.html',
            dataType: 'jsonp'
        }).success(function (data)
        {
            console.log(data)
        })
        .error(function (data)
        {
            console.log(data)
        })
        .done(function (data)
        {
            console.log(data)
        });
    });
})(jQuery);