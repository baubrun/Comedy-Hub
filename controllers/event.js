const Events = require("../models/Events")
const sharp = require("sharp")


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
        id,
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
        _id: id
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
    }, (err) => {
        console.log(err)
        return res.json({
            success: false
        })
    })

}


module.exports = {
    read,
    remove,
    update,
}