const express = require("express")
const router = express.Router()
const multer = require("multer")
const mul = require("../lib/multer")
const upload = multer ({storage: mul.storage})
const purchaseController = require("../controllers/purchase")





router.route("/purchase")
    .post(
        upload.none(),
        purchaseController.create
    )



router.route("/processPmt")
    .post(
        upload.none(),
        purchaseController.processPmt
    )





module.exports = router