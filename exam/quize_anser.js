document.addEventListener('DOMContentLoaded', () => {
    loadResults();
});

function goToPage(page) {
    window.location.href = page;
}

function loadResults() {
    fetch('get_questions.php')
        .then(response => response.json())
        .then(questions => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            fetch('get_answers.php')
                .then(response => response.json())
                .then(answers => {
                    questions.forEach((question, index) => {
                        const answer = answers.find(a => a.exam_id === question.id);
                        const resultDiv = document.createElement('div');
                        resultDiv.id = `result${index + 1}`;
                        resultDiv.innerHTML = `
                            <h2>問題 ${question.id}</h2>
                            <p>あなたの解答: ${question[`answer${answer.answer}`]}</p>
                            <p>正解: ${question[`answer${question.correct}`]}</p>
                            <p>${question.description}</p>
                        `;
                        resultsContainer.appendChild(resultDiv);
                    });

                    document.getElementById('previous-result').disabled = true;
                    document.getElementById('next-result').disabled = answers.length <= 1;
                });
        });
}

function previousResult() {
    // 前の結果表示に関するロジック
}

function nextResult() {
    // 次の結果表示に関するロジック
}
