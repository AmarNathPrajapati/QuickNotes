const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const getAllUsers = asyncHandler(async(req,res)=>{
    const allUsers = await User.find({isDeleted:false}).select('-password')
    if(allUsers){
        res.status(200).json(allUsers)
    }else{
        res.status(200).json({message:"No user exist"})
    }
})
const promoteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    console.log("asdfsasdfasd__",req.params.id);
    const user  = await User.findOne({_id:id,isDeleted:false});
    console.log("asdsfasfadsf__",user);
    if(!user){
        res.status(404).json({message:"User Not found"});
    }
    user.role = "admin";
    user.save();
    res.status(200).json({message:"user upgrade to admin"})
}) 
const deleteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    user.isDeleted = true;
    user.save();
    res.status(200).json({message: "user deleted successfully"})
})
module.exports = {
    getAllUsers,
    promoteUser,
    deleteUser
}