const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateTokens");
const cloudinary = require("../config/cloudinary");

//user Regirstration
const registerUser = asyncHandler(async (req, res) => {
    //input validation
    const { name, email, password, role } = req.body;
    if (!(name || email || password)) {
        res.status(400);
        throw new Error("please fill all fields");
    }
    //check unique use
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User Already exist");
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    //create User
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("adsfasdfad__", email, password);
    const user = await User.findOne({ email })
    console.log("asdsfasdf__", user);
    const userPassword = await bcrypt.compare(password, user.password);
    if (user && userPassword) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })
    } else {
        res.status(401);
        throw new Error("Invalid user name or password")
    }
})
//privae route
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const uploadProfileImage = asyncHandler(async (req, res) => {
    try {
        console.log("adsfdfdsf___asdfadfs");
        const id = req.params.id;
        if (!req.files || !req.files.image) {
            res.status(400);
            throw new Error("No Image file uploaded")
        }
        console.log("adfadsf___adfsadsf", id);
        const user = await User.findOne({ _id: id, isDeleted: false });
        console.log("sdfasdffsdf__", user);
        if (!user) {
            res.status(403)
            throw new Error("User not found asdfasdf asdfasfd")
        }
        const file = req.files.image;
        console.log("sdfsaasdfsadfewdf", file);
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'profile_pics'
        });
        console.log("asdfdsf__sdf", result);
        user.profileImage = result.secure_url;
        await user.save();
        res.status(200).json({
            message:"Image uploaded successfully",
            profileImage: user.profileImage
        })
    } catch (error) {
        console.error("Upload Error:", error); 
        res.status(500).json({
            success: false,
            error: error.message || "Something went wrong"
        });
    }

})
module.exports = { registerUser, loginUser, getMe, uploadProfileImage };