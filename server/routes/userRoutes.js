const express = require('express');
const {registerUser,loginUser,getMe, uploadProfileImage} = require('../controllers/userControllers');
const {protect, adminOnly} = require('../middleware/authmiddleware');
const { getAllUsers, promoteUser, deleteUser } = require('../controllers/adminController');
const loginLimiter = require('../middleware/loginLimiter');
const router = express.Router()
//public routes
router.post('/register',registerUser);
router.post('/login',loginLimiter, loginUser)
router.get('/me',protect,getMe)
router.get('/all',protect, adminOnly,getAllUsers)
router.patch('/promote/:id',protect, adminOnly, promoteUser)
router.delete('/:id',protect,adminOnly,deleteUser)
router.post('/upload-profile/:id',protect, uploadProfileImage)

module.exports = router;


