var items = [];
$.getJSON("works.json", function(data)
{
    for (var i = 0; i < data.length; i++)
    {
        var oItem = new Item(data[i]);
        oItem.createSkills();

        var item = oItem.render();
        items.push(item);
    }

    var itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = items.join("");
});

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

    this.render = function()
    {
        return "<div class='item'>"+
            "<h2>" + this.appname + "</h2>" +
            (this.logotype?"<img src='" + this.logotype + "'>":'') +
            "<a target='_blank' alt='' href='"+ this.prod_url +"'>" + this.prod_url + "</a>" +
            "<p>" + this.skillz.join('') + "</p>" +
            "<p>" + this.description + "</p>" +
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