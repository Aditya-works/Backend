const NotesModel = require("../models/note.model");

const singleEntityUpdateController = async (req,res)=>{
try{
        let noteId = req.params.id;
        let body = req.body;
        const updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {new:true});// third operator for getting the new response updated data in api result
        return res.status(200).json({
            message: "note updated successfully",
            data: updatedNote,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

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

const getAllNotesController = async (req, res)=>{
    try{
        const allNotes = await NotesModel.find()
        res.status(200).json({
            message: "all notes fetched successfully",
            data: allNotes,
        })
    }
        catch (error) {
            console.log("error while fetching all notes", error);
        }
}

const getNoteByIdController = async (req, res) => {
    try{
        let noteId = req.params.id;
        const note = await NotesModel.findById(noteId);
        res.status(200).json({
            message: "note fetched successfully",
            data: note,
        })
    }
    catch (error) {
        console.log("error while fetching note by id", error)
    }
}

const updatedNotesController = async (req, res) =>{
    try{
        let noteId = req.params.id;
        let body = req.body;
        const updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {new:true});// third operator for getting the new response updated data in api result
        return res.status(200).json({
            message: "note updated successfully",
            data: updatedNote,
        })
    }
    catch (error) {
        console.log("error while updating note", error)
    }
}

const deleteNoteController = async (req, res) =>{
    try{
        let noteId = req.params.id;
        await NotesModel.findByIdAndDelete(noteId);

        return res.status(200).json({
            message: "deleted"
        })

    }
    catch (error){
        console.log("error in delete api",error)
    }
}

module.exports = {getNoteByIdController, getAllNotesController, createNotesController, updatedNotesController, deleteNoteController,singleEntityUpdateController};