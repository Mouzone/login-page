const WebSocket = require("ws")
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.join(__dirname, 'db', 'users.db')
const db = new sqlite3.Database(dbPath)

const server = new WebSocket.Server({port: 8080})
server.on("connection", socket => {
    socket.on("message", message => {
        const data = JSON.parse(message)
        const action = data["action"]
        const username = data["username"]
        const password = data["password"]

        if (action === "login") {
            db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
                (err, row) => {
                if (err) {
                    socket.send(JSON.stringify({
                        status: "error",
                        message: "Database error"
                    }))
                } else if (row) {
                    socket.send(JSON.stringify({
                        status: "success",
                        message: "Login successful"
                    }))
                } else {
                    socket.send(JSON.stringify({
                        status: "failure",
                        message: "Account not found"
                    }))
                }
            })
        } else if (action === "sign-up") {
            const email = data["email"]
            db.get(
                `SELECT * FROM users WHERE username = ? OR email = ?`,
                [username, email],
                (err, row) => {
                    if (err) {
                        console.error('Database error:', err)
                        socket.send(
                            JSON.stringify({ error: 'Database error' })
                        )
                    } else if (row) {
                        if (row.username === username) {
                            socket.send(
                                JSON.stringify({
                                    status: "failure",
                                    type: "username",
                                    message: 'Username is already in use'
                                })
                            )
                        } else if (row.email === email) {
                            socket.send(
                                JSON.stringify({
                                    status: "failure",
                                    type: "email",
                                    message: 'Email is already in use'
                                })
                            )
                        }
                    } else {
                        db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
                            [username, password, email],
                            err => {
                            if (err) {
                                console.error('Insert error:', err)
                                socket.send(JSON.stringify(
                                    {
                                        status: "failure",
                                        message: "Insert error"
                                    }))
                            } else {
                                socket.send(JSON.stringify(
                                    {
                                        status: "success",
                                        message: 'Account created'
                                    }))
                            }
                        })
                    }
                }
            )
        }
    })

    socket.on("close", () => {
        console.log("Client disconnected")
    })
})

console.log("Websocket server is running on ws://localhost:8080")