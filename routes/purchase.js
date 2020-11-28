const express = require("express")
const router = express.Router()
const upload = require("../lib/multer")
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




router.route("/orderNum")
    .get(
        purchaseController.order
    )



module.exports = router