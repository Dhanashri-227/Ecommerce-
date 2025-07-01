const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.split(" ")[1]; // split by space
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                console.log(decoded);
                req.user = decoded;
                next(); // call next ONLY on success
            }
        });
    } else {
        return res.status(400).json({ message: "Token missing" });
    }
};

module.exports = verifyToken;
