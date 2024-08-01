let currentAnswerIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchAnswers();
});

function fetchAnswers() {
    fetch('get_answers.php')
        .then(response => response.json())
        .then(data => {
            window.answers = data;
            loadAnswer();
        });
}

function loadAnswer() {
    const answer = answers[currentAnswerIndex];
    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = '';

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = answer.title;
    answerContainer.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
        const option = document.createElement('p');
        option.textContent = answer[`answer${i}`];
        if (i == answer.correct) {
            option.style.fontWeight = 'bold';
            option.style.color = 'green';
        }
        if (i == answer.userAnswer) {
            if (i != answer.correct) {
                option.style.fontWeight = 'bold';
                option.style.color = 'red';
            }
        }
        answerContainer.appendChild(option);
    }

    const explanation = document.createElement('p');
    explanation.textContent = `解説: ${answer.description}`;
    answerContainer.appendChild(explanation);

    document.querySelector('button[onclick="prevAnswer()"]').disabled = currentAnswerIndex === 0;
    document.querySelector('button[onclick="nextAnswer()"]').disabled = currentAnswerIndex === answers.length - 1;
}

function prevAnswer() {
    if (currentAnswerIndex > 0) {
        currentAnswerIndex--;
        loadAnswer();
    }
}

function nextAnswer() {
    if (currentAnswerIndex < answers.length - 1) {
        currentAnswerIndex++;
        loadAnswer();
    }
}
