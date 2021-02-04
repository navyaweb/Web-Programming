let userscore = 0;  //creating two variables user score and computer score
let computerscore = 0;

// getting values from the html file
const userscore_span = document.getElementById("user-score");
const computerscore_span = document.getElementById("computer-score");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");

// creates a function for computer choices

function getcomputerchoice() {
    const choices = ['r', 'p', 's'];
    const randomnumber = Math.floor(Math.random() * 3);  // Math.floor is used for whole numbers Math.random is used to show random numbers between 0 and 1
    return choices[randomnumber]; // r = 0 , p =  1 ,
}

// converting letters to words
function convertword(letter) {
    if (letter === "r") return "Rock";
    else if (letter === "p") return "Paper";
    else return "Scissors"
}

// creating win lose and draw functions for the switch case
function win(userchoice, computerchoice) {
    userscore++;
    userscore_span.innerHTML = userscore;   // innerHTML overwrites the obtained html data
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(userchoice)}  - ${convertword(computerchoice)} <br> you win.`; // `` are used so there is no need for "" and + function

}

function lose(userchoice, computerchoice) {
    computerscore++;
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(computerchoice)}  -  ${convertword(userchoice)} <br> you lose.`;  // $ is used for the converting function

}

function draw(userchoice, computerchoice) {
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(computerchoice)}  ties  ${convertword(userchoice)} <br> It's a draw.`;

}


function game(userchoice) {
    const computerchoice = getcomputerchoice();

    // switch case used to identify the win lose or  draw
    switch (userchoice + computerchoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userchoice, computerchoice);
            console.log("user wins");     // shows data in the console
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userchoice, computerchoice);
            console.log("user loses");
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userchoice, computerchoice);
            console.log("Drawww");
            break;
    }
}

function main() {
    rock_div.addEventListener('click', function () {
        console.log("hey clicked rock");
        game("r");
    })
    paper_div.addEventListener('click', function () {
        console.log("hey clicked paper");
        game("p");
    })
    scissor_div.addEventListener('click', function () {
        console.log("hey clicked scissor");
        game("s");
    })

}

main();
