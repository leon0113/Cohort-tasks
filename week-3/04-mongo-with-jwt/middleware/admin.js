const jwt = require("jsonwebtoken")
const { JWT_TOKEN } = require("../config")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const header = req.headers.authorization;
    // console.log(header);
    // if (!header) return res.json({ message: "Access Denied" });
    const words = header.split(" ");

    const jwtToken = words[1];

    const decodedValue = jwt.verify(jwtToken, JWT_TOKEN);

    console.log(decodedValue);
    if (decodedValue.userName) {
        // console.log("object");
        next()
    } else {
        res.status(403).json({
            msg: "Access denied"
        })
    }
}

module.exports = adminMiddleware;