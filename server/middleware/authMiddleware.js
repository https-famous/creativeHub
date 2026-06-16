const { response } = require("express");
const jwt=require("jsonwebtoken");       // Requires  the json webtoken and stores it into jwt

const authMiddleware = (req, res, next) => {

    // get token from request headers
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // no token
    if (!token) {
        return res.status(401).json({
            message: "Access denied"
        });
    }

    try {

        // verify token
        const verified = jwt.verify(token, "secretkey");

        // save decoded user data
        req.user = verified;

        // continue
        next();

    } catch (err) {

        res.status(400).json({
            message: "Invalid token"
        });

    }

};
    module.exports=authMiddleware;
