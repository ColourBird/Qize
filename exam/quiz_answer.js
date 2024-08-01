let currentQuestionIndex = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});

function fetchQuestions() {
    fetch('get_questions.php')
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadAnswer();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function loadAnswer() {
    const question = questions[currentQuestionIndex];
    document.getElementById('answer-container').innerHTML = `
        <h2>${question.title}</h2>
        <p>解説: ${question.description}</p>
        <p>解答1: ${question.answer1}</p>
        <p>解答2: ${question.answer2}</p>
        <p>解答3: ${question.answer3}</p>
        <p>解答4: ${question.answer4}</p>
        <p>正解: ${question[`answer${question.correct}`]}</p>
    `;
    updateNavigationButtons();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadAnswer();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadAnswer();
    }
}

function updateNavigationButtons() {
    document.getElementById('prev-button').disabled = currentQuestionIndex === 0;
    document.getElementById('next-button').disabled = currentQuestionIndex === questions.length - 1;
}
