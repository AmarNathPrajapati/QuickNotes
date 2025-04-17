const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("adfadf__dsf",token);
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("adfaasdfdf__",decode)
            req.user = await User.findById(decode._id).select("-password")
            console.log("adffasdfadf__adfdf",req.user);
            next();
        } catch (error) {
            console.error(error.message);
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not Authorized, No token')
    }
})
const adminOnly = (req,res,next) =>{
    console.log("adsfasfasdf___fadsf",req.user);
    if(req.user && req.user.role ==='admin'){
        next();
    }else{
        res.status(403).json({message:"Action denied, Admin Only"});
    }
}
module.exports = {protect ,adminOnly};