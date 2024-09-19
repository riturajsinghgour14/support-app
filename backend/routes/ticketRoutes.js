const express = require('express')
const { getTickets, addTicket, updateTicket, getTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()


router.get("/", protect , getTickets);
router.get('/:id', protect , getTicket);
router.post('/', protect , addTicket);
router.put('/:id', protect , updateTicket );

router.use('/:ticketId/note', require("./noteRoutes"));

module.exports = router;