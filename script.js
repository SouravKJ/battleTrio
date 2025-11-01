let UserName = prompt("Enter your name:").trim();
let firstWord = UserName.split(" ")[0];
// Speak the greeting after the name is entered
speak("Hello " +firstWord + ", how are you?");
let nameElements = document.getElementsByClassName("name");

for (let el of nameElements) {
  el.textContent = UserName;  // ✅ show username text
  el.style.display = "block"; // ✅ make sure visible
}
// Wait for speech to finish, then ask for condition
setTimeout(() => {
    let Condition = prompt("How are you?").trim();

    // Capitalize the first letter
    Condition = capitalize(Condition);

    // Speak based on the user's condition
    setTimeout(() => {
        if (Condition === "Good" || Condition === "Well" || Condition==="Fine") {
            speak("That's great to hear that you are good.");
            speak("Welcome to STONE PAPER SCISSOR game. Choose among Stone, Paper, or Scissor.");
        } else {
            speak("Sorry to hear that you are not well. Play your childhood game Stone Paper Scissor to brush up your memory. So, let's go!");
        }
    }, 1000); // Small delay to ensure smoother experience

}, 2000); // Delay to ensure the first speech is completed before asking the condition

// Function to capitalize the first letter
function capitalize(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
}

const choices = ["stone", "paper", "scissor"];
const countdownElement = document.getElementById("countdown");
const computerChoiceImage = document.getElementById("computer-choice-image");
let countdownInterval;

function showComputerChoice(callback) {
    let countdown = 0;

    // Clear previous choice image
    computerChoiceImage.style.display = "none";
    computerChoiceImage.src = "";
    countdownElement.textContent = ` ${choices[countdown]}`;
    countdownElement.style.display = "block"; 

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        speak(choices[countdown]);
        countdown++;
        if (countdown < 3) {
            countdownElement.textContent = `${choices[countdown]}`;
        } else {
            clearInterval(countdownInterval);
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const choiceToImage = {
                stone: "images/stone.png",
                paper: "images/paper.png",
                scissor: "images/scissor.png"
            };

            countdownElement.style.display = "none";  

            computerChoiceImage.style.display = "inline-block";
            computerChoiceImage.src = choiceToImage[computerChoice];

            callback(computerChoice);
        }
    }, 1000);
}
function playGame(userChoice) {
    const choiceToImage = {
        stone: "images/stone.png",
        paper: "images/paper.png",
        scissor: "images/scissor.png"
    };

    document.getElementById("user-choice-image").src = choiceToImage[userChoice];

    showComputerChoice((computerChoice) => {
        let result = "";
        if (computerChoice === userChoice) {
            result = "It's a tie!";
        } else if (
            (computerChoice === "stone" && userChoice === "scissor") ||
            (computerChoice === "scissor" && userChoice === "paper") ||
            (computerChoice === "paper" && userChoice === "stone")
        ) {
            result = "Computer wins!";
        } else {
            result = "You win!";
        }

        document.getElementById("result").textContent = `Result: ${result}`; // Update UI first
        speak(result);
    });
}

function resetGame() {
    clearInterval(countdownInterval);
    document.getElementById("computer-choice-image").src = "images/CHOICE1.png";
    document.getElementById("user-choice-image").src = "images/CHOICE2.png";
    document.getElementById("result").textContent = "Result: ";
    countdownElement.textContent = "";
}

// Function to convert text to speech
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN';
    speech.rate = 1.0;
    speech.pitch = 1.0;
    window.speechSynthesis.speak(speech);
}
