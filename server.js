const express = require('express')
const app = express()
require("dotenv/config")
const userRoutes = require("./routes/user")
const eventRoutes = require("./routes/event")
const purchaseRoutes = require("./routes/purchase")
const cors = require("cors")
const mongoose = require('mongoose');
const config = require("./config/index")




/*=============
 Middleware 
 ==============*/
 app.use(express.json({
    limit: "25mb"
}))
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use("/", userRoutes)
app.use("/", eventRoutes)
app.use("/", purchaseRoutes)
app.use("/", express.static("build"))




/*================
test
===================*/

app.get("/server", (req, res) => {
    res.json("server running...")
})



/*================
Port && Mongoose
===================*/
const PORT = config.port

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Comedy-hub"
}

mongoose.connect(config.mongoUri, options)
    .then(app.listen(PORT, () => {
        console.log("\nConnected to DB!\n")
        console.log("\nServer running on port:", PORT, "\n")
    }))
    .catch((err) => console.error(err))

mongoose.set("useFindAndModify", false);