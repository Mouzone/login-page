const socket = new WebSocket('ws://localhost:8080')

const signup_form = document.querySelector("form")
const username_element = document.getElementById("sign-up-username")
const password_element = document.getElementById("sign-up-password")
const confirm_password_element = document.getElementById("sign-up-confirm-password")
const email_element = document.getElementById("sign-up-email")
const confirm_email_element = document.getElementById("sign-up-confirm-email")

const password_error = document.getElementById("password-error")
const confirmation_email_error = document.getElementById("confirmation-email-error")

signup_form.addEventListener("submit", event => {
    event.preventDefault()
    if (confirm_password_element.value !== password_element.value) {
        password_error.classList.add("active")
        password_error.textContent = "Passwords are different"
    } else if (confirm_email_element.value !== email_element.value) {
        password_error.classList.remove("active")
        password_error.textContent = ""

        confirmation_email_error.classList.add("active")
        confirmation_email_error.textContent = "Emails are different"
    } else {
        socket.send(JSON.stringify({
            action: "sign-up",
            email: email_element.value,
            username: username_element.value,
            password: password_element.value
        }))
    }
})

const email_error = document.getElementById("email-error")
const username_error = document.getElementById("username-error")
socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    if (data["status"] === "success") {
        signup_form.reset()
    } else {
        if (data["type"] === "username") {
            username_error.textContent = data["message"]
            username_error.classList.add("active")
        } else if (data["type"] === "email") {
            email_error.textContent = data["message"]
            email_error.classList.add("active")
        }
    }
    console.log(data)
}

// todo: confirmation emails