const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Add a title"]
        },
        content:{
            type:String,
            required:[true, "Add a conten"]
        },
        tags:[String],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        isDeleted:{
            type: Boolean,
            default:false
        }
    },
    {
        timestamps:true,
    }
)
const Note = mongoose.model('Note',noteSchema);
module.exports = Note;