window.addEventListener("load", function () {
	chrome.tabs.getSelected(null, function (tab) {
		var link = document.createElement("a");
		link.href = tab.url;
		document.getElementById("host").html("host: " + link.hostname);
	});
});

$(document).ready(function () {
	alert("jquery");
});