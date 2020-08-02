var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var level = 0;
var start = false;
var userClickedPattern;

document.addEventListener("keypress", function () {
    if (!start) {
        $("#level-title").text("level 0");
        nextSequence();
        start = true;
    }
});
var userChosenColor;

$(".btn").click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    addButtonSound(userChosenColor);
    animatePress(userChosenColor);
    patterMatch(userClickedPattern);

});

function patterMatch(userClickedPattern) {
    var count = 0;
    for (var i = 0; i < userClickedPattern.length; i++) {
        console.log("click " + userClickedPattern[i] + "game " + gamePattern[i]);
        if (userClickedPattern[i] == gamePattern[i]) {
            var flag = "sucess"
            console.log("matched " + userClickedPattern[i] + "   " + gamePattern[i]);
            count++;
            if (count == gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }
        else {
            flag = "Failed";
            var wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
            $("h1").text("Game Over, Press any key to start");
            console.log("again play");
            startOver();
        }
    }
    console.log("finish    running ..........................")
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}

function addButtonSound(randomChosenColor) {
    var audioSequence = "sounds/" + randomChosenColor + ".mp3";
    //console.log(audioSequence);
    var audio = new Audio(audioSequence);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
    console.log("landed in start");
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //addAnimation(randomChosenColor);
    addButtonSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("random pattern " + gamePattern);
    level++;
    $("#level-title").text("Level " + level)

    //buttonHandler();
}
