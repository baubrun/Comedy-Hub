const bcrypt = require("bcryptjs")
const SALT = 10
const User = require("../models/User")




const read = async (req, res) => {
    const {
        username,
        password
    } = req.body
    try {
        let user = await User.findOne({
            username: username,
        });

        if (!user) {
            return res.status(400).json({
                error: "User not found."
            });
        }
        console.log('user', user)

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid Email or password.",
            });
        } else {
            return res.status(200).json({
                hostId: user.hostId
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};


const create = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const emailExists = await User.findOne({
        username: username
    })

    if (emailExists) {
        return res.status(401).json({
            error: "User already registered."
        })
    }

    const hashedPassword = await bcrypt.hash(password, SALT)

    const user = new User({
        username: username,
        password: hashedPassword,
    })
    try {
        await user.save()
        return res.status(200).json({
            // hostId: user.hostId
           user
        })
        // return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    create,
    read,
   
}