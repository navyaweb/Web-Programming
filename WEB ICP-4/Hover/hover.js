function upDate(hoverimg) {
    var src = hoverimg.getAttribute( "src" );
    var alt = hoverimg.getAttribute( "alt" );
    document.getElementById('image').style.backgroundImage = "url('" + src + "')";
    document.getElementById('image').innerHTML = alt;
}
function unDo() {
    X = document.getElementById('image');
    X.style.backgroundImage = "url('')";
    document.getElementById('image').innerHTML = "Hover over image to display here";
}
