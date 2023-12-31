const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Router} = express;
const router = Router();
const userMiddleware = require("../middlewares/user");

const jwtKey = "secret";

const {User,Course,Cart} = require("../db/index")

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    const hashPassword = await bcrypt.hash(password , 5);
    try {
        const exists = await User.findOne({username});
        if(exists)
        {
            throw new Error("User already exists!");
        }
        const user = new User({
            username,
            password : hashPassword
        })
        await user.save();
        res.status(201).json({
            msg : "User Created"
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
});

router.get("/login", async (req,res)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    // Login User
    try {   
        const exists = await User.findOne({username});
        if(!exists)
        {
            throw new Error("User doesnt exist");
        }

        if(!await bcrypt.compare(password , exists.password))
        {
            throw new Error("Passwrod didnt Match");
        }
        const token = await jwt.sign(username,jwtKey);
        const user = await User.findOneAndUpdate({username : username}, { $set: { token: token }});
        await user.save();
        res.status(200).json({
            msg : "Successfull Login"
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
})

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
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


// Main idea that is coming to my mind is to create a new CartSchema then assigning it also an user name so he can go there and add that course in cart and also see that cart 
// we will filter courses in CartSchema  by user's username


router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const id = req.params.id;
    try {
        const exists  = await Cart.findOne({id});
        if(exists)
        {
            throw new Error("Alread Bought Course")
        }
        const selectedCourse = await Course.findOne({id});
        const purchase = new Cart({
            username,
            course : selectedCourse
        })
        await purchase.save();
        res.status(201).json({
            msg : "Course Purchased"
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    try {
        const purchasedCourses = await Cart.find({username});
        res.status(200).json({
            purchasedCourses
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
});

module.exports = router;