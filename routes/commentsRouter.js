var express = require("express")
const router = express.Router()
var commentsController = require("../controllers/commentsController")

router.route("/").post(commentsController.addComment)
    .get(commentsController.getComments)
router.route("/:id")
    .put(commentsController.updateComment)
    .delete(commentsController.deleteComment)

module.exports = router
