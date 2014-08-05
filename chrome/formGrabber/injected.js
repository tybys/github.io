function injected_main() {

    var forms = $("form");

//    var arr = []
//    for (var i = 0; i < forms.length; i++) {
//        var formName = forms[i].className.split(" ", 1);
//
//        arr.push(formName)
//
//    }

    $("<div id='info' />").css({
        background: "#000000",
        color: "#ffffff",
        position: "fixed",
        top: "5%",
        left: "10%",
        padding: 5,
        border: "1px solid gray",
        borderRadius: 5
    }).appendTo("body");

    $("body").click(function (e) {
        $("<div/>",
            {
                "id": e.target.tagName,
                html: (e.target.hasAttribute("id") ? "#" +  e.target.getAttribute("id") : "#empty")
            }
        ).appendTo("#info");

        console.log(e.target)
        e.preventDefault();
    });

}