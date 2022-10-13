var questionList = [{
    askQuestion: "Inside which HTML element do we put the JavaScript?",
    choices: ["javascript", "script" , "js" , "java"],
    solution: "script"
},{
    askQuestion: "Where is the correct place to insert a JavaScript link?",
    choices: ["the head section", "the body section" , "the footer section" , "the head and the body sections"],
    solution: "the body section"
},{
    askQuestion: "The external JavaScript file must contain the script tag.",
    choices: ["Yes", "No", "Maybe", "I don't know"],
    solution: "Yes"
},{
    askQuestion: "How do you write an IF statement in JavaScript?",
    choices: ["if (i == 5)", "if i = 5" , "if i = 5 then" , "if i == 5 then"],
    solution: "if (i == 5)"
},{
    askQuestion: "How can you add a comment in a JavaScript?",
    choices: ["!-comment-", "//comment" , "'comment" , "//comment//"],
    solution: "//comment"
}]

var timeRemaining = questionList.length * 15
var clockId = ""
var timeEl = document.querySelector("#time")
var startBtnEl = document.querySelector("#startBtn")

var questionScreen = document.querySelector("#question-screen")
var quizIntroScreen = document.querySelector("#quiz-intro")
var finishScreen = document.querySelector("#finish-screen")
var highScoreScreen = document.querySelector("#highScore-screen")

var index = 0

function init () {
    clockId = setInterval (countdown, 1000)
    
    finishScreen.classList.add("hide")
    highScoreScreen.classList.add("hide")
    questionScreen.classList.remove("hide")

    quizIntroScreen.classList.add("hide")

    displayQuestion ()
}

function displayQuestion() {
    questionScreen.innerHTML = `
    <h2>${questionList[index].askQuestion}</h2>
                        <ul>
                            <!-- This will be generated in JS -->
                            <li><button class="answer-button">${questionList[index].choices[0]}</button></li>
                            <li><button class="answer-button">${questionList[index].choices[1]}</button></li>
                            <li><button class="answer-button">${questionList[index].choices[2]}</button></li>
                            <li><button class="answer-button">${questionList[index].choices[3]}</button></li>
                        </ul>
    `
    var answerBtn = document.querySelectorAll(".answer-button")

    for (var i = 0; i < answerBtn.length; i++) {
        answerBtn[i].addEventListener("click", nextQuestion)
    }
}

function nextQuestion() {
    var userSelection = this.textContent
    var score = document.querySelector("#score")

    if (userSelection === questionList[index].solution) {
       alert("correct")
    } else {
        alert("incorrect")
        timeRemaining = timeRemaining - 15
    }

    index++

    if (index < questionList.length) {
        displayQuestion ()
    } else {
        questionScreen.classList.add("hide")
        finishScreen.classList.remove("hide")
        score.innerHTML = timeEl.textContent
        clearInterval(clockId)
    }

}


function countdown () {
    timeEl.textContent = timeRemaining
    timeRemaining--
    if (timeRemaining <= 0){
        clearInterval(clockId);
        finishScreen.classList.remove("hide")
    }
}

startBtnEl.addEventListener("click", init)

// Scoring Function

// High Score List - Array
var highScoreList = []

var submitNameBtn = document.querySelector("#submit-name")
var playerName = document.querySelector("#player-name").value

function storePlayerNames() {
    localStorage.setItem("playerScore", JSON.stringify(highScoreList));
}



function renderPlayerNames() {
    highScoreListEl = document.querySelector("#highScore-List")


    for (var i = 0; i < highScoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScoreList[i];
        highScoreListEl.appendChild(li);

    }
    var nameScore = document.querySelectorAll(".name-score")

 
 }

// Need to create a variable for score

submitNameBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    
    var playerName = document.querySelector("#player-name").value
    
    if (playerName === "") {
        window.alert("Name cannot be blank");
        return;
    } else {
        window.alert("Thanks for playing")
    }
    highScoreList.push(playerName + " - " + timeEl.textContent); 
    localStorage.setItem("playerName", JSON.stringify(highScoreList)); 
    
    document.querySelector("#player-name").value = "";

    highScoreScreen.classList.remove("hide")
    finishScreen.classList.add("hide")

    // for loop, run on local storage and create li like we did 
        
    // store updated names and re-render the list
    storePlayerNames();
    renderPlayerNames();
})

var restartBtn = document.querySelector("#restart-btn")

restartBtn.addEventListener("click", init)

var highScoreBtn = document.querySelector("#high-scores-btn")

highScoreBtn.addEventListener("click", function(event) {
    finishScreen.classList.add("hide")
    quizIntroScreen.classList.add("hide")
    questionScreen.classList.add("hide")
    highScoreScreen.classList.remove("hide")
})






