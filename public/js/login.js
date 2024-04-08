$(function() {
    $('#login-button').click(function () {
        const data = {
            username: $('#username-login').val(),
            password: $('#password-login').val()
        }

        $.post('/login/user', data, function(response) {
            console.log(response.message);
            if (response.message === "Success") {
                $.post('/get/tokens', data, function(response) {
                    localStorage.setItem("tokens", response.message);
                });
                localStorage.setItem("user", data.username);
                console.log("'user' key set to: " + data.username);
                window.location.href = "/home";
            }
            else if (response.message === "User Not Found" || response.message === "Incorrect Password") {
                alert("Username or password is incorrect");
            }
        });
    });
});