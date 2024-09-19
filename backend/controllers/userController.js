const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerUser = asyncHandler(async (req,res) => {
    
    const {name, email, password} = req.body;
     
    if(!name || !email || !password) {
       res.status(400)
       throw new Error("Please Fill All Details");
    }

    // Find If User Already Exist

      const userExist = await User.findOne({email : email});
    
       if (userExist){
        res.status(401)
         throw new Error ('User Already Exist');
       }
    
    // Hash Password
     const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

    const user = await User.create ({
        name,
        email,
        password : hashedPassword,
    });

    if (!user){
        res.status(401);
        throw new Error ("Cannot Create User");
    }else{
        res.json({
          id : user._id,
          name : user.name,
          email : user.email,
          token : generateToken(user._id),
        });
    };
});

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
     
    if( !email || !password) {
       res.status(400)
       throw new Error("Please Fill All Details");
    }

    // Find If User Exist
    const user  = await User.findOne({email : email})

    // Compare Password
    if(user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            token :generateToken(user._id),
          });
    }else{
        res.status(400);
        throw new Error("Invalid Credentails");
    }
});

// Secret Controller
 const secretController = (req,res) => {
    res.send("I am Protected Route")
 }

const generateToken = (id) => {
    return jwt.sign({id : id}, process.env.jWT_SECRET, {
     expiresIn: "500d"
    });
}

module.exports = {registerUser,loginUser,secretController}
