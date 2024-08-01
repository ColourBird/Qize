let currentQuestionIndex = 0;
let answers = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});

function fetchQuestions() {
    fetch('get_questions.php')
        .then(response => response.json())
        .then(data => {
            window.questions = data;
            loadQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-container').innerHTML = `<h2>${question.title}</h2>`;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const option = question[`answer${i}`];
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = i;
        radio.id = `option${i}`;
        radio.onclick = () => saveAnswer(question.id, i);
        
        const label = document.createElement('label');
        label.htmlFor = `option${i}`;
        label.textContent = option;
        
        optionsContainer.appendChild(radio);
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    }
    
    if (answers[question.id]) {
        document.getElementById(`option${answers[question.id]}`).checked = true;
    }
}

function saveAnswer(questionId, answer) {
    answers[questionId] = answer;

    fetch('save_answer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `no=1&exam_id=${questionId}&answer=${answer}`
    }).then(() => {
        const checkAnswersButton = document.getElementById('check-answers');
        if (checkAnswersButton) {
            checkAnswersButton.disabled = Object.keys(answers).length < questions.length;
        }
    }).catch(error => console.error('Error saving answer:', error));
}

function nextQuestion() {
    if (!document.querySelector('input[name="answer"]:checked')) {
        alert('解答を選択してください。');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        alert('全ての問題に解答しました。答え合わせページへ移動します。');
        window.location.href = 'quiz_answer.html';
        return;
    }
    loadQuestion();
}
