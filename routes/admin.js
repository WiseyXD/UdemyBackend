const express = require("express");
const {Router} = express;
const router = Router();
const adminMiddleware = require("../middlewares/admin");

router.use(adminMiddleware);

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;