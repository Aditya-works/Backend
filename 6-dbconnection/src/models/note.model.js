const mongoose = require("mongoose");
//OOPs: schema is a class and new is for making an object of that class.
let notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "description should be minimum 10 characters long"],
    }
})
// model creates a collection and notes is the name of that collection.
const NotesModel = mongoose.model("notes", notesSchema);
module.exports = NotesModel;