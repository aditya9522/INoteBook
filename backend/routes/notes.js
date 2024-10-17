const express = require('express');
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult, Result } = require('express-validator');

const router = express.Router();

// Creating loggedin user notes using: POST "api/notes/createNotes". Login required
router.post('/createNotes', [
    body('title', "Enter valid title").isLength({min:3}),
    body('description', "Enter valid description").isLength({min:10}),
    body('tag', "Enter notes tag").isLength({min:1})
], fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const {title, description, tag} = req.body;
        const note = await Notes.create({ title, description, tag, user: req.user.id });
        
        res.json({
            "msg": "Notes added successfully.",
            "Notes": note
        })

    } catch (error) {
        res.status(500).send({
            "msg": "Internal server error!"
        });
        console.log(error);
    }
})

// Getting user notes using: GET "api/notes/fetch-notes". Login required
router.get('/fetch-notes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);

    } catch(error) {
        res.send("Internal server Error.");
        console.log(error);
    }
    
})

// Update user notes using: PUT "api/notes/update-notes/id". Login required
router.put('/update-notes/:id', [
    body('title', "Enter valid title").isLength({min:3}),
    body('description', "Enter valid description").isLength({min:10}),
    body('tag', "Enter notes tag").isLength({min:1})
], fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNotes = {}
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        const oldNotes = await Notes.findById(req.params.id)

        if (!oldNotes) {
            return res.status(404).send("Notes not found!");
        }

        if ( oldNotes.user.toString() !== req.user.id ) {
            return res.status(401).send("Not allowed");
        }

        // if all is well then update the notes

        const updatedNotes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new:true});
        res.json(updatedNotes);

    } catch(error) {
        res.send("Internal server Error.");
        console.log(error);
    }
    
})


// remove user notes using : DELETE "/api/notes/remove-notes/id".  Login required
router.delete("/remove-notes/:id", fetchuser, async (req, res) => {
    try {

        const notes = await Notes.findById(req.params.id);
        
        if (!notes){
            return res.status(404).send("Invalid notes id!")
        }

        if (notes.user.toString() !== req.user.id){
            return res.status(401).send("You are not allowed!")
        }

        const deleted = await Notes.findByIdAndDelete(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
})

// fetch all notes using : GET "/api/notes/fetch-all-notes/".
router.get("/fetch-all-notes/", async (req, res) => {
    try {

        const notes = await Notes.find();
        
        if (!notes){
            return res.status(404).send("Notes are not available at the time.")
        }

        res.json(notes);

    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error);
    }
})


module.exports = router;