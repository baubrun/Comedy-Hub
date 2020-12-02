const Events = require("../models/Events")
const sharp = require("sharp")
const mongoose  = require("mongoose")

/* finish create*/

const create = async (req, res) => {
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
        facebook,
        instagram,
        twitter,
        hostId,
    } = req.body

    const newEvent = new Events({
       
        title: title,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        venue: venue,
        performer: performer,
        price: price,
        hostId: hostId,
        image: !req.file ? "" : img,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
    
    })
    try {

    // if (req.file) {
    //     img = req.file.originalname

    //     sharp(req.file.path)
    //         .resize(450, 450)
    //         .toFile(`./uploads/${img}`, (err) => {
    //             if (err) {
    //                 console.log("sharp:", err)
    //             }
    //         })
    // }

        await newEvent.save()
        const events = await Events.find({});
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}



const read = async (req, res) => {
    try {
        const events = await Events.find({});
        return res.status(200).json(events)

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}


const remove = async (req, res) => {
    const {eventId} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(404).send(`No event with id: ${eventId}`);
        }
        await Events.findByIdAndDelete(eventId)

        const events = await Events.find({});
        return res.status(200).json({events :events})

      

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

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
        return res.status(200).json({
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