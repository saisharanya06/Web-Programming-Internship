const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Stephen King", "Charles Dickens"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Jupiter", "Mars", "Venus", "Mercury"],
        correctAnswer: "Mars"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];
let timer;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('time-left');
const nextButton = document.getElementById('next-btn');
const reviewButton = document.getElementById('review-btn');
const reviewElement = document.getElementById('review');

function displayQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    choicesElement.innerHTML = '';
    currentQuizData.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(choice));
        choicesElement.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    let timeLeft = 10; // Set the time limit per question (in seconds)
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function selectAnswer(selectedAnswer) {
    stopTimer();
    answers.push(selectedAnswer);
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Wrong! The correct answer is: " + correctAnswer;
        feedbackElement.style.color = "red";
    }

    nextButton.disabled = false;
    choicesElement.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
        feedbackElement.textContent = '';
        feedbackElement.style.color = "";
        nextButton.disabled = true;
        choicesElement.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });
        if (currentQuestion === quizData.length - 1) {
            reviewButton.style.display = 'inline-block'; // Show review button after answering the last question
        }
    } else {
        displayReview();
    }
}

function displayReview() {
    reviewElement.innerHTML = `<h2>Quiz Review</h2>`;
    quizData.forEach((quiz, index) => {
        const userAnswer = answers[index];
        const correctAnswer = quiz.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;
        const questionReview = document.createElement('div');
        questionReview.classList.add('question-review');
        questionReview.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${quiz.question}</p>
            <p><strong>Your Answer:</strong> ${userAnswer}</p>
            <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
            <p><strong>Result:</strong> ${isCorrect ? 'Correct' : 'Incorrect'}</p>
        `;
        reviewElement.appendChild(questionReview);
    });
    reviewElement.innerHTML += `<p>Total Score: ${score} out of ${quizData.length}</p>`;
    reviewElement.style.display = 'block';
}

displayQuestion();
nextButton.addEventListener('click', nextQuestion);

reviewButton.addEventListener('click', () => {
    displayReview();
});