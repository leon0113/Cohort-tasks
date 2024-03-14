const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require('zod');


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 * 
 */

// const zodShema = z.object({
//     username: string().email(),
//     password: string().min(6)
// })

const usernameZod = z.string().email();
const passwordZod = z.string().min(6);

function signJwt(username, password) {
    // Your code here
    try {
        const userName = usernameZod.parse(username);
        const pass = passwordZod.parse(password);

        if (!userName.sucess || !pass.sucess) return null;

        return jwt.sign({ userName, pass }, jwtPassword);
    } catch (error) {
        console.log(error);
    }

}
const token = signJwt("leon@gmail.com", "leon123");
// console.log("token: ", token);
/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
    try {
        const verification = jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}
const verifyToken = verifyJwt(token);
// console.log(verifyToken);
/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    if (decodedToken) {
        return true;
    } else {
        return false;
    }
}
const res = decodeJwt(token);
console.log(res);


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
