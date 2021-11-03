const guessedLettersHolder = document.querySelector(".guessed-letters"); //The unordered list where the player’s guessed letters will appear.
const guess = document.querySelector(".guess"); //The button with the text “Guess!” in it.
const letter = document.querySelector(".letter"); //The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear.
const remaining = document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.
const guessesRemaining = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); //The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again.

//FETCH AND ASSIGN RANDOM WORD FROM API
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordBank = await response.text();
    const wordList = wordBank.split("\n");
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = (wordList[randomIndex]).trim();
    word = randomWord;
    setPlaceholder(word);
    console.log(wordList[randomIndex]);
};

getWord();


let remainingGuesses = 8;
guessedLetters = [];

//REPLACE LETTERS WITH CIRCLES
const setPlaceholder = function (word) {
    for (let alphabet of word) {
        wordInProgress.innerText += "●";
    }
    console.log(wordInProgress);
};


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
        message.innerText = "Wrong guess. Try again!";
    } else {
        return input;
    };
};

//ADD GUESSES TO GUESSEDLETTERS VARIABLE
const makeGuess = function (anyLetter) {
    anyLetter = anyLetter.toUpperCase();
    console.log(anyLetter);
    if (guessedLetters.includes(anyLetter)) {
        message.innerText = "You have already guessed this letter.";
        console.log(message.innerText);
    } else {
        guessedLetters.push(anyLetter);
        console.log(guessedLetters);
        updateGuessCount(anyLetter);
        showGuessedLetters();
        updateWord(guessedLetters);
    };
};

//SHOW GUESSED LETTERS
const showGuessedLetters = function () {
    guessedLettersHolder.innerHTML = "";
    for (let item of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = item;
        console.log(li);
        guessedLettersHolder.append(li);
    };
};

//UPDATE THE WORD IN PROGRESS
const updateWord = function (guessedLetters) {
    let wordUpper = word.toUpperCase();
    let wordArray = wordUpper.split("");
    const revealWord = [];
    for (let item of wordArray) {
        if (guessedLetters.includes(item)) {
            console.log(item.toUpperCase());
            revealWord.push(item.toUpperCase());
        } else {
            revealWord.push("●");
        };
    };
    wordInProgress.innerText = revealWord.join("");
    winOrLose();
};

//COUNT REMAINING GUESSES
const updateGuessCount = function (newInput) {
    let wordUpper = word.toUpperCase();
    if (wordUpper.includes(newInput)) {
        message.innerText = "You have guessed a correct letter!!";
        remainingGuesses -= 1;
    } else {
        message.innerText = "You have made a wrong guess!!";
        remainingGuesses -= 1;
    };
    if (remainingGuesses === 0) {
        message.innerText = `GAMEOVER!!! Our secret word is ${wordUpper}!!!`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesRemaining.innerText = "1 guess";
    } else {
        guessesRemaining.innerText = `${remainingGuesses} guesses`;
    };
};

//CHECK IF PLAYER HAS WON OR LOST THE GAME
const winOrLose = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    };
};


//RESTART OR REPLAY GAME
const startOver = function () {
    guess.classList.add("hide");
    guessedLettersHolder.classList.add("hide");
    remaining.classList.add("hide");
    playAgain.classList.remove("hide");
};


playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLettersHolder.innerText = "";
    message.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    wordInProgress.innerText = "";
    guessesRemaining.innerText = `${remainingGuesses} guesses`;
    guess.classList.remove("hide");
    guessedLettersHolder.classList.remove("hide");
    remaining.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
})