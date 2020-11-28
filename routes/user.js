const express = require('express')
const router = express.Router()
const userController = require("../controllers/user")
const upload = require("../lib/multer")




router.route("/login")
.post(
    upload.none(),
    userController.read
)

router.route("/register")
.post(
    upload.none(),
    userController.create
)



module.exports = router