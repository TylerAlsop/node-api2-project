const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
// const posts = require("./data/db")
const postsRouter = require("./posts/posts-router")

const server = express()
const port = 3000

server.use(express.json())
server.use("/", welcomeRouter)
server.use("/api/posts", postsRouter)


// create endpoint that returns all the posts for a user
// create endpoint for adding a new post for a user

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
