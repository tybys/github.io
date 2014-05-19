(function ($)
{
    $(function ()
    {
        $.getJSON("javascripts/all.json", function(data)
        {

            items = [];
            $.each(data, function(key, val)
            {
                //items.push("<li id='" + key + "'>" + val + "</li>");
                items.push(key)
//                $.each(data.projectSkills, function (i, subkey)
//                {
//                    //console.log(subkey)
//                });
                console.log(data)
            });

            //$("<ul/>", {"class": "my-new-list", html: items.join("")}).appendTo("body");
//            console.log(data.projectName)
//            console.log(data.anotherProperty)
//            console.log(data.projectSkill.subkey)
            //console.log(items)
            //var projectName = $("<span/>", {html: items[0]});
            //var projectSkills = $("<span/>", {html: items[1].first});
            //var projectInfo = $("<span/>", {html: items[2]});
            //console.log(items)
            //console.log(data)
            $("tr")
                .append($("<td/>", {
//                    html: '<p>'+'projectName'+'</p>'+'<p>'+'projectInfo'+'</p>'
                }
                ));

        });
    });
})(jQuery);