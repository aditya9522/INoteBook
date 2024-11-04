const express = require('express');
const Tasks = require("../models/Tasks");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult, Result } = require('express-validator');

const router = express.Router();

// Creating loggedin user tasks using: POST "api/tasks/create-task". Login required
router.post('/create-task', [
    body('name', "Enter valid name").isLength({min:5}),
    body('description', "Enter valid description").isLength({min:10}),
    // body('tag', "Enter Task tag").isLength({min:1})
], fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ 
            status: false,
            isValid: false, 
            error: errors.array()
        });
    }

    try {
        const {name, description, status, tag} = req.body;
        const task = await Tasks.create({ name, description, status: status, tag, user: req.user.id});
        
        res.json({
            status: true,
            isValid: true,
            task
        });
        
    } catch (error) {
        res.status(500).send({
            status: false,
            isValid: false,
            error: "Internal server error!"
        });
        console.log(error);
    }
})

// Getting user tasks using: GET "api/tasks/fetch-tasks". Login required
router.get('/fetch-tasks', fetchuser, async (req, res) => {
    try {
        const tasks = await Tasks.find({user: req.user.id});
        res.json({
            status: true,
            isValid: true,
            tasks
        });

    } catch(error) {
        res.send({
            status: false,
            isValid: false,
            error: "Internal server error!"
        });
        console.log(error);
    }
})

// Update user tasks using: PUT "api/tasks/update-tasks/id". Login required
router.put('/update-task/:id', [
    body('name', "Enter valid name").isLength({min:3}),
    body('description', "Enter valid description").isLength({min:10}),
    // body('tag', "Enter task tag").isLength({min:1})
], fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false,
                isValid: false, 
                error: errors.array()
            });
        }
        
        const { name, description, status, tag } = req.body;

        const newTasks = {};
        if (name) { newTasks.name = name };
        if (description) { newTasks.description = description };
        if (status) { newTasks.status = status };
        if (tag) { newTasks.tag = tag };

        const oldTask = await Tasks.findById(req.params.id)

        if (!oldTask) {
            return res.status(404).send({ status: false, isvalid: false, notFound: true, msg: "Tasks not found!" });
        }

        if ( oldTask.user.toString() !== req.user.id ) {
            return res.status(401).send({ status: false, isvalid: false, isvalidUser: false, msg: "Not allowed" });
        }

        // if all is well then update the tasks
        const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, {$set: newTasks}, {new:true});
        res.json({ status: true, isvalid: true, task: updatedTask });

    } catch(error) {
        res.send({ status: false, isvalid: false, msg: "Internal server Error." });
        console.log(error);
    }
});


// remove user task using : DELETE "/api/tasks/remove-task/id".  Login required
router.delete("/remove-task/:id", fetchuser, async (req, res) => {
    try {

        const task = await Tasks.findById(req.params.id);
        
        if (!task){
            return res.status(404).send({ status: false, isvalid: false, notFound: true, msg: "Tasks not found!" })
        }

        if (task.user.toString() !== req.user.id){
            return res.status(401).send({ status: false, isvalid: false, isvalidUser: false, msg: "Not allowed" })
        }

        const deleted = await Tasks.findByIdAndDelete(req.params.id);
        res.json({ status: true, isvalid: true, isvalidUser: true, deleted });
    } catch (error) {
        res.status(500).send({ status: false, isvalid: false, msg: "Internal server Error." });
        console.log(error);
    }
})

// fetch all tasks using : GET "/api/tasks/fetch-all-tasks/".
router.get("/fetch-all-tasks/", async (req, res) => {
    try {
        const tasks = await Tasks.find();
        
        if (!tasks){
            return res.status(404).send({ status: false, msg: "Tasks are not available." })
        }

        res.json({ status: true, tasks });

    } catch (error) {
        res.status(500).send({ status: false, msg: "Internal server Error." });
        console.log(error);
    }
});


module.exports = router;