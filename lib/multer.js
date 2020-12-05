const multer = require( "multer")
const path = require( "path")

const secs = new Date()
const uniqueSuffix =   Date.now() + secs.getSeconds() * Math.floor(Math.random() * 10000000)


const dest = "./public/"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = file.originalname.split(".")[0]
        cb(null, `${filename}-${uniqueSuffix}${ext}`)
    }
})


module.exports = {
    storage,
}