$(function() {
    if (localStorage.getItem("user") === null) {
        alert("YOU MUST BE LOGGED IN TO PURCHASE TOKENS")
        window.location.href = '/home';
    };

    $('#purchase-button').click(function () {
        const data = {
            username: localStorage.getItem("user"),
            tokens: $('#tokens-purchase').text()
        }

        if (confirm("Are you sure?")) {
            $.post('/update/tokens', data, function(data) {
                console.log("Updated Tokens")
            });
    
            $.post('/get/tokens', data, function(response) {
                localStorage.setItem("tokens", response.message);
                $('#tokens-header').text("TOKENS: " + response.message);
            });

            window.location.href = '/store';
        }

    });
});