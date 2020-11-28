const express = require("express")
const router = express.Router()
const upload = require("../lib/multer")
const eventController = require("../controllers/event")




router.route("/deleteEvents")
    .post(
        upload.none(),
        eventController.remove
    )

router.route("/events")
    .get(eventController.read)


router.route("/updateEvent")
    .post(upload.single("image"),
        eventController.update
    )


module.exports = router