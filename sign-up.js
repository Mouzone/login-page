const socket = new WebSocket('ws://localhost:8080')

const signup_form = document.querySelector("form")
const username_element = document.getElementById("sign-up-username")
const password_element = document.getElementById("sign-up-password")
const confirm_password_element = document.getElementById("sign-up-confirm-password")
const email_element = document.getElementById("sign-up-email")
const confirm_email_element = document.getElementById("sign-up-confirm-email")

signup_form.addEventListener("submit", event => {
    event.preventDefault()
    socket.send(JSON.stringify({
        action: "login",
        email: email_element,
        username: username_element.value,
        password: password_element.value
    }))
    signup_form.reset()
})

socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    console.log(data)
}