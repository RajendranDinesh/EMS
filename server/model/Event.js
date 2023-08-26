const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
require('dotenv').config()

dbConnect();

const eventSchema = new mongoose.Schema({
    eventId:{
      type: Number,
      required: true,
      unique: true,
    },
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
      default: 0,
    },
    startDate: {
      type: Date,
      default: new Date("28-04-2004"),
    },
    endDate: {
      type: Date,
      default: new Date("28-04-2004"),
    },
    regStartDate: {
      type: Date,
      default: new Date("28-04-2004"),
    },
    regEndDate: {
      type: Date,
      default: new Date("28-04-2004"),
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
      default: "",
    },
    createdBy: {
      type: String,
      default: "",
    },
    eventIcon: {
      type: String,
      default: "",
    },
    eventIconId: {
        type: String,
        default: "",
    },
  },
  { timestamps: true });

const Event = mongoose.model("event", eventSchema);

module.exports = { Event };