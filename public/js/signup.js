$(function() {
    $('#sign-up-button').click(function () {
        const data = {
            email: $('#email-signup').val(),
            username: $('#username-signup').val(),
            password: $('#password-signup').val()
        }
    
        $.post('/signup/user', data, function(response) {
            console.log(response.message);
            if (response.message === "Success") {
                $.post('/get/tokens', data, function(response) {
                    localStorage.setItem("tokens", response.message);
                });
                localStorage.setItem("user", data.username);
                console.log("'user' key set to: " + data.username);
                alert("Your account has been successfully created! Please enjoy 5 FREE tokens as part of our GRAND OPENING!")
                window.location.href = "/home";
            }
            else if (response.message === "Duplicate Username") {
                alert("That username already exists");
            }
        });
    });
});