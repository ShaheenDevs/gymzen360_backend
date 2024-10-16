const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication failed: Token not provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Authentication failed: Invalid token" });
        }

        // Attach user information to the request object
        req.userData = {
            userId: decoded.userId,
            email: decoded.email
        };

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = checkAuth;
