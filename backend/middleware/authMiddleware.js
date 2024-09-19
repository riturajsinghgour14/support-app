const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req,res,next) => {

    let token;

    // Check if request have authorization with bearer token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))

        {
            try {
                // Split Bearer And Token
                token = req.headers.authorization.split(" ")[1];
               
                // Verify token
                const decoded = await jwt.verify(token ,process.env.JWT_SECRET)
                

                // // Add User Into Req Object
                req.user = await User.findById(decoded.id).select("-password");
                
                // // Move To Next Function
                next();
            } catch (error) {
                res.status(400);
                throw new Error('Invalid Token')
            }
        } else{
            res.status(400);
            throw new Error('Unauthorised Access');
        }
        
});


module.exports = { protect };
