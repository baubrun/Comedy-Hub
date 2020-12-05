const Events = require("../models/Events")
const mongoose = require("mongoose")
const path = require("path")
const onFinished = require("on-finished")


const create = async (req, res) => {
    const {
        files,
        body: {
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
        }
    } = req

    try {

        let file = files[0];
        if (files.length < 1) {
            return res.json({
                error: "Image required.",
            });
        } else {
            const regexList = [/\.jpe?g/i, /\.png/i]
            const ext = path.extname(file.originalname);
            if (regexList.some((x) => x === ext)) {
                return res.json({
                    error: "Invalid image type.",
                });
            }
        }

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
            image: file.filename,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter,
        })


        await newEvent.save()
        const events = await Events.find({});
        res.status(200).json({events: events})

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}



const read = async (req, res) => {
    try {
        const events = await Events.find({});
        return res.status(200).json({events: events})

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}


const remove = async (req, res) => {
    const {
        eventId
    } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(404).send(`No event with id: ${eventId}`);
        }
        await Events.findByIdAndDelete(eventId)

        const events = await Events.find({});
        return res.status(200).json({
            events: events
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

}


const update = async (req, res) => {
    const _id = req.params.eventId

    const {
        files,
        body: {
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
        }
    } = req

    try {

        let file = files[0];
        if (files.length < 1) {
            return res.json({
                error: "Image required.",
            });
        } else {
            const regexList = [/\.jpe?g/i, /\.png/i]
            const ext = path.extname(file.originalname);
            if (regexList.some((x) => x === ext)) {
                return res.json({
                    error: "Invalid image type.",
                });
            }
        }

        
        await Events.findByIdAndUpdate(_id,{
            title: title,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            venue: venue,
            performer: performer,
            price: price,
            hostId: hostId,
            image: file.filename,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter
        })

        
        const events = await Events.find({});
        return res.status(200).json({events: events})

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}


module.exports = {
    create,
    read,
    remove,
    update,
}