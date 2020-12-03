const express = require("express")
const router = express.Router()
const multer = require("multer")
const mul = require("../lib/multer")
const upload = multer ({storage: mul.storage})
const purchaseController = require("../controllers/purchase")





router.route("/savePurchase")
    .post(
        upload.none(),
        purchaseController.savePurchase
    )



router.route("/processPmt")
    .post(
        upload.none(),
        purchaseController.processPmt
    )





module.exports = router