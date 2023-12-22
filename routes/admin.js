const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { Router } = express;
const router = Router();
const adminMiddleware = require("../middlewares/admin");

const { Admin,Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    // Create new Admin
    try {
        const exists = await Admin.findOne({username : username});
        if(exists)
        {
            throw new Error("Admin already Exists");
        }
        const admin = new Admin({
            username: username,
            password: password,
        });
        await admin.save();
        res.status(201).json({
            msg : "Admin Created"
        })
    } catch (error) {
        res.status(500).json({
            msg : "Server Error "+error
        })
    }
    
});

router.post("/courses", adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const username = req.headers.username;
    const title = req.body.title;
    const description = req.body.description;
    const domain = req.body.domain;
    const imageLink = req.body.imageLink;
    const price = parseInt(req.body.price);

    try {
        const exists =await Course.findOne({title : title});
        if(exists)
        {
            throw new Error("Course already Exists");
        }
        const course = new Course({
            title,
            description ,
            author : username,
            domain ,
            imageLink,
            price,
            id:uuidv4(),
        })
        await course.save();
        res.status(201).json({
            msg : "Course Created"
        })
    } catch (error) {
        res.status(500).json({
            msg : "Server Error "+error
        })
    }
});

router.get("/mycourses", adminMiddleware,async (req, res) => {
    // Implement fetching all courses by author logic
    const username = req.headers.username;
    try {
        const allCoursesByAuthor = await Course.find({author : username});
        res.status(200).json({
            allCoursesByAuthor
        })
    } catch (error) {
        res.status(500).json({
            msg : "Server Error"+ error
        })
    }
});

router.get("/courses", adminMiddleware,async (req, res) => {
    // Implement fetching all courses by author logic
    try {
        const allCourses = await Course.find();
        res.status(200).json({
            allCourses
        })
    } catch (error) {
        res.status(500).json({
            msg : "Server Error"+ error
        })
    }
});

module.exports = router;
