const express = require("express");
const posts = require("../data/db")


const router = express.Router();



//This handles the route "GET /api/posts"

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
				message: "Error retrieving the posts",
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
				message: "Error retrieving the posts",
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
					message: "Post not found",
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
			message: "Missing post title or contents.",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the post.",
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
					message: "The post could not be found.",
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
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the post",
			})
		})
})

//////////////// post/comments ////////////////
//////////////// GET ////////////////


router.get("/:id/posts", (req, res) => {
    posts.findUserPosts(req.params.id)
        .then((posts) => {
            res
                .status(200)
                .json(posts)
        })
        .catch((error) => {
            console.log(error)
            res
                .status(500)
                .json({
                    message: "Could not get user posts"
                })
        })
})

router.get("/:id/posts/:postId", (req, res) => {
    posts.findUserPostById(req.params.id, req.params.postId)
        .then((post) => {
            if (post) {
                res.json(post)
            } else {
                res
                .status(404)
                .json({
                    message: "Post was not found. Make sure you have the correct post ID"
                })
            }

        })
        .catch((error) => {
            console.log(error)
            res
                .status(500)
                .json({
                    message: "Could not get user post."
                })
        })
})


//////////////// POST ////////////////


router.post("/:id/posts", (req, res) => {

    if (!req.body.text) {
        return res
            .status(400)
            .json({
                message: "Text is required to create a post."
            })
    }

    posts.addUserPost(req.params.id, req.body)

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


module.exports = router;
