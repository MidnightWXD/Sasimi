var title = document.querySelector(".title");
var paragraph = document.querySelector(".paragraph");
var startButton = document.querySelector(".startButton");
var startPage = document.querySelector(".startPage");
var questionContainer = document.querySelector(".questionPages");
var questionEL = document.createElement("h2");
var userAnswerCheck = document.createElement("h3");
var showResult = document.querySelector(".showResult");
var line = document.createElement("hr");
line.setAttribute("style", "width:50%;text-align:left;margin-left:0");
var label = document.createElement("label");
label.setAttribute("style", "font-size:20px;font-weight:bold;");
label.setAttribute("class", "form-group");
label.textContent = "Enter your name initial: ";
var userName = document.createElement("input");
userName.setAttribute("type", "text");
userName.setAttribute("placeholder", "Enter your initials");
var endTitle = document.createElement("h1");
endTitle.textContent = "All done!";
var finalScore = document.createElement("h2");
var submitButton = document.createElement("button");
submitButton.setAttribute("class", "btn-submit");
submitButton.textContent = "Submit";
var finalPage = document.querySelector(".finalPage");
var highScorePage = document.querySelector(".highScorePage");
var highScoreTitle = document.createElement("h1");
highScoreTitle.textContent = "High Scores";
var showHighScore = document.createElement("ul");
var countRightAnswer = 0;
var timeLeft = 10;
var backToStartBtn = document.createElement("button");
backToStartBtn.setAttribute("class", "btn btn-back");
backToStartBtn.textContent = "Back to start";
var clearHighScore = document.createElement("button");
clearHighScore.setAttribute("class", "btn btn-clear");
clearHighScore.textContent = "Clear High Score";
var divContainer = document.createElement("div");
divContainer.setAttribute("class", "btnContainer");


var i = 0;
//set up the questions
var questions = [
    {
        question: "In which continent are Chile, Argentina and Brazil?",
        choices: ["North America", "South America", "Europe", "Australasia"],
        correctAnswer: "South America"
    },
    {
        question: "What is the capital of Brazil?",
        choices: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador"],
        correctAnswer: "Brasilia"
    },
    {
        question: "The Mad Hatter and the Cheshire Cat are characters in which famous book?",
        choices: ["Alice in Wonderland", "The Cat in the Hat", "The Hatter and the Cheshire Cat", "The Cat in the Hat"],
        correctAnswer: "The Hatter and the Cheshire Cat"
    },
    {
        question: "What is the name of the main character in the Harry Potter series?",
        choices: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore"],
        correctAnswer: "Harry Potter"
    }
];




// set up the timer
function setTime() {    
    var timer = setInterval(function () {
        timeLeft--;
        document.getElementById("countDown").textContent = timeLeft;
        if (timeLeft === 0 || timeLeft < 0) {
            clearInterval(timer);
            document.getElementById("countDown").textContent = "Time's up!"; 
            questionContainer.style.display = "none";          
            finalScorePage();
        }
    }, 1000);
}

//time starts when the start button is clicked
//show questions one by one


function questionStart() {
    setTime();  
    startPage.style.display = "none";
    showQuestions();
}

function showQuestions() {
    if (i < questions.length) {
        questionEL.textContent = questions[i].question;
        questionContainer.appendChild(questionEL);
        var choices = questions[i].choices;
        for (var j = 0; j < choices.length; j++) {
            var k = j + 1;
            var choice = document.createElement("button");
            choice.textContent = k + "." + choices[j];
            choice.setAttribute("class", "btn btn-question");
            questionContainer.appendChild(choice);
            choice.setAttribute("style", "display: flex; justify-content:start;");
        }
    }else {
        finalScorePage();
        return;
    }
    var nextButton = document.querySelectorAll(".btn-question");
    nextButton.forEach(function (button) {
        button.addEventListener("click", function (event) {

            var answer = event.target.textContent;
            var answerArray = answer.split(".");
            var answerText = answerArray[1];            
            if (answerText === questions[i].correctAnswer) {
                showResult.appendChild(line);
                showResult.appendChild(userAnswerCheck);
                userAnswerCheck.textContent = "Correct!";
                showResult.style.display = "block";
                countRightAnswer++;
            }else{
                timeLeft = timeLeft - 1;
                showResult.appendChild(line);
                showResult.appendChild(userAnswerCheck);
                userAnswerCheck.textContent = "Wrong!";
                showResult.style.display = "block";
            }            
            var time = 2;
            var timer = setInterval(function () {
                time--;
                if (time === 0) {
                    clearInterval(timer);
                    showResult.style.display = "none";
                }
            }, 1000);

            i++;
            questionEL.textContent = ""; 
            for(var j = 0; j < nextButton.length; j++) {        
                questionContainer.removeChild(nextButton[j]);
            }
            showQuestions();
        });
    });        
}

function finalScorePage() {
    questionEL.textContent = "";
    finalScore.textContent = "Your final score is: " + countRightAnswer;
    // questionContainer.removeChild(questionEL);
    questionContainer.style.display = "none";
    finalPage.appendChild(endTitle);
    finalPage.appendChild(finalScore);
    finalPage.appendChild(label);
    finalPage.appendChild(userName);
    finalPage.appendChild(submitButton);
    submitButton.addEventListener("click", function () {
        var initials = userName.value;
        var highScore = {
            initials: initials,
            score: countRightAnswer
        };
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        finalPage.style.display = "none";
        highScorePage.appendChild(highScoreTitle);
        highScorePage.appendChild(showHighScore);       
        highScores.forEach(function (score) {
            var count = highScores.indexOf(score) + 1;
            var li = document.createElement("li");
            li.setAttribute("style", "list-style:none;");
            li.textContent = count + ". " + score.initials + ": " + score.score;
            showHighScore.appendChild(li);
            setLiBackground();
            highScorePage.appendChild(divContainer);
            divContainer.appendChild(clearHighScore);
            divContainer.appendChild(backToStartBtn);
            //go back to start page
            backToStartBtn.addEventListener("click", function () {
                window.location.reload();
            });
            //clear high score but stay on the high score page
            clearHighScore.addEventListener("click", function () {
                localStorage.clear();
                showHighScore.style.display = "none";
            });
        });
        highScorePage.style.display = "block";        
    });
}
//setLiBackground function set odd row background color to light gray, even row background color to white
function setLiBackground() {
    var li = document.querySelectorAll("li");
    for (var i = 0; i < li.length; i++) {
        if (i % 2 === 0) {
            li[i].style.backgroundColor = "lightred";
        } else {
            li[i].style.backgroundColor = "lightblue";
        }
    }
}


startButton.addEventListener("click", questionStart);








