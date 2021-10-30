const guessedLettersHolder = document.querySelector(".guessed-letters"); //The unordered list where the player’s guessed letters will appear.
const guess = document.querySelector(".guess"); //The button with the text “Guess!” in it.
const letter = document.querySelector(".letter"); //The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear.
const remaining = document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.
const guessesRemaining = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); //The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again.

const word = "magnolia";
guessedLetters = [];

//REPLACE LETTERS WITH CIRCLES
const play = function (word) {
    for (let alphabet of word) {
        wordInProgress.innerText += "●";
    }
    console.log(wordInProgress);
};

play(word);


guess.addEventListener("click", function (e) {
    e.preventDefault();
    const newInput = letter.value;
    message.innerText = "";
    const newGuess = validateInput(newInput);
    console.log(newGuess);
    makeGuess(newGuess);
    letter.value = "";
});

//VALIDATE USER'S INPUT
const validateInput = function (input) {
    //ENSURE THAT INPUT IS A LETTER
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You must enter a letter to continue playing the game";
    } else if (input.length > 1) {
        message.innerText = "You have entered two or more letters. Please enter only ONE letter to continue playing the game";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Wrong guess. Try again!"
    } else {
        return input;
    };
};


const makeGuess = function (anyLetter) {
    anyLetter = anyLetter.toUpperCase();
    console.log(anyLetter);
    if (guessedLetters.includes(anyLetter)) {
        message.innerText = "You have already guessed this letter.";
        console.log(message.innerText);
    } else {
        guessedLetters.push(anyLetter);
        console.log(guessedLetters);
    };
};