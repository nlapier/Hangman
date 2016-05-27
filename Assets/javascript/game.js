var characters = ["WILL 'THE FRESH PRINCE' SMITH", "PHILLIP BANKS", 
"VIVIAN BANKS", "CARLTON BANKS", "HILLARY BANKS", "ASHLEY BANKS", 
"GEOFFREY", "NICKY BANKS", "JAZZ", "VY SMITH", "LISA WILKES", "JACKIE AMES"]
var wins = 0;
var validInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function getRandomInt(max) {//Returns random integer between 0 and max-1.
    return Math.floor(Math.random() * max)
}

function alertBox(message){
	return "<div class = 'alert alert-warning alert-dismissable' role='alert' id='alertDiv'>"
	+ message + "</div"
}

String.prototype.replaceAt = function(index, character) {
    return this.slice(0, index) + character + this.slice(index+character.length);
}

	function startGame(){

		var currentCharacter = characters[getRandomInt(characters.length)];			
		var displayCharacter = "";
		var remainingGuesses = 10;
		var alreadyGuessed = "";
		
		console.log(currentCharacter);
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

		//Displays total games won.
		document.getElementById("gamesWon").innerHTML = wins;

		document.onkeyup = function(event) {

			var correct = 0;
			console.log("correct:" + correct);

			var userInput = String.fromCharCode(event.keyCode).toUpperCase();
			console.log(userInput)


			//Filters non-letter keys.
			if (validInput.indexOf(userInput) === -1){
				$("#alertDiv").html(alertBox("Invalid input, Homes!"))
				console.log("Invalid")
			}

			//Filters letters that have already been guessed.
			else if (alreadyGuessed.indexOf(userInput) !==-1 || displayCharacter.indexOf(userInput) !==-1){
				alert("Yo, you already guessed that letter!");
				console.log("Guessed")
			}

			else{
				//Loops through currentCharacter to evaluate all valid guesses.
				for (var i = 0; i < currentCharacter.length; i++){
					if (userInput === currentCharacter[i]){
						displayCharacter = displayCharacter.replaceAt(i, userInput);
						document.getElementById("game").innerHTML = displayCharacter;
						correct ++;
					}
				}
				console.log("loop")

				//Handles incorrect guesses.
				if (correct === 0){
					//Updates remainingGuesses and its corresponding html panel
					remainingGuesses --;
					document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
					//Updates alreadyGuessed and its corresponding html panel
					alreadyGuessed += userInput;
					document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed;
					console.log(alreadyGuessed)

					//Ends the game if the user is out of guesses
					if (remainingGuesses < 1){return alert("Yo Homes, smell ya later!")}
				}

				if (displayCharacter === currentCharacter) {
					wins++;
					return 	alert("You got it!");
				}
				console.log("correct:" + correct);
				console.log(displayCharacter);
				console.log("Remaining guesses:" + remainingGuesses)
			}
		}
	}


