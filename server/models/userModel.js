const mongoose = require('mongoose')
const userSchema =new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please add name"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "please add email"],
            lowercase:true,
            unique:true
        },
        password: {
            type: String,
            required:[true,"please add password"],
            minlength: 6
        },
        profileImage:{
            type:String,
            default:""
        },
        role:{
            type:String,
            enum:['admin','user'],
            default:'user'
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }

)
const User = mongoose.model('User', userSchema)
module.exports = User;