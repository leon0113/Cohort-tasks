const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const userName = req.body.username;
    const pass = req.body.password;
    User.create({
        username: userName,
        password: pass
    });

    res.json({
        message: 'User created successfully'
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.json({ allCourses })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const userName = req.headers.username;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            // If no course found with the given courseId
            return res.status(404).send("No course available with the given course id");
        }

        const user = await User.findOne({ username: userName });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.purchasedCourses.includes(course._id)) {
            // If course already purchased by the user
            return res.json({ msg: "Course already purchased" });
        }

        await User.updateOne({
            username: userName
        }, {
            $push: {
                purchasedCourses: course._id
            }
        });

        return res.json({ msg: "Course purchased successfully" });
    } catch (error) {
        // Handle any errors that occur during the database query
        // For example, if there's an issue with the database connection
        console.error(error); // Log the error for debugging
        return res.status(500).send("Internal Server Error");
    }
});



// router.get('/purchasedCourses', userMiddleware, async (req, res) => {
//     // Implement fetching purchased courses logic
//     const user = await User.findOne({
//         username: req.headers.username
//     });

//     // console.log(user.purchasedCourses);
//     const courses = await Course.find({
//         _id: {
//             "$in": user.purchasedCourses
//         }
//     });

//     res.json({
//         courses: courses
//     })
// });

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    // Create a set of unique course ids
    const uniqueCourseIds = new Set(user.purchasedCourses);

    // Array to store all found courses
    const courses = [];

    // Query for each unique course id
    for (const courseId of uniqueCourseIds) {
        const course = await Course.findOne({
            _id: courseId
        });
        if (course) {
            courses.push(course);
        }
    }

    res.json({
        courses: courses
    });
});


module.exports = router