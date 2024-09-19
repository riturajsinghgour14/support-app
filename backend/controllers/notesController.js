const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel")

const getNotes = asyncHandler(async (req,res) => {
 

 // Find if user exist in db using jwt
 const user = await User.findById(req.user._id.toString());

 if(!user){
   res.status(400)
   throw new Error('user Invalid Request')
 }

 console.log(req.params.ticketId)

// Find if Ticket Exist 
const ticket = await Ticket.findById(req.params.ticketId);
if(!ticket) {
    res.status(400)
   throw new Error(' ticket Invalid Request');
}

const notes = await Note.find({ticket : req.params.ticketId});

if(!notes) {
    res.status(404)
    throw new Error('Notes Note Found!!');   
}
  
res.status(200).json(notes);

});


const addNote = asyncHandler(async (req,res) => {
 
    const {comment} = req.body;

    if(!comment){
      res.status(401)
      throw new Error('Please Add Comment!!')
    }

  // Find if user exist in db using jwt
  const user = await User.findById(req.user._id.toString());
 
  if(!user){
    res.status(400)
    throw new Error('user Invalid Request')
  }
 
  console.log(req.params.ticketId)
 
 // Find if Ticket Exist 
 const ticket = await Ticket.findById(req.params.ticketId);
 if(!ticket) {
     res.status(400)
    throw new Error(' ticket Invalid Request');
 }
 
 const note = await Note.create({
  user : req.user.id,
  ticket : req.params.ticketId,
  comment : comment,
 })
   
 res.status(200).json(note);
 
 });
 

module.exports = {getNotes , addNote};