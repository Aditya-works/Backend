const express = require("express");
const {createNotesController, getAllNotesController, getNoteByIdController, updatedNodesController, updatedNotesController, deleteNoteController} = require("../controllers/notes.controller");



const router = express.Router();    
router.post("/create", createNotesController);
router.get("/allnotes", getAllNotesController);
router.get("/:id", getNoteByIdController);
router.put("/:id",updatedNotesController);
router.delete("/:id", deleteNoteController);
module.exports = router;