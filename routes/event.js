const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event")
const multer = require("multer")
const mul = require("../lib/multer")
const upload = multer ({storage: mul.storage})


router.route("/deleteEvents")
    .post(
        upload.none(),
        eventController.remove
    )

router.route("/events")
    .get(eventController.read)
    .patch(eventController.update)


router.route("/updateEvent:event")
    .post(upload.single("image"),
        eventController.update
    )


module.exports = router