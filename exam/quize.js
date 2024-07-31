let currentQuestionIndex = 0;
let answers = {};

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('quize.html')) {
        fetchQuestions();
    }
});

function goToPage(page) {
    window.location.href = page;
}

function fetchQuestions() {
    // サーバーから問題を取得する代わりに、固定の問題データを使用します
    const questions = [
        {
            id: 1,
            title: '玉子には殻が赤いものと白いものがありますが、両者の違いはなんでしょうか？',
            answer1: '栄養価',
            answer2: '味',
            answer3: '賞味期限',
            answer4: '何も変わらない',
            correct: 4
        },
        {
            id: 2,
            title: '一般的な白と黒のサッカーボールは5角形と6角形のパネルで出来ていますが、パネルは合わせて何枚使われているでしょうか？',
            answer1: '15枚',
            answer2: '22枚',
            answer3: '32枚',
            answer4: '38枚',
            correct: 3
        },
        {
            id: 3,
            title: '髪の毛は1年でどれくらい伸びるでしょうか？',
            answer1: '6cm',
            answer2: '8cm',
            answer3: '12cm',
            answer4: '20cm',
            correct: 3
        },
        {
            id: 4,
            title: 'イカの足は何本あるでしょうか？',
            answer1: '2本',
            answer2: '4本',
            answer3: '8本',
            answer4: '10本',
            correct: 3
        },
        {
            id: 5,
            title: '闘牛において、牛は何に反応して暴れているでしょうか？',
            answer1: '闘牛士の声',
            answer2: '布が動く様子',
            answer3: '赤い布',
            answer4: '観客の声',
            correct: 2
        },
        {
            id: 6,
            title: 'スーツの袖のボタンは、もともとどんな理由で付けられたでしょうか？',
            answer1: '飾り',
            answer2: '鼻水を拭かないため',
            answer3: '予備のボタン',
            answer4: '袖口の太さを変えるため',
            correct: 2
        },
        {
            id: 7,
            title: '1本の鉛筆をすべて使い切るとどれくらいの長さの線が引けるでしょうか？',
            answer1: '500m',
            answer2: '800m',
            answer3: '50km',
            answer4: '100km',
            correct: 3
        }
    ];
    
    window.questions = questions;
    loadQuestion();
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
        document.getElementById('check-answers').disabled = Object.keys(answers).length < questions.length;
    });
}

function nextQuestion() {
    if (!document.querySelector('input[name="answer"]:checked')) {
        alert('解答を選択してください。');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        alert('これが最後の問題です。');
        currentQuestionIndex = questions.length - 1;
    } else {
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}
