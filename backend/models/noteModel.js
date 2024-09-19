const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : false,
        },
        ticket : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Ticket',
            required : false,
        },
        Comment : {
            type : String,
            required : [false, "Please Describe Your Comment"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note",noteSchema);