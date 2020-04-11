const express = require("express");
const comments = require("../../data/db")


const router = express.Router();

module.exports = router;

//This handles the route "/api/posts/:id/comments"

//////////////// GET ////////////////

router.get("/", (req, res) => {
    comments.findPostComments(req.params.id)
        .then((comments) => {
            res
                .status(200)
                .json(comments)
        })
        .catch((error) => {
            console.log(error)
            res
                .status(500)
                .json({
                    message: "Could not get the comments for that post."
                })
        })
})

router.get("/:commentId", (req, res) => {
    comments.findCommentById(req.params.id, req.params.postId)
        .then((comment) => {
            if (comment) {
                res.json(comment)
            } else {
                res
                .status(404)
                .json({
                    message: "comment was not found. Make sure you have the correct comment ID"
                })
            }

        })
        .catch((error) => {
            console.log(error)
            res
                .status(500)
                .json({
                    message: "Could not get the comment with that ID."
                })
        })
})


//////////////// POST ////////////////


router.post("/", (req, res) => {

    if (!req.body.text) {
        return res
            .status(400)
            .json({
                message: "Text is required to create a post."
            })
    }

    comments.addUserPost(req.params.id, req.body)

    .then(post => {
        return res.status(201).json(post)
    })

    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({
                errorMessage: "There was an error while saving the post to the database."
            })
    })

});

