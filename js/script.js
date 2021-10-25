const guessedLetters = document.querySelector(".guessed-letters"); //The unordered list where the player’s guessed letters will appear.
const guess = document.querySelector(".guess"); //The button with the text “Guess!” in it.
const letter = document.querySelector(".letter"); //The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear.
const remaining = document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.
const guessesRemaining = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); //The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again.

const word = "magnolia";
console.log(word.length);

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
    const newEntry = letter.value;
    console.log(newEntry);
    letter.value = "";
})