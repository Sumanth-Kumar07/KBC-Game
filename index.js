const image = document.querySelector("img");
const input = document.querySelector("input");
const buttonQr = document.querySelector("button");
const api = `https://api.qrserver.com/v1/`;
const api2 = `create-qr-code/?size=150x150&data=`;

buttonQr.addEventListener("click", () => {
    image.src = `${api}${api2}${input.value}`;
})


const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct: false},
        ]
    },
];

const congrats = {
    text : "your score"
}

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const para = document.getElementById("parag");

let currentQuestionIndex = 0;
let questNo = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = questNo +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questNo++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length){
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        })
        nextButton.addEventListener("click", diamondAnswer)
    }else{
        resetState();
        questionElement.innerHTML=`You scored ${score} out of ${questions.length-1}`;
    }
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        para.style.display = "block";
        para.style.color = "green";
        para.innerHTML="congratulations your answer is correct";
    }else{
        selectedBtn.classList.add("incorrect");
        para.style.display="block";
        para.style.color= "red";
        para.innerHTML="ohh! wrong answer"
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}



function diamondAnswer() {
    para.innerHTML="";
    showQuestion();
}
startQuiz();