const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    name : { 
           type : String, 
           require : [true, 'Please Fill Name']
        },
    email : {
        type : String, 
        unique : true,
        require : [true, 'Please Fill email']
    },
    password : {
        type : String, 
        require : [true, 'Please Fill Password']
    }, 
    isAdimn : {
        type : Boolean, 
        default : false,
    }, 

},{
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);
