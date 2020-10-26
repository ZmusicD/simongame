var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameHasStarted = false;
var level = 0;

$(document).keydown(function() {
  if (!gameHasStarted) {
    gameHasStarted = true;
    nextSequence();
    $("h1").text("Level " + level);
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {nextSequence();}, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gameHasStarted = false;
  level = 0;
  gamePattern = [];
}
