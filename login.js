const socket = new WebSocket('ws://localhost:8080')

const login_form = document.querySelector("form")
const username_element = document.getElementById("login-username")
const password_element = document.getElementById("login-password")

login_form.addEventListener("submit", event => {
    event.preventDefault()
    socket.send(JSON.stringify({
        action: "login",
        username: username_element.value,
        password: password_element.value
    }))
})

const account_error = document.getElementById("account-error")
socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    if (data.status === "success") {
        login_form.reset()
    } else {
        account_error.textContent = data["message"]
        account_error.classList.add("active")
    }
}

// todo: forgot account
// todo: link this with chatroom
// -- todo: popups depending on recieved message (changing screen on success, error message on error)


