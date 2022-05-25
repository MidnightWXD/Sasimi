var title = document.querySelector(".title");
var paragraph = document.querySelector(".paragraph");
var startButton = document.querySelector(".startButton");
var questionTextContainer = document.querySelector(".container");
var i = 0;
var questionEL = document.createElement("h2");
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
    var timeLeft = 100;
    var timer = setInterval(function () {
        timeLeft--;
        document.getElementById("countDown").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById("countDown").textContent = "Time's up!";
        }
    }, 1000);
}

//time starts when the start button is clicked
//show questions one by one


function questionStart() {
    setTime();
    title.textContent = "";
    paragraph.textContent = "";
    startButton.style.display = "none";    
    showQuestions();
}

function showQuestions() {
    if (i < questions.length) {
        questionEL.textContent = questions[i].question;
        questionTextContainer.appendChild(questionEL);
        var choices = questions[i].choices;
        for (var j = 1; j <= choices.length; j++) {
            var choice = document.createElement("button");
            choice.textContent = j + "." + choices[j];
            choice.setAttribute("class", "btn btn-question");
            questionTextContainer.appendChild(choice);
        }
    }else {
        questionEL.textContent = "";
        questionTextContainer.removeChild(questionEL);
        var finalScore = document.createElement("h2");
        finalScore.textContent = "Your final score is: " + i;
        questionTextContainer.appendChild(finalScore);
    }
    var nextButton = document.querySelectorAll(".btn-question");
    nextButton.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var answer = event.target.textContent;   
            if (answer === questions[i].correctAnswer) {
            }
            i++;
            questionEL.textContent = ""; 
            for(var j = 0; j < nextButton.length; j++) {        
                questionTextContainer.removeChild(nextButton[j]);
            }
            showQuestions();
        });
    });        
}

startButton.addEventListener("click", questionStart);










    // startButton.style.display = "none";
    // title.textContent = "";
    // paragraph.textContent = "";
    // //display the questions
    // for (var i = 0; i < questions.length; i++) {
    //     var question = questions[i].question;
    //     var choices = questions[i].choices;
    //     var correctAnswer = questions[i].correctAnswer;
    //     //display the question
    //     var questionDiv = document.createElement("div");
    //     questionDiv.setAttribute("class", "question");
    //     var questionText = document.createElement("h3");
    //     questionText.textContent = question;
    //     questionDiv.appendChild(questionText);
    //     document.body.appendChild(questionDiv);
    //     //display the choices
    //     for (var j = 0; j < choices.length; j++) {
    //         var choice = document.createElement("input");
    //         choice.setAttribute("type", "radio");
    //         choice.setAttribute("name", "question" + i);
    //         choice.setAttribute("value", choices[j]);
    //         choice.setAttribute("id", "choice" + j);
    //         choice.setAttribute("class", "choice");
    //         var choiceText = document.createElement("label");
    //         choiceText.setAttribute("for", "choice" + j);
    //         choiceText.textContent = choices[j];
    //         questionDiv.appendChild(choice);
    //         questionDiv.appendChild(choiceText);
    //     }
    // }
    // //display the submit button
    // var submitButton = document.createElement("button");
    // submitButton.setAttribute("class", "btn-1");
    // submitButton.textContent = "Submit";
    // document.body.appendChild(submitButton);
    // //display the results
    // submitButton.addEventListener("click", function () {
    //     var correct = 0;
    //     var incorrect = 0;
    //     var unanswered = 0;
    //     for (var i = 0; i < questions.length; i++) {
    //         var userAnswer = document.querySelector("input[name=question" + i + "]:checked").value;
    //         if (userAnswer === questions[i].correctAnswer) {
    //             correct++;
    //         } else if (userAnswer === "") {
    //             unanswered++;
    //         } else {
    //             incorrect++;
    //         }
    //     }
    //     var resultsDiv = document.createElement("div");
    //     resultsDiv.setAttribute("class", "results");
    //     var resultsText = document.createElement("h3");
    //     resultsText.textContent = "You got " + correct + " questions correct, " + incorrect + " questions incorrect, and " + unanswered + " questions unanswered.";
    //     resultsDiv.appendChild(resultsText);
    //     document.body.appendChild(resultsDiv);
    // });