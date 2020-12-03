const express = require("express")
const router = express.Router()
const multer = require("multer")
const mul = require("../lib/multer")
const upload = multer ({storage: mul.storage})
const purchaseController = require("../controllers/purchase")





router.route("/checkout")
    .post(
        upload.none(),
        purchaseController.checkout
    )



router.route("/charge")
    .post(
        upload.none(),
        purchaseController.charge
    )





module.exports = router