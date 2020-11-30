const express = require('express')
const router = express.Router()
const userController = require("../controllers/user")
const multer = require("multer")
const mul = require("../lib/multer")
const upload = multer ({storage: mul.storage})



router.route("/login")
.get(
    upload.none(),
    userController.read
)

router.route("/register")
.post(
    upload.none(),
    userController.create
)



module.exports = router