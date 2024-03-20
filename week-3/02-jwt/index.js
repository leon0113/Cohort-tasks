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


const usernameZod = z.string().email();
const passwordZod = z.string().min(6);

function signJwt(username, password) {
    // Your code here
    try {
        const userName = usernameZod.safeParse(username);
        const pass = passwordZod.safeParse(password);

        if (!userName.success || !pass.success) return null;

        return jwt.sign({ userName, pass }, jwtPassword);
    } catch (error) {
        console.log(error);
    }

}
// console.log("token: ", signJwt("tahjib@gmail.com", "leon1234"));
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
        if (jwt.verify(token, jwtPassword)) {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        return error;
    }
}
// console.log(verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6eyJzdWNjZXNzIjp0cnVlLCJkYXRhIjoidGFoamliQGdtYWlsLmNvbSJ9LCJwYXNzIjp7InN1Y2Nlc3MiOnRydWUsImRhdGEiOiJsZW9uMTIzNCJ9LCJpYXQiOjE3MTA3ODU4NTZ9.s1AcgnbT9vUP0nuSatU_sOGncGmRnlH-D0ioVV4fwLc"));
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
    if (decodedToken) {
        return true;
    } else {
        return false;
    }
}
console.log(decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6eyJzdWNjZXNzIjp0cnVlLCJkYXRhIjoidGFoamliQGdtYWlsLmNvbSJ9LCJwYXNzIjp7InN1Y2Nlc3MiOnRydWUsImRhdGEiOiJsZW9uMTIzNCJ9LCJpYXQiOjE3MTA3ODU4NTZ9.s1AcgnbT9vUP0nuSatU_sOGncGmRnlH-D0ioVV4fwLc"));


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
