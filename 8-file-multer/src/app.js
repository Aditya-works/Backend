const express = require("express");
const app = express();
const fileRoute = require("./routes/file.route")
// res.send comes on webpage.
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("backend running succesfully")
})

app.use("/file", fileRoute)
module.exports = app