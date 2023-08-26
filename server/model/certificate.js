const mongoose = require("mongoose");
require('dotenv').config()

const certificateSchema = new mongoose.Schema({
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
    xCoordinate: {
        type: Number,
        default: 0,
    },
    yCoordinate: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Certificate = mongoose.model("certificate", certificateSchema);

module.exports = { Certificate };