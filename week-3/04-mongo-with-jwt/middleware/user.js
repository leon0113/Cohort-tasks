const jwt = require("jsonwebtoken")
const { JWT_TOKEN } = require("../config")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const header = req.headers.authorization;
    if (!header) return res.json({ message: "Access Denied" });
    const words = header.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_TOKEN);

    if (decodedValue.userName) {
        req.userName = decodedValue.userName;
        next()
    } else {
        res.status(403).json({
            msg: "Access denied"
        })
    }
}

module.exports = userMiddleware;