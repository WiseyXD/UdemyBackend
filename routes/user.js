const express = require("express");
const {Router} = express;
const router = Router();
const userMiddleware = require("../middlewares/user");
const {User,Course} = require("../db/index")
router.use(userMiddleware);

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    try {
        const exists = User.findOne({username : username});
        if(exists)
        {
            throw new Error("User already exists!");
        }
        const user = new User({
            username,
            password
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


router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router;