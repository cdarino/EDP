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
        question: "What is the capital of the Philippines?",
        answers: [
            { text: "Davao", correct: false },
            { text: "Cebu", correct: false },
            { text: "Manila", correct: true },
            { text: "Maguindanao", correct: false },
        ]
    },
    {
        question: "Who is our national hero in the Philippines?",
        answers: [
            { text: "Apolinario Mabini", correct: false },
            { text: "Jose Rizal", correct: true },
            { text: "Andres Bonifacio", correct: false },
            { text: "J Rizz", correct: false },
            { text: "Jesus Christ", correct: false },
        ]
    },
    {
        question: "What is the largest island in the Philippines?",
        answers: [
            { text: "Mindanao", correct: false },
            { text: "Visayas", correct: false },
            { text: "Luzon", correct: true },
            { text: "Palawan", correct: false },
        ]
    },
    {
        question: "What is the national language of the Philippines?",
        answers: [
            { text: "English", correct: false },
            { text: "Filipino", correct: true },
            { text: "Spanish", correct: false },
            { text: "Cebuano", correct: false },
        ]
    },
    {
        question: "In what year did the Philippines declare independence from Spain?",
        answers: [
            { text: "1898", correct: true },
            { text: "1946", correct: false },
            { text: "1965", correct: false },
            { text: "1986", correct: false },
        ]
    }
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