const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PurchaseSchema = new Schema({
    customer: {type: String},
    items: [{type: mongoose.Schema.ObjectId, ref: "Event"}],
    amount: {type: String},
    orderNumber: {type: String},
    dateAdded: {type: Date, default: Date.now},
})


module.exports = mongoose.model("Purchases", PurchaseSchema)