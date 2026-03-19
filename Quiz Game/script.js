const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxscoreSpan = document.getElementById('max-score');
const resultmessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressbar = document.getElementById('progress');

const quizQuestions = [
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false },
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyperloop Machine Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which company developed the React library?",
        answers: [
            { text: "Google", correct: false },
            { text: "Facebook", correct: true },
            { text: "Netflix", correct: false },
            { text: "Microsoft", correct: false },
        ]
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<code>", correct: false },
        ]
    },
]

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxscoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {

    console.log("Quiz Started");
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {

    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    // {question: "", answers: [{}.{},{}]}
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;

    progressbar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        // answer = {text:"", correct: false}
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    })
}

function selectAnswer(event) {
    if (answersDisabled) return;
    
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        else if (button == selectedButton){
            button.classList.add('incorrect');
        }
    })

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() =>{
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } 
        else {
            showResults();
        }
    }, 1000);
}

function showResults(){
    quizScreen.classList.remove('active'); 
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultmessage.textContent = "Excellent Work!";
    }  
    else if (percentage >= 80) {
        resultmessage.textContent = "Great Job!";
    }
    else if (percentage >= 60) {
        resultmessage.textContent = "Good Effort!";
    }
    else if (percentage >= 40) {
        resultmessage.textContent = "Not Bad!";
    }
    else {
        resultmessage.textContent = "Better Luck Next Time!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}