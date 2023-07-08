const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
require('dotenv').config()

dbConnect();

const eventSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
    organisation: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: {
      type: String,
      default: "28/04/2004",
    },
    endDate: {
      type: String,
      default: "01/05/2004",
    },
    regStartDate: {
      type: String,
      default: "01/01/2004",
    },
    regEndDate: {
      type: String,
      default: "01/03/2004",
    },
    participants: {
      type: Number,
      required: true,
      default: 100,
    },
    maxParticipants: {
      type: Number,
      required: true,
      default: 500,
    },
    description: {
      type: String,
      default: " ",
    }
  },
  { timestamps: true });

const Event = mongoose.model("event", eventSchema);

module.exports = { Event };