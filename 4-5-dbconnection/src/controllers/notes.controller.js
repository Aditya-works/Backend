const NotesModel = require("../models/note.model");

const createNotesController = async (req,res)=>{
    try{
    let {title, description} = req.body;
    const newNote = await NotesModel.create({
        title,
        description,
    }) 
    return res.status(201).json({
        message: "note created successfully",
        data: newNote,
    })
    } catch (error) {
        console.log("error while creating note", error);    
    }
}

module.exports = createNotesController;