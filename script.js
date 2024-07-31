const questions = [
    {
        question: "What is the process by which plants make their own food?",
        answers: [
            { text: " Photosynthesis", correct: true},
            { text: "Respiration", correct: false},
            { text: "Evaporation", correct: false},
            { text: "Fermentation", correct: false}
        ]
    }, 
    {
        question: "What is the main pigment used by plants to absorb sunlight?",
        answers: [
            { text: "Chlorophyll", correct: true},
            { text: "Hemoglobin", correct: false},
            { text: "Melanin", correct: false},
            { text: "Carotene", correct: false}
        ]
    },
    {
        question: "Which part of the plant is primarily responsible for water absorption?",
        answers: [
            { text: "Leaves", correct: false},
            { text: "Stems", correct: false},
            { text: "Roots", correct: true},
            { text: "Flowers", correct: false}
        ]
    },
    {
        question: "What gas do plants take in during photosynthesis?",
        answers: [
            { text: "SOxygen", correct: false},
            { text: "Nitrogen", correct: false},
            { text: "Carbon Dioxide", correct: true},
            { text: "Methane", correct: false}
        ]
    } 
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();