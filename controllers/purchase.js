const Purchases = require("../models/Purchase")
const stripe = require("stripe")(process.env.STRIPE_SECRET)


const processPmt =  async (req, res) => {
    const {
        id,
        amount,
        order,
    } = req.body

  
    try {
        await stripe.paymentIntents.create({
            amount: amount,
            currency: "cad",
            confirm: true,
            description: "ticket",
            payment_method: id,
            metadata: {
                order: order
            }
        })
        return res.json({
            success: true
        })
    } catch (error) {
        console.log("stripe error:", error.raw.message)
        return res.json({
            error: error.raw.message
        })
    }

}




const savePurchase = async (req, res) => {
    console.log("in checkout server :>>\n")
    const {amount, itemsBought, order } = req.body
    try {
        const purchase = Purchases({
            amount: amount,
            itemsBought: itemsBought,
            order: order
        })
    
        await purchase.save()
    
        return res.json({
            message: "Purchase saved."
        })
    
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}











module.exports = {
    processPmt,
    savePurchase,
}