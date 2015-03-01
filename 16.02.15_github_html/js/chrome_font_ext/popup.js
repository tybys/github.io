function test (event)
{
    var el = document.getElementsByTagName(event.target())
    console.log(el)
}

document.addEventListener("mouseover", test, false)