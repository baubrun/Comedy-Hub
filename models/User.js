const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },

    hostId: {
        type: String
    },
    dateAdded: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", UserSchema)