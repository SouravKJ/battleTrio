const start=document.querySelector(".start-screen");
const gameScreen=document.querySelector(".gameScreen");
let use=document.querySelector(".username");
const user=document.getElementsByClassName("user");
let uwin=document.querySelector(".uwin");
let cwin=document.querySelector(".cwin");
let turn=document.getElementById("done");
let c=0;
let u=0;
let t=0
let errorBox=document.getElementById("roundError");
const form=document.querySelector(".gameForm");
let resets=document.querySelector(".resets")
let TotalRound = 0;
const roundsInput = document.querySelector(".rounds");

let cross=document.querySelector("i");

roundsInput.addEventListener("input", () => {
    errorBox.style.display = "none";
});

 cross.addEventListener("click",function(){
        errorBox.style.display="none";
    });


form.addEventListener("submit", function (e) {
    e.preventDefault();
    let UserName =use .value.trim();
    let firstWord = UserName.split(" ")[0];
    TotalRound = Number(roundsInput.value);
     if (TotalRound % 2 === 0) {
        errorBox.style.display="block";
        return; // ⛔ STOP here
    }

    start.style.display="none";
    gameScreen.style.display="block";

    // ✅ valid odd number → continue game setup
    document.getElementById("total").textContent = TotalRound;


    for (let el of user) {
        el.textContent = firstWord;  // ✅ show username text
        el.style.display = "block"; // ✅ make sure visible
    }


});


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
    if (t < TotalRound) {
        const choiceToImage = {
        stone: "images/stone.png",
        paper: "images/paper.png",
        scissor: "images/scissor.png"
    };
    if(t===TotalRound){
        t++;

if (t === TotalRound) {
    blaskConfetti();   // 🎉 BOOM
    document.getElementById("result").textContent =
        u > c ? "🎉 You won the game!" :
        c > u ? "😈 Computer won the game!" :
        "🤝 Game Draw!";

    speak("Game over");
    return; // stop further clicks
}

    }

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
            result = "Round Computer wins!";
            c++;

        } else {
            result = "Round You win!";
            u++;
        }
        t++;
        console.log(c);
        console.log(u);
        console.log(t);
        document.getElementById("result").textContent = `Result: ${result}`; // Update UI first
         uwin.textContent = u;
        cwin.textContent = c;
        turn.textContent=t;
        speak(result);
    });
    }
    else{
        document.getElementById("result").textContent =
            "Game Over! Click Reset to play again.";
        speak("Game over. Please reset to play again.");
        return; // ⛔ VERY IMPORTANT
    }
    
}


function resetGame() {
    resets.style.display="block";
}

function resetRound(){
    clearInterval(countdownInterval);
    document.getElementById("computer-choice-image").src = "images/CHOICE1.png";
    document.getElementById("user-choice-image").src = "images/CHOICE2.png";
    document.getElementById("result").textContent = "Result: ";
     do {
        TotalRound = Number(prompt("Enter valid odd round:"));
    } while (TotalRound % 2 === 0 || isNaN(TotalRound));
    t = 0;
    c = 0;
    u = 0;
    uwin.textContent = u;
    cwin.textContent = c;
    turn.textContent = t;
    countdownElement.textContent = "";
    document.getElementById("total").textContent = TotalRound;
    resets.style.display = "none";
}

function resetUser(){
    clearInterval(countdownInterval);
    document.getElementById("computer-choice-image").src = "images/CHOICE1.png";
    document.getElementById("user-choice-image").src = "images/CHOICE2.png";
    document.getElementById("result").textContent = "Result: ";
    TotalRound = 0;
    t = 0;
    c = 0;
    u = 0;
    uwin.textContent = u;
    cwin.textContent = c;
    turn.textContent = t;
    countdownElement.textContent = "";
    start.style.display="block";
    use.value='';
    roundsInput.value="";
    gameScreen.style.display="none";
}



// Function to convert text to speech
function speak(text) {
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN';
    speech.rate = 1.0;
    speech.pitch = 1.0;
    window.speechSynthesis.speak(speech);
}
