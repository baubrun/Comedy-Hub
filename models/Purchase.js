const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PurchaseSchema = new Schema({
    amount: {type: String},
    itemsBought: {type: Array},
    orderNumber: {type: String},
    dateAdded: {type: Date, default: Date.now}
})


module.exports = mongoose.model("Purchases", PurchaseSchema)