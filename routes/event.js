const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event");
const multer = require("multer");
const mul = require("../lib/multer");
const upload = multer({
  storage: mul.storage,
});

router.route("/deleteEvents")
    .post(upload.none(), eventController.remove);

    
router.route("/events")
  .get(eventController.read)
  .post(upload.any(), eventController.create);


router.route("/events/:eventId");


router.route("/events/:eventId")
  .delete(eventController.remove)
  .patch(upload.any(), eventController.update)
  .post(eventController.create);




module.exports = router;
