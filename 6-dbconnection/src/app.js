const express = require("express");
const connectDB = require("./config/db");// may be we dont write our comman parent name in address "./,,"
const NotesModel = require("./models/note.model");
const createNotesController = require("./controllers/notes.controller");
const notesRoute = require("./routes/notes.route");
const app = express();
// use links anything with express.
app.use(express.json());
// mongoose do all operations in promises so we have to use async await to get the data from it.
connectDB();

app.use("/notes", notesRoute);
module.exports = app;