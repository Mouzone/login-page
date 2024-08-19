const socket = new WebSocket('ws://localhost:8080')

const signup_form = document.querySelector("form")
const username_element = document.getElementById("sign-up-username")
const password_element = document.getElementById("sign-up-password")
const confirm_password_element = document.getElementById("sign-up-confirm-password")
const email_element = document.getElementById("sign-up-email")
const confirm_email_element = document.getElementById("sign-up-confirm-email")

const password_error = document.getElementById("password-error")
const email_error = document.getElementById("email-error")

signup_form.addEventListener("submit", event => {
    event.preventDefault()
    if (confirm_password_element.value !== password_element.value) {
        password_error.classList.add("active")
        password_error.textContent = "Passwords are different"
    } else if (confirm_email_element.value !== email_element.value) {
        password_error.classList.remove("active")
        password_error.textContent = ""

        email_error.classList.add("active")
        email_error.textContent = "Emails are different"
    } else {
        socket.send(JSON.stringify({
            action: "sign-up",
            email: email_element,
            username: username_element.value,
            password: password_element.value
        }))
    }
})

socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    console.log(data)
}

// todo: errors for username and emails already being in use