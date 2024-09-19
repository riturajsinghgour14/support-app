const asyncHandler = require("express-async-handler")
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


const getTickets = asyncHandler(async (req,res) => {

    // Find if user exist in db using jwt
    const user = await User.findById(req.user._id)
     
    if(user){
        const tickets = await Ticket.find({user: user._id});
        res.status(200);
        res.json(tickets);
    }else{
        res.status(400)
        throw new Error ("Cannot Find Tickets");
    }
});

const getTicket = asyncHandler(async (req,res) => {
     console.log(req.user)     

  // Find if user exist in db using jwt
  const user = await User.findById(req.user._id)
    // console.log(user) 

  if(user){
      const tickets = await Ticket.find({user: req.user.id});
      res.status(200);
      res.json(tickets);
  }else{
      res.status(400)
      throw new Error ("Cannot Find Tickets");
  }
});

const addTicket = asyncHandler(async (req,res) => {
  
    const {product , description} = req.body

    if(!product || !description){
        res.status(401)
        throw new Error('Please Fill All Details!')
    }

      // Find if user exist in db using jwt
      const user = await User.findById(req.user._id)

      if(!user){
        res.status(400)
        throw new Error('Invalid Request')
      }

      const ticket = await Ticket.create({
        user : req.user._id,
        product : product,
        description : description,
        status : 'new'
      })
       
      if(!ticket){
        res.status(401)
        throw new Error("Ticket Cannot Be Created!");
      }
      res.status(201).json(ticket);  
});

// Update ticket
const updateTicket = asyncHandler(async (req,res) => {
  
      // Find if user exist in db using jwt
      const user = await User.findById(req.user._id)

      if(!user){
        res.status(400)
        throw new Error('Invalid Request')
      }

     const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body , {new : true})


      if(!updatedTicket){
        res.status(401)
        throw new Error("Ticket Cannot Be Created!");
      }
      res.status(201).json(updatedTicket);  
});

module.exports = {getTickets, addTicket , updateTicket , getTicket};