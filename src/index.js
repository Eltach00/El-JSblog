import { Question } from './question'
import './style/style.css'
import './style/modal.css'
import { isValid, Modal } from './util'


window.addEventListener('load', Question.renderQuestions())
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const logBtn = document.getElementById('logBtn')

logBtn.addEventListener('click', () =>{ new Modal({
    title: 'Hello there!',
    content: 'Please enter your login'
    }).open() 
    })

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

