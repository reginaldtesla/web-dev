var userClickedPattern = [];
var gamePatterns = [];
// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".You can now use these log statements along with logging the values
  // of userClickedPattern and gamePattern in the Chrome Developer Tools console to check whether if your code is performing
  //  as you would expect and debug your code as needed. Once you're done, feel free to remove these log statements.
  if (gamePatterns[currentLevel] === gamePatterns.length) {
    console.log("success");
    //  If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePatterns.lengh) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var cancel = new Audio("sounds/wrong.mp3");
    cancel.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    $("level-title").html("Game Over, Press A Key To Restart.");
    startOver();
    console.log("wrong");
  }
}

var buttonColors = ["red", "blue", "green", "yellow"];
function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  return randomNumber;
  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
}
var randomChosenColor = buttonColors[nextSequence()];
animatePress(randomChosenColor);
gamePatterns.push(randomChosenColor);

// select the button with the random closen color and animate a findein fadeout effect
$("#" + randomChosenColor)
  .fadeIn(100)
  .fadeOut(100)
  .fadeIn(100);
// make the button play a sound
var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
audio.play();

// check whether a btn has been clicked and store clicked button
$(".btn").click(function () {
  var userChosenColor = this.id;
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  // e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3
  checkAnswer(userClickedPattern.length - 1);
});

// users corresponding sound with respect to the button pressed

$(".btn").click(function () {
  var userChosenColor = this.id;
  var sound = new Audio("sounds/" + userChosenColor + ".mp3");
  sound.play();
  animatePress(userChosenColor);
});

// make the user clicked pattern blink (animate)

function animatePress(currentColor) {
  var activeButton = document.querySelector("." + currentColor);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
// Detecting keyboard press in jQuery to start the game with nextSequence() ans the starting point
// you'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//  Create a new variable called level and start at level 0.
var level = 0;
//  Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  nextSequence();
}
