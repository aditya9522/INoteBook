const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a User using: POST "api/auth/". Doesn't require Auth
router.post('/', [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(() => res.json({status: 'success', msg: 'User created successfully in DB!', error:null}))
    
    .catch(err => {console.log(err)

    res.json({error: 'Enter valid data', msg: err.message})});
    console.log(req.body);
});

module.exports = router;