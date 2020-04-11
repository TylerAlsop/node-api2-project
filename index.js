const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const postsRouter = require("./posts/posts-router")
const commentsRouter = require("./posts/comments/comments-router")

const server = express()
const port = 3000

server.use(express.json())
server.use("/api/", welcomeRouter)
server.use("/api/posts", postsRouter)
server.use("/api/posts/:id/comments", commentsRouter)


// create endpoint that returns all the posts for a user
// create endpoint for adding a new post for a user

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
