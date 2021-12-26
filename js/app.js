const startTestBtn = document.getElementById('start-test-btn');
const testInput = document.getElementById('test-input-field');
const typingTextDOM = document.querySelector('.typing-text p');
const timerDOM = document.querySelector('.timer');
const errorsDOM = document.querySelector('.errors');
const wpmDOM = document.querySelector('.wpm');
const cpmDOM = document.querySelector('.cpm');
let totalTime = 60;
let timeLeft;
let timerID;
let errors = 0;
let step = 0;

const splitText = () => {
    const chars = typingTextDOM.innerText.split('');
    typingTextDOM.innerHTML = chars.map(item => `<span>${item}</span>`).join('');
};

const startTest = () => {
    focus();
    typingTextDOM.firstElementChild.classList.add('active');
    launchTimer();
    document.addEventListener('keydown', focus);
    testInput.addEventListener('input', initTyping);
};

const focus = () => testInput.focus();

const launchTimer = () => {
    timeLeft = totalTime;
    timerID = setTimeout(countDown, 1000);
};

const countDown = () => {
    timeLeft--;
    timerDOM.textContent = `${timeLeft}s`;
    if (!timeLeft) clearTimeout(timerID);
    else timerID = setTimeout(countDown, 1000);
};

const initTyping = () => {
    const chars = [...typingTextDOM.children];
    const currentChar = chars[step];
    const value = testInput.value.split('')[step];
    if (!value) {
        step--;
        if (chars[step].classList.contains('incorrect')) {
            errors--;
            errorsDOM.textContent = errors;
        }
        chars[step].className = '';
        chars[step].classList.add('active');
        currentChar.classList.remove('active');
        return;
    }
    if (currentChar.textContent === value) {
        currentChar.classList.replace('active', 'correct');
    } else {
        currentChar.classList.replace('active', 'incorrect');
        errors++;
        errorsDOM.textContent = errors;
    }
    step++;
    chars[step].classList.add('active');
};

startTestBtn.addEventListener('click', startTest);

splitText();