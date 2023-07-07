const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
require('dotenv').config()

dbConnect();

const eventSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
        unique: true,
    },
    Organisation: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
    },
    Location: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
    },
    Price: {
        type: Number,
        required: true,
        default: 0,
    },
    Start_Date: {
        type: Date,
        default: "04/01/2023",
    },
    End_Date: {
        type: Date,
        default: "05/01/2023",
    },
    Registration_Start_Date: {
        type: Date,
        default: "01/01/2023",
    },
    Registration_End_Date: {
        type: Date,
        default: "03/01/2023",
    },
    Participants: {
        type: Number,
        required: true,
        default: 100,
    },
    Maximum_Participants:{
            type: Number,
            required: true,
            default: 500,
    },
    Description: {
        type: String,
        default: " ",
    },
})


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;