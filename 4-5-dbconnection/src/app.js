const express = require("express");
const connectDB = require("./config/db");// may be we dont write our comman parent name in address "./,,"
const NotesModel = require("./models/note.model");


const app = express();
app.use(express.json());
app.get("/",(req,res)=>{res.send("got it");});
// mongoose do all operations in promises so we have to use async await to get the data from it.
connectDB();
app.post("/create", async (req,res)=>{
    let {title, description} = req.body;
    const newNote = await NotesModel.create({
        title,
        description,
    })
    res.send({
        success: true,
        message: "note created successfully",
        data: newNote,
    })
})
module.exports = app;