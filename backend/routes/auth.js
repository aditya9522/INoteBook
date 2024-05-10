const express = require('express');
const User = require('../models/User');
const { body, validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "iamaditya*p";

const router = express.Router();

// Create a User using: POST "api/auth/ceateuser". No login required
router.post('/createuser', [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 }),
], async (req, res) => {
    try {    
        // validation of data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });    // to response bad request and msg 
        }
    
        // checking the user exists with the same email
        let isExists = await User.findOne({email: req.body.email});
        if (isExists) {
            return res.status(400).json({status: "User exists", msg: "The user already exists with this mail."})
        }
        
        // Password hashing and salting
        const salt = await bcrypt.genSalt(10);
        const securePasswd = await bcrypt.hash(req.body.password, salt);    // hashed password. Noone can crack this.

        // storing an user to DB
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePasswd
        });
        
        const 

        res.json({status: "User created!"});
        console.log(user);
    } catch (error) {
        res.send('Some error occured!');
        console.log(error.message);
    }
});

module.exports = router;