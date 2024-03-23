const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const userName = req.body.username;
    const pass = req.body.password;
    Admin.create({
        username: userName,
        password: pass
    });

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const titleReq = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCreatedCourse = await Course.create({
        title: titleReq,
        description: description,
        price: price,
        imageLink: imageLink
    })

    res.json({
        message: `Course named ${newCreatedCourse.title} is created successfully`, courseId: newCreatedCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({ allCourses });
});

module.exports = router;