import { Question } from './question'
import './style/style.css'
import './style/modal.css'
import { fecthAuth, isValid } from './util'
import { Modal } from './modal';


window.addEventListener('load', Question.renderQuestions())
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const logBtn = document.getElementById('logBtn')

logBtn.addEventListener('click', openModal)

form.addEventListener('submit', handleInput)

input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function handleInput(event) {
    event.preventDefault()
    submitBtn.disabled = true

    if (isValid(input.value)) {
        const question = {
            text: input.value,
            date: new Date().toJSON()
        }

    Question.create(question).then( () => {
        input.value = ''
        input.className = '' 
        submitBtn.disabled = false
    })
    
  
}   
}
const authModal = new Modal({
    title: 'Enter your email and password to log in'
    })

function openModal() {
   
        authModal.open()

        document
            .getElementById('auth-form')
            .addEventListener('submit', handleAuth)
}

function handleAuth(event) {
    event.preventDefault()
    
    const btn = event.target.querySelector('#submit-auth')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#pass').value
    btn.disabled = true


    fecthAuth(email, password)
    .then(Question.fetchT)
    .then(renderInModal)
    .then( () => {
        btn.disabled = false
    })
}

function renderInModal(content) {
    if (typeof content === 'string') {
        new Modal({
            title: 'Error',
            content
        }).open()
    } else {
        authModal.close()
        new Modal({
            title: 'List',
            content: Question.makeList(content)
        }).open()
    }
}

