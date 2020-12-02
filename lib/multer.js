const multer = require( "multer")
const path = require( "path")
const fs = require( "fs")


const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1000)




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + "-" + uniqueSuffix + ext)
    }
})




 const moveFilesToApp = () => {
    let rootPath = process.cwd()
    let imgPath = rootPath + "/uploads"
    let newPath = rootPath + "/src/images"
    let found = []
    try {
        fs.readdir(imgPath, (err, files) => {
            if (err) {
                throw err
            }
            files.forEach(f => {
                found.push(f)
            })

            found.forEach(f => {
                fs.rename(`${imgPath}/${f}`, `${newPath}/${f}`, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })

        })
    } catch (error) {
        console.log("error: moveFilesToApp :>>", error)
    }

}

module.exports = {
    moveFilesToApp,
    storage,
}