import paragraphs from "./paragraphs.js";

const getRandomText = async () => {
    const languageDOM = document.getElementById('test-language');
    const language = languageDOM.value;

    switch (language) {
        case 'en':
            const index = Math.floor(Math.random() * paragraphs.length);
            return paragraphs[index];
        case 'ru':
            const urlRU = 'https://fish-text.ru/get?type=sentence&number=3&format=json'; 
            try {
                const response = await fetch(urlRU);
                const result = await response.json();
                if (result.status === 'success') return result.text;
                else console.log(result.errorCode + '\n' + result.text);    
            } catch (error) {
                console.log(error);
            }
            break;
    }
};

export default getRandomText;