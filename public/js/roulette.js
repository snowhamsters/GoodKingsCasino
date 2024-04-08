$(function() {
    if (localStorage.getItem("user") === null) {
        alert("YOU MUST BE LOGGED IN TO PLAY")
        window.location.href = '/home';
    };

    const data = {
        username: localStorage.getItem("user"),
    };
    $.post('/get/tokens', data, function(response) {
        localStorage.setItem("tokens", response.message);
    });

    // European wheel so it doesn't have 00
    let pockets = 37; // 0 to 36
    let singleRotation = 360/pockets;
    let rouletteWheelNumbers = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13,
        36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
        14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    let selectedValue = "";

    let isSpinning = false;
    $('.roulette-red, .roulette-black, .roulette-green').click(function() {
        // Lock the player out from changing their bet while spinning
        if (!isSpinning) {
            $('.selected-bet').removeClass('selected-bet');
            $(this).addClass('selected-bet');
            selectedValue = $(this).data('value');
        }
    });

    $('#spin-button').click(function () {
        // Get the number of tokens the user wants to bet
        let tokensBet = $('#bet-amount').val();
        // Error checking if the user set a bet
        if (tokensBet === "" || selectedValue === "") {
            alert("Select a bet type and enter the number of tokens to bet!")
            return null;
        }
        // Error checking if the user has enough tokens
        if (parseInt(tokensBet) > parseInt(localStorage.getItem("tokens"))) {
            alert("You don't have enough tokens!");
            return null;
        }
        // If the bet is below 1
        if (tokensBet < 1) {
            alert("Enter a bet greater than 0!")
            return null;
        }
        // Lock the player from changing bets
        isSpinning = true;
        $('#bet-amount')[0].disabled = true;

        let rng = Math.floor(Math.random() * pockets);
        let endPocket = rouletteWheelNumbers[rng];

        // anime.js for a smooth wheel spin animation
        anime({
            targets: '#roulette-wheel',
            rotate: -(rng * singleRotation),
            duration: 2000,
            easing: 'cubicBezier(.5, .05, .1, .3)',
            complete: function(anim) {
                // Calculate the profit and then call spinCompleted(profit)
                tellThemToBringMeMyMoney(selectedValue, endPocket, tokensBet);
                // Allow the player to change bets again
                isSpinning = false;
                $('#bet-amount')[0].disabled = false;
            }
        });
    });

});

// Function used to calculate profit after a spin
function tellThemToBringMeMyMoney(selectedValue, endPocket, tokensBet) {
    let multiplier = -1;

    switch (selectedValue) {
        case "red":
            if ((endPocket % 2 === 1 && (endPocket < 10 || (endPocket > 18 && endPocket < 28))) ||
                (endPocket % 2 === 0 && ((endPocket > 11 && endPocket < 19) || endPocket > 29))) {
                multiplier = 1;
            }
            break;
        case "black":
            if ((endPocket % 2 === 0 && (endPocket < 11 || (endPocket > 19 && endPocket < 29))) ||
                (endPocket % 2 === 1 && ((endPocket > 10 && endPocket < 18) || endPocket > 28))) {
                multiplier = 1;
            }
            break;
        case "even":
            if (endPocket % 2 === 0) {
                multiplier = 1;
            }
            break;
        case "odd":
            if (endPocket % 2 === 1) {
                multiplier = 1;
            }
            break;
        case "1to18":
            if (endPocket > 0 && endPocket < 19) {
                multiplier = 1;
            }
            break;
        case "19to36":
            if (endPocket > 18) {
                multiplier = 1;
            }
            break;
        case "1st12":
            if (endPocket > 0 && endPocket < 13) {
                multiplier = 2;
            }
            break;
        case "2nd12":
            if (endPocket > 12 && endPocket < 25) {
                multiplier = 2;
            }
            break;
        case "3rd12":
            if (endPocket > 24) {
                multiplier = 2;
            }
            break;
        case "2to1-1":
            if (endPocket % 3 === 0) {
                multiplier = 2;
            }
            break;
        case "2to1-2":
            if (endPocket % 3 === 2) {
                multiplier = 2;
            }
            break;
        case "2to1-3":
            if (endPocket % 3 === 1) {
                multiplier = 2;
            }
            break;
        default: // If selectedValue is 0-36
            if (endPocket === parseInt(selectedValue)) {
                multiplier = 35;
            }
            break;
    }

    spinCompleted(tokensBet * multiplier);
}

// Function used to update the player's tokens in the database
function spinCompleted(tokensProfit) {
    console.log(tokensProfit)

    const data = {
        username: localStorage.getItem("user"),
        tokens: tokensProfit
    }

    $.post('/update/tokens', data, function(data) {
        console.log("Updated Tokens")
    });

    if (tokensProfit > 0) {
        alert("Lucky, you have gained: " + tokensProfit + " tokens.")
    }
    else {
        alert("Unlucky, you have lost: " + -tokensProfit + " tokens.")
    }

    $.post('/get/tokens', data, function(response) {
        localStorage.setItem("tokens", response.message);
        $('#tokens-header').text("TOKENS: " + response.message);
    });
}