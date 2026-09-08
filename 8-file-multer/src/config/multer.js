const multer = require("multer");

const storageForLocal = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        console.log("in filename->",file);
        cb(null, Date.now()+file.originalname);
    },
})

const storageForServer = multer.memoryStorage();
// you get buffer as the chunks and these chunks go to the server.
// i gave all powers to upload of multer like app takes of express()
// when key and value are same in object you can write only key.
const upload = multer({storage: storageForLocal});// or {storage}

module.exports = upload;