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