const Events = require("../models/Events")
const sharp = require("sharp")


const create = async (req, res) => {
    const event = req.body
    const newEvent = new Events(event)
    try {
        await newEvent.save()
        return res.status(200).json(newEvent)
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}



const read = async (req, res) => {
    try {
        const events = await Events.find({});
        return res.json(events)

    } catch (error) {
        return res.json({
            success: false
        })
    }
}


const remove = async (req, res) => {
    const {
        _id
    } = req.body
    await Events.deleteOne({
        _id
    }, (err, evt) => {
        if (err) {
            return res.json({
                success: false,
                err: err
            })
        } else {
            return res.json({
                success: true,
                dc: evt.deletedCount,
                id: _id
            })
        }
    })
}


const update = async (req, res) => {
    let img;
    const {
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        venue,
        performer,
        price,
        _id,
        facebook,
        instagram,
        twitter,
    } = req.body

    if (req.file) {
        img = req.file.originalname

        sharp(req.file.path)
            .resize(450, 450)
            .toFile(`./uploads/${img}`, (err) => {
                if (err) {
                    console.log("sharp:", err)
                }
            })
    }

    await Events.updateOne({
        _id: _id,
        
    }, {
        title: title,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        venue: venue,
        performer: performer,
        price: price,
        image: !req.file ? "" : img,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
    }, {options: {upsert: true}}, (err) => {
        console.log(err)
        return res.json({
            success: false
        })
    })

}


module.exports = {
    create,
    read,
    remove,
    update,
}