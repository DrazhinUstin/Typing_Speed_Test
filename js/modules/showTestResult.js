const resultData = [
    {
        url: "./src/gold_medal.svg",
        heading: "Congrats, you deserve a gold medal!",
        description: "Your typing skills are perfect. Not everyone achieves this result."
    },
    {
        url: "./src/silver_medal.svg",
        heading: "Congrats, you deserve a silver medal!",
        description: "This is a good result, but you still have something to strive for."
    },
    {
        url: "./src/bronze_medal.svg",
        heading: "Congrats, you deserve a bronze medal!",
        description: "Not bad, not bad. But you still have something to work on."
    },
    {
        url: "./src/turtle.svg",
        heading: "You type like a turtle...",
        description: "This is frankly a bad result. You need to improve your typing skills."
    }
];

const showTestResult = (cpm, wpm, errors) => {
    const testResultDOM = document.querySelector('.test-result');
    const accuracy = Math.round((cpm * 100)/(cpm + errors)) || 0;
    let resultIndex;

    if (cpm >= 250 && accuracy >= 97) resultIndex = 0;
    else if (cpm >= 200 && accuracy >= 95) resultIndex = 1;
    else if (cpm >= 150 && accuracy >= 90) resultIndex = 2;
    else resultIndex = resultData.length - 1;

    const {url, heading, description} = resultData[resultIndex];

    testResultDOM.innerHTML = `
    <main>
        <img src="${url}" alt="test-result-image">
        <article>
            <h3>${heading}</h3>
            <p>Your result is <span class="cpm-result">${cpm} CPM</span> (<span class="wpm-result">${wpm} WPM</span>).</p>
            <p>You made <span class="errors-result">${errors} errors</span>.</p>
            <p>Your accuracy is <span class="accuracy-result">${accuracy}%</span>.</p>
            <p>${description}</p>
        </article>
    </main>
    <footer>
        <button class="btn" id="close-test-result-btn">Close</button>
    </footer>`;

    document.getElementById('close-test-result-btn').addEventListener('click', () => {
        testResultDOM.parentElement.classList.remove('show');
    });

    testResultDOM.parentElement.classList.add('show');
};

export default showTestResult;