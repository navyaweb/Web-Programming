function getGithubInfo(user) {
    console.log(user);
    // Create an instance of XMLHttpRequest class and send a GET request .
    var xhttp =new XMLHttpRequest();
    var url = "https://api.github.com/users/"+user;
    xhttp.open('GET',url);
    xhttp.onload = function () {
        //if the response is successful it  shows the git hub user's details
        if (xhttp.status == 200) {
            console.log(xhttp);
            showUser(JSON.parse(xhttp.responseText));
            //else error message is displayed
        } else if(xhttp.status==404) {
            noSuchUser(user);
        }
    };
    xhttp.send()
}
function showUser(user) {
   console.log(user);
//  elements in page using jQuery
    $("#displaytext").text(user.login);
    $(".avatar").html("<img height='200' width='200' src='"+ user.avatar_url+"'/>");
    var link = "<a target='_blank' href='"+user.html_url+"'> Git Hub URL  </a>";
    $(".information").html("<label><u><strong>User Information</strong></u></label>" +
        "<br/><br/><label style='color: #660939'>Login Name : </label>"+ user.login
        +"<br/><label style='color: #661d22'> Login ID : </label>"+ user.id
        +"<br/><label style='color: #66111c'>GitHub URL : </label>"+link
        +"<br/><label style='color: #661d22'> Followers : </label>"+user.followers
        +"<br/><label style='color: #661d22'>  Following: </label>"+user.following
        +"<br/><label style='color: #661d36'>Repositories Of User : </label>"+ user.public_repos);
    $("#profile").show();
}
function noSuchUser(username) {
    // message is displayed
    $("#displaytext").text(" username " +username + "does not exists");
    console.log("no such user");
    $(".avatar").text(" username " +username + " does not exists ");
    $(".information").html('');
    $("#profile").show();
}
$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        $("#profile").hide();
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            $(this).val("");
            //get the user's information
            getGithubInfo(username);
        }
    })
});