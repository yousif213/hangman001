const letters = "abcdefghijklmnopqrstuvwx  yz  ";

// Get array from letters
let letterArray = Array.from(letters);

// Select letters container
let lettersContainer = document.querySelector(".letters");

// Generate letters buttons
letterArray.forEach(letter => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object of words
const words = {
  programming: [
    "python", "ruby", "swift", "kotlin", "fortran", "haskell", "matlab", "elixir", "ocaml", "scala",
    "rust", "csharp", "cobol", "bash", "lua", "sql", "perl", "groovy", "dart", "javafx",
    "typescript", "verilog", "julia", "fsharp", "cMake", "android", "kotlinx", "cocoa", "xamarin", "flutter",
    "angular", "reactjs", "jquery", "nodejs", "aspnet", "cordova", "docker", "kubernetes", "graphql", "redux",
    "spring", "hibernate", "django", "rails", "flask", "electron", "svelte", "tailwind", "webpack", "babel",
  ],
  movies: [
    "inception", "gladiator", "avatar", "titanic", "shrek", "dunkirk", "coco", "paris13th", "psycho", "rocky",
    "fargo", "hercules", "ocean", "frozen", "chariot", "titanic", "gravity", "maleficent", "jabberwocky", "casablanca",
  ],
  animals: [
    "elephant", "tiger", "zebra", "kangaroo", "giraffe", "penguin", "otter", "lemur", "rhino", "buffalo",
    "mongoose", "jaguar", "panther", "viper", "cobra", "falcon", "parrot", "squirrel", "hamster",
  ],
  food: [
    "pizza", "burger", "sushi", "tacos", "paella", "omelet", "quinoa", "ramen", "bagel", "falafel",
    "pancake", "cactusfruit", "sashimi", "cheesecake", "lasagna", "nachos", "risotto", "curry", "dumpling", "tortilla",
  ],
  // ... other categories as you had them
};

// Get random property and word
let allKeys = Object.keys(words);
let randomProp = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomProp];
let randomVal = words[randomPropName];
let randomNumVal = Math.floor(Math.random() * randomVal.length);
let randomValVal = randomVal[randomNumVal];

// Set category info
document.querySelector(".game-info .catagory span").innerHTML = randomPropName;

// Select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert chosen word to array
let lettersAndSpace = Array.from(randomValVal);

// Create spans for guess letters
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpan = document.querySelectorAll(".letters-guess span");

// Wrong attempts counter
let wrongAttempts = 0;

// Select the hangman draw element
let theDraw = document.querySelector(".hangman-draw");

// Click event listener
document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theclicked = e.target.innerHTML.toLowerCase();
    let theChosen = Array.from(randomValVal.toLowerCase());

    theChosen.forEach((wordLetter, wordIndex) => {
      if (theclicked === wordLetter) {
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
            theStatus = true;
          }
        });
      }
    });

    if (!theStatus) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("failed").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();

      // Check if all letters guessed (no empty spans)
      const allFilled = Array.from(guessSpan).every(span => span.innerHTML !== "");

      if (allFilled) {
        winGame();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End game function (lose)
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word Is "${randomValVal}". You couldn't save him.`);
  div.appendChild(divText);
  div.className = 'popup';
  document.body.appendChild(div);
}

// Win game function
function winGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Congratulations! You guessed the word: "${randomValVal}"`);
  div.appendChild(divText);
  div.className = 'popup';
  document.body.appendChild(div);
}
let own = document.getElementById("own");

own.addEventListener("click", function() {
  window.open("https://www.instagram.com/yousif_kawa_/", "_blank"); 
});
