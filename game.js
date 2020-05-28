var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// Keep track of whether if the game has started or not
// so you only call nextSequence() on the first keypress.
var started = false;

// Track game level starting at level 0.
var level = 0;

// Detect when a keyboard key has been pressed.
// When that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    // Change h1 title from "Press A Key to Start" to say "Level 0" when the game has started.
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // Store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  // Add the userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);

});

function checkAnswer(currentLevel) {

  // Check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // If the user got the most recent answer right in step 3,
    // then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

function nextSequence() {

  userClickedPattern = [];

  // increase the level by 1 every time nextSequence() is called.
  level++;

  // update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // Generate a random number and a random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate button using fade in/out
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound
  playSound(randomChosenColour);

}

function playSound(name) {

  // Play sound for button
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  // Add class "pressed" to active button
  $("#" + currentColour).addClass("pressed");

  // Pause briefly, then remove Add class "pressed" from active button
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
