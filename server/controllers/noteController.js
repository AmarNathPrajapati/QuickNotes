const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const createNote = asyncHandler(async(req,res)=>{
    const {title, content, tags} = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("Title and Content are required")
    }
    const note = await Note.create({
        title,
        content,
        tags,
        createdBy:req.user._id
    })
    res.status(201).json(note);
})

const getNotes = asyncHandler(async(req,res)=>{
    const notes = await Note.find({createdBy:req.user._id,isDeleted:false})
    res.json(notes)
})

const getNoteById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const note = await Note.findOne({_id: id, isDeleted:false})
    if(!note){
        res.status(404);
        throw new Error("Note not found")
    }
    if(note.createdBy.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("Not Authorized")
    }
    res.json(note);
})
const updateNote = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const note = await Note.findById({_id: id, isDeleted:false});
    if(!note){
        res.status(404);
        throw new Error("Note not found")
    }
    if(note.createdBy.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("Unauthorized access")
    }
    const {title, content, tags} = req.body;
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;

    const updatedNote = await note.save();
    res.json(updatedNote);
})
const deleteNote = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    console.log("adfsadsfasdf__",id);
    const note = await Note.findOne({_id: id, isDeleted:false});
    console.log("adsfadfdfs___asdf",note);
    if(!note){
        res.status(404);
        throw new Error("Note note found")
    }
    if(note.createdBy.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("Unauthorized Access")
    }
    note.isDeleted = true;
    await note.save();
    res.status(200).json({message:"Note deleted Successfully", id:note._id})

})

module.exports ={
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}