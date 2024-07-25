const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    notes = {
        user: "34",
        data: "You have no any data."
    }
    
    res.json(notes);
})

module.exports = router;