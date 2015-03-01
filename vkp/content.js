window.addEventListener("load", function() {
	
})

window.addEventListener("keydown", function (event)
{
	/* 111
	* 106
	* 109
	*/ 	
	var bnext = document.getElementsByClassName("next ctrl")
	
	if (event.keyCode == 106) 
	{
		bnext[0].click();
	}	
});

