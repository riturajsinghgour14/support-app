const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db.config');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app  = express();

const PORT = process.env.PORT || 5000 ;

// DB connection
  connectDB();

  // Body-Parser
   app.use(express.json());
   app.use(express.urlencoded({ extended : true}));
  
   
app.get("/" , (req, res) => {
    res.json({
        msg : "WELCOME SUPPORT API 1.0 ",
    });
});

// User Routes
app.use("/api/user", require("./routes/userRoutes"));

// Ticket Routes
app.use("/api/ticket", require("./routes/ticketRoutes"));



// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black);
});