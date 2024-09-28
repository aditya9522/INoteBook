const express = require('express');
const User = require('../models/User');
const { body, validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "iamaditya*p";
const fetchuser = require('../middleware/fetchuser')

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
            return res.status(400).json({status: "User already exists.", msg: "The user already exists with this mail."});
        }
        
        // Password hashing and salting
        const salt = await bcrypt.genSalt(10);
        const securePasswd = await bcrypt.hash(req.body.password, salt);    // hashed password. No-one can crack this.

        // storing an user to DB
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePasswd
        });

        console.log("UserID: ", user);
        
        // generating Token to response for the user
        const data = {
            user : {
                id: user.id
            }
        }
        console.log(user.id);
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
        res.status(500).send('Internal server error!');
        console.log(error.message);
    }
});

// Logging a User using: POST "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});   // matches email from db and returns a object with user details

        if (!user) {
            return res.status(400).json({msg: "Please enter correct login credential."});
        }
        const isAuth = await bcrypt.compare(password, user.password);   // comparing password 

        if (!isAuth) {
            return res.status(400).json({msg: "Please enter correct login credential."});
        }

        const data = {
            user : {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});


// Getting logged in user details :  POST "api/auth/getUser".  LogIn required

router.post('/getUser', fetchuser, async (req, res) => {                  // fetchuser : a middleware to fetch the users data
    try {
        const userId = req.user.id;
        const data = await User.findById(userId).select("-password");
        res.send(data);

    } catch (error) {
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});


module.exports = router;