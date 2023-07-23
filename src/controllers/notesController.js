const notesModel = require("../model/notes-model");

const createNote = async (req, res) => {

    const {title, description} = req.body;
    const createdNote = new notesModel({
        title : title,
        description : description,
        userId : req.userId
    });

    try{
        await createdNote.save();
        res.status(201).json(createdNote)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}
const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const {title, description} = req.body;
    const updatedNote = {
        title : title,
        description : description,
        userId : req.userId
    }

    try{
        await notesModel.findByIdAndUpdate(noteId, updatedNote, {new: true})
        res.status(201).json(updatedNote)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}
const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try{
        const deletedNote = await notesModel.findByIdAndRemove(noteId)
        res.status(201).json(deletedNote)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}
const getNote = async (req, res) => {

    try{
        const notes = await notesModel.find({userId : req.userId})
        res.status(201).json(notes)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote
}