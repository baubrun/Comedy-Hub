require("dotenv/config")



const config = {
    mongoUri: process.env.MONGODB_URI, 
    port: process.env.PORT || 5000,
    orderId: process.env.ORDER_ID 
  }
  
module.exports = config


