const mongoose = require("mongoose")


const ticketSchema = new mongoose.Schema({

    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true,
    },
    product : {
        type : String,
        enums : ['iPhone' , 'iPad', 'iMac' , 'iWatch' , 'Macbook'],
        require : true,
    },
    description : {
        type : String,
        require : [true , ' Please Type Description'],
    },
    status : {
        type : String,
        enums : ['open' , 'new' , 'close'],
        default : 'new',
        require : true,
    },

}, {
    timestamps : true,
})

module.exports = mongoose.model('Ticket', ticketSchema)