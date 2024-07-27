const express = require('express');
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find(req.user.id);
        res.json(notes);

    } catch {
        res.send("Internal server Error.");
    }
    
})

module.exports = router;