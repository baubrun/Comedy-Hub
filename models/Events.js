const mongoose = require("mongoose")
const Schema = mongoose.Schema



const EventSchema = new Schema({
    title: {type: String},
    startDate: {type: String},
    startTime: {type: String},
    endDate: {type: String},
    endTime: {type: String},
    venue: {type: String},
    performer: {type: String},
    image: {type: String},
    price: {type: Number},
    amount: {type: Number, },
    hostId: {type: String},
    allDay: {type: String, default: false},
    facebook: {type: String, default: ""},
    instagram: {type: String, default: ""},
    twitter: {type: String, default: ""},
    dateAdded: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Events", EventSchema)