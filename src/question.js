export class Question {
    static create(question) {
        return fetch('https://js-blog-el-default-rtdb.europe-west1.firebasedatabase.app/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'applicaton/json'
            }
        }).then( response => response.json())
        .then(response => {
            question.id = response.name
            return question;
        })
        .then(setQuestionsOnLocalStorage)
        .then(Question.renderQuestions)
    }

    static renderQuestions() {
        const question = getQuestionsFromLocal()

        const html = question.length ? question.map(getTemplate).join('') : `<div class="mui--text-headline">No questions yet</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }
}

function setQuestionsOnLocalStorage(question) {
    const all = getQuestionsFromLocal();
    all.push(question)
    localStorage.setItem('question', JSON.stringify(all))
}

function getQuestionsFromLocal() {
    return JSON.parse( localStorage.getItem('question') || '[]')
}

function getTemplate(question) {
    return `<div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}</div>
    <div>${question.text}</div>
    <br>`
}


