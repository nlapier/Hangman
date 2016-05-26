var characters = ["WILL 'THE FRESH PRINCE' SMITH", "PHILLIP BANKS", "VIVIAN BANKS", "CARLTON BANKS", "HILLARY BANKS", "ASHLEY BANKS", "GEOFFREY", "NICKY BANKS", "JAZZ", "VY SMITH", "LISA WILKES", "JACKIE AMES"]
var wins = 0;
var validInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function getRandomInt(max) {//Returns random integer between 0 and max-1.
    return Math.floor(Math.random() * max)
}

	function startGame(){

		var currentCharacter = characters[getRandomInt(characters.length)];			
		var displayCharacter = "";
		var remainingGuesses = 10;
		var alreadyGuessed = "";
		var correct = 0;
		
		//Fills displayCharacter with the appropriate number of blanks and spaces.
		for (var i = 0; i < currentCharacter.length; i++){
			if (currentCharacter[i] === " "){
				displayCharacter += " ";
			}

			else {displayCharacter += "_"}
		}

		// Displays current character being guessed.
		document.getElementById("game").innerHTML = displayCharacter;

		// Displays the remaining number of guesses.
		document.getElementById("remainingGuesses").innerHTML = remainingGuesses;

		// Displays the letters that gave already been guessed.
		document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed;

		document.onkeyup = function(event) {

			var userInput = String.fromCharCode(event.keyCode).toUpperCase();


			//Filters non-letter keys.
			if (validInput.indexOf(userInput) === -1){
				alert ("Invalid input!")
			}

			//Filters letters that have already been guessed.
			else if (alreadyGuessed.indexOf(userInput) !==-1 || displayCharacter.indexOf(userInput) !==-1){
				alert("You already guessed that letter!")
			}

			else{
				//Loops through currentCharacter to evaluate all valid guesses.
				for (var i = 0; i < currentCharacter.length; i++){
					if (userInput === currentCharacter[i]){
						displayCharacter[i] = userInput;
						correct ++;
					}
				}
				//Handles incorrect guesses.
				if (correct === 0){
					remainingGuesses --;
					if (remainingGuesses === 0){return /*end game*/}
					alreadyGuessed += userInput;
				}

				if (displayCharacter === currentCharacter) {
					alert("You got it!")
				}
			}
		}
	}

var gamesWon = "<p> Games won:" + wins + "</p>"
document.getElementById("#gamesWon").innerHTML = gamesWon;

