var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validateLogin() {
    var username = document.getElementsByName("username").value;
    var password = document.getElementsByName("password").value;

    // Idea is that on first startup the username and password will be generated and will be read from a file that is hidden.
    if ( username == "username" && password == "password") {
        alert ("Login successfully");
        console.log("Success");
        window.location = "mainScreen/mainPage.html"; // Redirecting to other page.
        return false;
    }
    else { 
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempts left");
        // Disabling fields after 3 attempts.
        if( attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
        window.location = "index.html";
    }   
}

module.exports = {
    validateLogin
}