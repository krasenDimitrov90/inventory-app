const router = require('express').Router();
const feedController = require("../controllers/post");

router.get("/posts", feedController.getPosts);

module.exports = router;