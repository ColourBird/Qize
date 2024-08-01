let currentQuestionIndex = 0;
let answers = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchAnswers();
});

function fetchAnswers() {
    fetch('get_answers.php')
        .then(response => response.json())
        .then(data => {
            answers = data;
            loadAnswer();
        })
        .catch(error => console.error('Error fetching answers:', error));
}

function loadAnswer() {
    const question = questions[currentQuestionIndex];
    const answer = answers[currentQuestionIndex];
    
    document.getElementById('answer-container').innerHTML = `
        <h2>${question.title}</h2>
        <p>あなたの解答: ${question[`answer${answer.answer}`]}</p>
        <p>正解: ${question[`answer${question.correct}`]}</p>
        <p>解説: ${question.description}</p>
    `;
    
    document.getElementById('prev-button').disabled = currentQuestionIndex === 0;
    document.getElementById('next-button').disabled = currentQuestionIndex === questions.length - 1;
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadAnswer();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadAnswer();
    }
}
