export function isValid(value) {
    return value.length >= 10
}

export function fecthAuth(email, password) {
    const API_KEY = 'AIzaSyDmln79pJojB5EQZlHIg2TeiEhQqX30ULY'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-type': 'applicaton/json'
        } 
    }).then(response => response.json())
    .then(data => data.idToken)
}