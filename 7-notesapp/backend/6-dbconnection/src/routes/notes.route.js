const express = require("express");
const {createNotesController, getAllNotesController, getNoteByIdController, updatedNodesController, updatedNotesController, deleteNoteController, singleEntityUpdateController} = require("../controllers/notes.controller");

const router = express.Router(); 

router.post("/create", createNotesController);
router.get("/allnotes", getAllNotesController);
router.get("/:id", getNoteByIdController);
router.put("/:id",updatedNotesController);
router.delete("/:id", deleteNoteController);
router.patch("/:id/single",singleEntityUpdateController)
module.exports = router;