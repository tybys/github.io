function injected_main() {

    var forms = $("form");

//    var arr = []
//    for (var i = 0; i < forms.length; i++) {
//        var formName = forms[i].className.split(" ", 1);
//
//        arr.push(formName)
//
//    }

    $("body").click(function (e) {

        //e.target == $('input') ? alert("yes") : alert("no")
        console.log(e.target);
        e.preventDefault();
    });

}