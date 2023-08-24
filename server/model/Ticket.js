const mongoose = require("mongoose");
require('dotenv').config()

const ticketSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
    },
    backgroundImage: {
        type: String,
        default: "",
    },
    backgroundImageId: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };