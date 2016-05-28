$(document).ready(function(){

	var characters = ["WILL 'THE FRESH PRINCE' SMITH", "PHILIP BANKS", 
	"VIVIAN BANKS", "CARLTON BANKS", "HILLARY BANKS", "ASHLEY BANKS", 
	"GEOFFREY", "NICKY BANKS", "JAZZ", "VY SMITH", "LISA WILKES", "JACKIE AMES"]
	var wins = 0;
	var validInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	function getRandomInt(max) {//Returns random integer between 0 and max-1.
	    return Math.floor(Math.random() * max)
	}

	//Creates an alert box
	function alertBox(message){
		$("#infoDiv").append(
			"<div class = 'alert alert-warning alert-dismissable' role='alert' id=alertBox>" +
			"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
			"<span aria-hidden='true'>&times;</span></button>" +
				message +
			"</div>"
			)
	//Makes alert box disappear after 5 seconds
	window.setTimeout(function(){
	    $("#alertBox").fadeTo(500, 0).slideUp(500, function(){
	        $(this).remove(); 
	    	});
		},5000)
	}

	//Letter replacement function, used to display correctly guessed letters
	String.prototype.replaceAt = function(index, letter) {
	    return this.slice(0, index) + letter + this.slice(index+letter.length);
	}

	// Start game button
	$("#startButton").button().click(function(){

		var characterIndex = getRandomInt(characters.length);
		var currentCharacter = characters[characterIndex];			
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

			//correct is a counter variable, used by the for loop below
			var correct = 0;
			console.log("correct:" + correct);

			var userInput = String.fromCharCode(event.keyCode).toUpperCase();
			console.log(userInput)

			if (validInput.indexOf(userInput) === -1){
				alertBox("Invalid input, Homes!")
				console.log("Invalid")
			}

			//Filters letters that have already been guessed.
			else if (alreadyGuessed.indexOf(userInput) !==-1 || displayCharacter.indexOf(userInput) !==-1){
				alertBox("Yo, you already guessed that letter!");
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

				}
				console.log("correct:" + correct);
				console.log("displayCharacter: " + displayCharacter);
				console.log("currentCharacter: " + currentCharacter)

			}
		
			//Game over logic
			if (remainingGuesses < 1){
				console.log("Game over")
				return alertBox("Yo Homes, smell ya later! \n GAME OVER.")
			}

			//User win logic
			if (displayCharacter === currentCharacter) {
				wins++;
				document.getElementById("gamesWon").innerHTML = wins;
				console.log("Won!")
				return 	alertBox("You got it!");
			}
		}
	})
})





