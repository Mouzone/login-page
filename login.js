const socket = new WebSocket('ws://localhost:8080')

const login_form = document.querySelector("form")
const username_element = document.getElementById("username")
const password_element = document.getElementById("password")

login_form.addEventListener("submit", event => {
    event.preventDefault()
    socket.send(JSON.stringify({
        action: "login",
        username: username_element.value,
        password: password_element.value
    }))
    login_form.reset()
})


socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    console.log(data)
}

// todo: forgot account
// todo: link this with chatroom
// -- todo: popups depending on recieved message (changing screen, on success, error message on error)


