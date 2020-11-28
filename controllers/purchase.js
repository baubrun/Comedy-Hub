const Purchases = require("../models/Purchase")
const stripe = require("stripe")(process.env.STRIPE_SECRET)
let orderNum = ""
let total = ""


const charge =  async (req,res) => {
    const {
        id,
        amount,
        order,
    } = req.body

    orderNum = order
    total = amount
    
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
            success: false,
            msg: error.raw.message
        })
    }

}




const checkout = async (req, res) => {
    console.log("in checkout server")
    const {amount, itemsBought, order } = req.body
    console.log('req.body checkout server', req.body)
    try {
        const purchase = Purchases({
            amount: amount,
            itemsBought: itemsBought,
            order: order
        })
    
        await purchase.save()
    
        return res.json({
            success: true
        })
    
    } catch (error) {
        return res.json({
            success: false
        })
    }
}



const order = (req, res) => {
    return res.json({
        success: true,
        order: orderNum,
        amount: total
    })

}









module.exports = {
    charge,
    checkout,
    order,
}