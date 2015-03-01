chrome.tabs.onUpdated.addListener(function(id, info, tab)
{
	console.log(tab.url);
    var reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;





    // var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	// var regex = new RegExp(expression);
	// var t = "http://vk.com";
	
	// if (t.match(regex)) {
		// console.log(t)
	// } else {
		// console.log(0)
	// }
	
});
