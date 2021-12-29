import paragraphs from "./paragraphs.js";
import showTestResult from "./showTestResult.js";

const setupTest = () => {
    const startTestBtn = document.getElementById('start-test-btn');
    const changeTestBtn = document.getElementById('change-test-btn');
    const testInput = document.getElementById('test-input-field');
    const typingTextDOM = document.querySelector('.typing-text p');
    const timerDOM = document.querySelector('.timer');
    const errorsDOM = document.querySelector('.errors');
    const cpmDOM = document.querySelector('.cpm');
    const wpmDOM = document.querySelector('.wpm');
    const audio = new Audio('../src/error_sound.mp3');
    let totalTime = 60;
    let timeLeft;
    let timerID;
    let errors = 0;
    let cpm = 0;
    let wpm = 0;
    let currentString = '';
    let activeError = false;
    let step = 0;

    const getRandomText = () => {
        const index = Math.floor(Math.random() * paragraphs.length);
        typingTextDOM.textContent = paragraphs[index];
    };

    const splitText = () => {
        const chars = typingTextDOM.innerText.split('');
        typingTextDOM.innerHTML = chars.map(item => `<span>${item}</span>`).join('');
    };

    const startTest = () => {
        startTestBtn.parentElement.classList.add('disabled');
        resetController();
        splitText();
        typingTextDOM.firstElementChild.classList.add('active');
        focus();
        launchTimer();
        document.addEventListener('keydown', focus);
        testInput.addEventListener('input', initTyping);
    };

    const resetController = () => {
        errors = cpm = wpm = step = 0;
        activeError = false;
        testInput.value = currentString = '';
        timerDOM.textContent = `${totalTime}s`;
        errorsDOM.textContent = cpmDOM.textContent = wpmDOM.textContent = 0;
    };

    const focus = () => testInput.focus();

    const launchTimer = () => {
        timeLeft = totalTime;
        timerID = setTimeout(countDown, 1000);
    };

    const countDown = () => {
        timeLeft--;
        timerDOM.textContent = `${timeLeft}s`;
        if (!timeLeft) endTest();
        else timerID = setTimeout(countDown, 1000);
    };

    const initTyping = () => {
        const chars = [...typingTextDOM.children];
        const currentChar = chars[step];
        const value = testInput.value.split('')[step];
        if (!value) {
            testInput.value = currentString;
            return;
        }
        if (currentChar.textContent === value) {
            if (currentChar.classList.contains('incorrect')) {
                currentChar.classList.remove('active');
            } else {
                currentChar.classList.replace('active', 'correct');
                cpm++;
                cpmDOM.textContent = cpm;
            }
            currentString = testInput.value;
            activeError = false;
            defineWPM();
            step++;
            step > chars.length - 1 ? endTest() : chars[step].classList.add('active');
        } else {
            if (!activeError) {
                errors++;
                errorsDOM.textContent = errors;
                activeError = true;
            }
            testInput.value = currentString;
            currentChar.classList.add('incorrect');
            audio.play();
        }
    };

    const defineWPM = () => {
        const words = currentString.split(' ');
        const lastWordIndex = words.length - 1;
        const lastWord = words[lastWordIndex];
        const totalWords = typingTextDOM.textContent.split(' ');
        lastWord === totalWords[lastWordIndex] ? wpm = words.length : wpm = words.length - 1; 
        wpmDOM.textContent = `${wpm}`;
    };

    const endTest = () => {
        const activeElem = [...typingTextDOM.children].find(elem => elem.classList.contains('active'));
        if (activeElem) activeElem.classList.remove('active');
        clearTimeout(timerID);
        testInput.blur();
        document.removeEventListener('keydown', focus);
        testInput.removeEventListener('input', initTyping);
        startTestBtn.textContent = 'restart';
        startTestBtn.parentElement.classList.remove('disabled');
        showTestResult(cpm, wpm, errors);
    };

    startTestBtn.addEventListener('click', startTest);

    changeTestBtn.addEventListener('click', () => {
        getRandomText();
        resetController();
        startTestBtn.textContent = 'start test';
    });

    getRandomText();
};

export default setupTest;