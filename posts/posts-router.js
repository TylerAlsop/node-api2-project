const express = require("express");
const posts = require("../data/db")


const router = express.Router();

module.exports = router;




//This handles the route "/api/posts"

//////////////// GET ////////////////

router.get("/", (req, res) => {
    console.log(req.query)

    // const options = {
    //     sortBy: req.query.sortBy,
    //     limit: req.query.limit,
    // }

	posts.find(/*options*/ req.query)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts.",
			})
		})
})

router.get("/", (req, res) => {
	posts.find()
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts.",
			})
		})
})

router.get("/:id", (req, res) => {
	posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with that ID could not be found.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
		})
})

//////////////// POST ////////////////

router.post("/", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: "Please provide title and contents for the post.",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: "There was an error while saving the post to the database.",
			})
		})
})


//////////////// PUT / PATCH ////////////////

router.put("/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing post title or contents.",
		})
	}

	posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with that ID could not be found.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the post.",
			})
		})
})

//////////////// DELETE ////////////////

router.delete("/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been deleted.",
				})
			} else {
				res.status(404).json({
					message: "The post with that ID could not be found.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the post.",
			})
		})
})



//////////////// COMMENTS ////////////////

//This handles the route "/api/posts/:id/comments"

//////////////// GET ////////////////

router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
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

router.get("/:id/comments/:commentId", (req, res) => {
    posts.findCommentById(req.params.commentId)
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


router.post("/:id/comments", (req, res) => {
    comment = {
        text: req.body.text,
        post_id: req.params.id
    }

    if (!req.body.text) {
        return res
            .status(400)
            .json({
                message: "Text is required to comment on a post."
            })
    }

    posts.insertComment(comment)


        .then(comment => {
            return res.status(201).json(comment)
        })

        .catch(error => {
            console.log(error)
            res
                .status(500)
                .json({
                    errorMessage: "There was an error while saving the comment to the database."
                })
        })

});

