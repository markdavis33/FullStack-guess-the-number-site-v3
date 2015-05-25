/*jshint strict:false, devel:true */
/*global $:false */

//Start app.js when the DOM is "ready": 
$(document).ready(function() {

    //At the beginning of each game, create two things
    //A random number between 1-100, which will be the answer for this game 
    var answer = $(Math.floor((Math.random() * 100) + 1));
    //An empty array to store the user's guesses for this game
    var myGuessesArray = [];
    //A variable to track the number of guesses for this game
    var numberOfGuesses = 0;


    //Ceate an HTML-based interface for getting user inputs and giving feedback on guesses

    //The user submits their guess by pressing enter or clicking the submit button
    $("#submit").on("click", function() {

        //create a new variable and assign it the value that was entered
        var myNewGuess = $("#myNewGuess").val();

        //Run three validation checks on the guess:

        //1. Validate that the input is a real number between 1-100
        if (myNewGuess < 1 || myNewGuess > 100) {
            alert("Please enter a real number between 1 and 100");
            return false;
        }

        //2. Validate that the input is not a repeat
        // if (myGuessesArray.indexOf(myNewGuess) === -1) {
        // 	alert("You already guessed that number!");
        // 	return false;
        //};

        //3. Validate to see if the user guessed the right answer
        if (myNewGuess === answer) {
            //Change the background color, add an image, or do something creative 	
            $("youwin").addClass("youWinSuccessMessageOn");
            return false;
        }

        //If we make it through those validation checks, continue with the rest of the program 

        //Store the new guess in the array
        myGuessesArray.push(myNewGuess);

        //Increment the number of guesses by 1
        numberOfGuesses = numberOfGuesses + 1;

        //calculate how much higher the guess is than the answer (this can be a negative number)
        var howFarOver = myNewGuess - answer;

        //Calculate if the guess is "hot", "warm" or "cold"
        //calculate the absolute value of howFarOff and store it in a variable
        var howFarOverAbsolute = Math.abs(howFarOver);
      	var hotWarmCold = "";
//BUG #1: IT ALWAYS SAYS I'M COLD, NEVER HOT OR WARM:
        if (howFarOverAbsolute < 10) {
            hotWarmCold = "hot";
        } else if (howFarOverAbsolute < 90) {
            hotWarmCold = "warm";
        } else {
            hotWarmCold = "cold";
        }


//BUG #2: IT ALWAYS SAYS I NEED TO GUESS HIGHER:
        var higherOrLower = "";
        if (myNewGuess < answer) {
            higherOrLower = "higher";
            //otherwise I need to guess lower
        } else {
            higherOrLower = "lower";
        }

        //Let the user know if they are getting warmer or colder, and if they need to guess higher or lower.
        var guessLogMessage = "Your guess of " + myNewGuess + " was " + hotWarmCold + ". You should guess " + higherOrLower + ".";

        if (numberOfGuesses === 1) {
            $("#guessLog1").append(guessLogMessage);                  
        } else if (numberOfGuesses === 2) {
            $("#guessLog2").append(guessLogMessage);                
        } else if (numberOfGuesses === 3) {
            $("#guessLog3").append(guessLogMessage);                 
        } else if (numberOfGuesses === 4) {
            $("#guessLog4").append(guessLogMessage);                  
        } else {
            //if the user has now made his 5 guesses, then the game is over

//BUG #3: ON THE SCREEN IT'S DISPLAYING: 
//"Your guess of 100 was cold. You have now used up your 5 guesses, so this game is now over. The answer was [object Object]."
//It should display the answer instead of "[object bject]"
            var guessLogMessageLast = "Your guess of " + myNewGuess + " was " + hotWarmCold + ".  You have now used up your 5 guesses, so this game is now over. The answer was " + answer + "."; //
            $("#guessLog5").append(guessLogMessageLast); 
//BUG #4: NEED TO MAKE THE GAME STOP AT THIS POINT:                
            return false;
        }

        //Create a button that provides the answer (Give me a Hint).
        $("#giveHint").click(function() {
//BUG #5: NEED TO FIX THE "object Object" ERROR HERE TOO:
            alert("The answer was " + answer + ". This game is now over...but feel free to play again by clicking the 'New Game' button.");
            return false;
        });

    });

//BUG #6: THIS IS NOT WORKING, IS THERE A BETTER WAY?
        //Create a "new game" button that resets the game:
        $("#newGame").click(function() {
            answer = $(Math.floor((Math.random() * 100) + 1));
            myGuessesArray = [];
            $("youwin").removeClass("youWinSuccessMessageOn");
            $("youwin").addClass("youWinSuccessMessageOff");
            alert("The game has started over.  Enter your first guess!");
        });

});