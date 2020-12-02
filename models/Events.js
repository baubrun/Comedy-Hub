const mongoose = require("mongoose")
const Schema = mongoose.Schema


const EventSchema = new Schema({
    title: {type: String, required: true},
    startDate: {type: String, required: true},
    startTime: {type: String, required: true},
    endDate: {type: String, required: true},
    endTime: {type: String, required: true},
    venue: {type: String, required: true},
    performer: {type: String},
    image: {type: String},
    price: {type: Number, required: true},
    amount: {type: Number, default: 1},
    hostId: {type: String, required: true},
    allDay: {type: String, default: false},
    facebook: {type: String},
    instagram: {type: String},
    dateAdded: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Events", EventSchema)