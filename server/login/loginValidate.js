var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

/*global document require*/

var isLoginSuccess = false;

function validateLogin(username, password) {

    // Idea is that on first startup the username and password will be generated and will be read from a file that is hidden.
    if ( username == "username" && password == "password") {
        alert ("Login successfully");
        console.log("Success");
        isLoginSuccess = true;
        return true;
    }
    else { 
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempts left");
        // Disabling fields after 3 attempts.
        checkIfLastAttempt();
       // window.location.href = "index.html";
    }   
}

function checkIfLastAttempt() {
    if( attempt == 0) {
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("submit").disabled = true;
        return false;
    }
}

function wasLoginSuccessful() {
    return isLoginSuccess
}

module.exports = {
    wasLoginSuccessful
}