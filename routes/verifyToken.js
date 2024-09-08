const config = require("../config/config.json");
const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{

    const authHeader = req.header.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.SECRET_KEY,(err,user)=>{
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("you are not authenticated!");
    }

};

module.exports = {verifyToken};