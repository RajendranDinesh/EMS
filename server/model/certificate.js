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
    },
    fontFamily: {
        type: String,
        default: "Arial",
    },
    fontSize: {
        type: Number,
        default: 30,
    },
    fontColor: {
        type: String,
        default: "#000000",
    },
}, { timestamps: true });

const Certificate = mongoose.model("certificate", certificateSchema);

module.exports = { Certificate };