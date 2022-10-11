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

        const html = question.length ? question.map(getTemplate).join('') : `<div class="mui--text-headline">No posts yet</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }

    static fetchT(token) {
        if (!token) {
            return Promise.resolve('<h3 class="error">Wrong email or password!</h3>')
        }
        return fetch(`https://js-blog-el-default-rtdb.europe-west1.firebasedatabase.app/question.json?auth=${token}`)
        .then(response => response.json())
        .then( response => {
            if (response && response.error) { 
                return `<h1 class="error">${response.error}</h1>`
            }
            return response ? Object.keys(response).map( key => {
               return { 
                ...response[key],
                id: key
            } 
            }) : []
        })
    }


    static makeList(questions) {
        return questions.length ? `<ol class='love'>${questions.map( q => `<li>${q.text}</li>`).join('')}</ol>` : `<h1>Вопросов нет</h1>`
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


