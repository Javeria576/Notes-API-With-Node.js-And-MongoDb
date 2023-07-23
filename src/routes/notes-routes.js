const express = require("express");
const {createNote, getNote, deleteNote, updateNote} = require("../controllers/notesController");
const auth = require("../middleware/auth");
const notesRoutes = express.Router();

notesRoutes.get("/get-notes", auth, getNote);
notesRoutes.post("/create-note",auth, createNote);
notesRoutes.delete("/delete-note/:id",auth, deleteNote);
notesRoutes.put("/update-note/:id",auth, updateNote);

module.exports = notesRoutes