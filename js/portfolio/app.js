(function ($)
{
    $(function ()
    {
        $.when(ItemsBuilder).then(function ()
        {
            WindowDimensions();
        });

        function WindowDimensions()
        {
            var WindowWidth = $(window).outerWidth();
            var WindowHeight = $(window).outerHeight();
            $(".deep").css("height", WindowHeight);
        }

        $(window).on("resize", function ()
        {
            //WindowDimensions();
        });

    });
})(jQuery);

// work items "builder"
var items = [];
var ItemsBuilder =  function()
{
    $.getJSON("works.json", function(data)
    {
        count = 0;
        for (var i = 0; i < data.length; i++)
        {

            count ++;
            var oItem = new Item(data[i]);
            oItem.createSkills();

            var item = oItem.render();
            items.push(item);
        }

        //var itemsContainer = document.getElementById("items");
        //itemsContainer.innerHTML = items.join("");
    });
}();


function Item(props)
{
    this.skillz = [];

    for(var i in props)
    {
        this[i] = props[i];
    }

    this.createSkills = function()
    {
        var skills = this.skills.split(",");
        for (var j = 0; j < skills.length; j ++)
        {
            var oSkill = new Skill(skills[j]);
            var span = oSkill.createElement();

            this.skillz.push(span);
        }
    };

    var an = this.appname; // app name
    var l = (this.logotype?"<img src='" + this.logotype + "'>":''); // logotype
    var u = this.prod_url;
    var s = this.skillz.join('');
    var d = this.description;

    this.render = function()
    {
        return "<div id='group"+ count +"' class='group "+ an +"'>"+
        //"<div class='layer deep'></div>" +
        "<div class='layer fore'><div class='title'>"+s + l+"</div></div>" +
        "<div class='layer base'><div class='title'></div></div>" +
        //"<div class='layer back'><div class='title'>"+s+"</div></div>" +
        "<div class='layer deep'><div class='title'>"+d+"</div></div>" +
        "</div>";
    }
}

function Skill(name)
{
    this.name = name.replace(' ', '');
    this.checkName = function()
    {
        return !!this.name;
    };

    this.createElement = function()
    {
        if(this.checkName())
        {
            return "<span>"+ this.name +"</span>";
        }
    };
}