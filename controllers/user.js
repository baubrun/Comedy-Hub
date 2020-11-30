const bcrypt = require("bcryptjs")
const SALT_FACTOR = 10
const User = require("../models/User")




const read = async (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log('req.body read user', req.body)
    try {
        let user = await User.findOne({
            username: username,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found.",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.json({
                success: false,
                error: "Invalid Email or password.",
            });
        } else {

            return res.json({
                success: true,
                hostId: user.hostId
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }
};


const create = async (req, res) => {
    const {
        username,
        password,
        email,
        hostId
    } = req.body

    await User.findOne({
        username: username
    }, async (err, user) => {
        if (err) {
            return res.json({
                success: false
            })
        }
        if (user) {
            return res.json({
                msg: "Username already exists."
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_FACTOR)

            try {

                const newUser = User({
                    username: username,
                    password: hashedPassword,
                    email: email,
                    hostId: hostId,
                    events: "",
                    dateAdded: new Date()
                })
                await newUser.save()

                return res.json({
                    success: true,
                    hostId: hostId
                })
            } catch (error) {
                console.log(error)
                return res.json({
                    success: false
                })
            }
        }
    })
}

module.exports = {
    read,
    create,
}