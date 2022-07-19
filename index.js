/* --------------------------------------------------------------------------- */
/* roadmap or logic for the web game */
/* start coding for this partcular portion here: */
/* --------------------------------------------------------------------------- */
/* variables */
var playing = false;
var score = 0;
var action;
var timeRemaining;
var correctAnswer;

// click on start/reset button
document.getElementById("start-reset").onclick = function () {
    // if we are playing:

    if (playing == true) { // yes
        // reload the page (start to reset or reset to start)
        location.reload();
    } else { // no
        // changing playing mode from false to true so that after clicking Reset Game instant dive in Start Game or vice-versa.
        playing = true;

        // score is initialized to zero
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        // show coundown box
        show("timeRemaining");

        // reduce time by one second
        timeRemaining = 60;
        document.getElementById("remainingValue").innerHTML = timeRemaining;

        // hide game over div
        hide("gameOver");

        // change reset button to start button
        document.getElementById("start-reset").innerHTML = "Reset Game";

        // start coundown
        startCountdown();

        // generate Q&A
        generateQA();
    }
}

// if we click on answer box:
for (i = 1; i <= 4; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (this.innerHTML == correctAnswer) { // yes
            // increase score
            score++;
            document.getElementById("scoreValue").innerHTML = score;

            // show correct box for one second
            show("correct");
            hide("tryAgain");
            setTimeout(function () {
                hide("correct");
            }, 1000);

            // generate new question
            generateQA();
        } else { // no
            hide("correct");
            show("tryAgain");
            setTimeout(function () {
                hide("tryAgain");
            }, 1000);
        }
    }
}

/* functions */
/* start count down */
function startCountdown() {
    action = setInterval(function () {
        // yes-> continue reducing using loop
        // no-> show game over message
        timeRemaining -= 1;
        document.getElementById("remainingValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCountdown();
            // show game over div
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your Score is " + score + ".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("tryAgain");

            // change reset button to start button
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000);
}

/* stop count down */
function stopCountdown() {
    clearInterval(action);
}

/* show a certain element */
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

/* hide a certain element */
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

/* generate a question and multiple answers */
function generateQA() {
    // create randon number between 1 and 10
    var x = Math.round(1 + 9 * Math.random());
    var y = Math.round(1 + 9 * Math.random());

    // set them to the place
    document.getElementById("questionBox").innerHTML = x + 'x' + y;

    correctAnswer = x * y;
    var correctPosition = Math.round(1 + 3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    var wrongAnswer;
    var answer = [correctAnswer];
    for (i = 1; i <= 4; ++i) {
        if (i != correctPosition) {
            do {
                wrongAnswer = ((Math.round(1 + 9 * Math.random())) * Math.round(1 + 9 * Math.random()));
                document.getElementById("box" + i).innerHTML = wrongAnswer;
            } while (answer.indexOf(wrongAnswer) > -1);
            answer.push(wrongAnswer);
        }
    }
}
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */