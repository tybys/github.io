(function ($)
{
    $(function ()
    {
//        $.getJSON("javascripts/all.json", function(data)
//        {
//            //console.log(data)
//            var items = []
//            $.each(data, function (index, val) {
//                items.push(val)
//            })
//            console.log(items)
//
//            var name = items[0][0].name
//            var skills = items[0][0].skills
//
//
//            $('tr').append($('<td/>', {text: name}))
//        });

        var content = [
            {
                title: 'first',
                skills: 'html css',
            },
            {
                title: 'second',
                skills: 'js php',
            }
        ],
        template = $.trim($('#blogTemplate').html());

        $.each(content, function (index, obj) {
            var temp = template.replace(/{{title}}/ig, obj.title)

            $(document.body).append(temp)
        })

    });
})(jQuery);