const mongoose = require("mongoose");
//OOPs: schema is a class and new is for making an object of that class.
let notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
    }
})
// model creates a collection and notes is the name of that collection.
const NotesModel = mongoose.model("notes", notesSchema);
module.exports = NotesModel;