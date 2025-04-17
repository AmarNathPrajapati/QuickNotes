const express = require('express');
const {protect} = require('../middleware/authmiddleware');
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();
router.route('/')
    .post(protect,createNote)
    .get(protect,getNotes)
router.route('/:id')
    .get(protect,getNoteById)
    .put(protect,updateNote)
    .delete(protect,deleteNote)

module.exports = router;