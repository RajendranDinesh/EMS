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
    minparticipants: {
      type: Number,
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
    isAbstractRequired: {
      type: Boolean,
      default: false,
    },
    isTeamEvent: {
      type: Boolean,
      default: false,
    },
    maxNumberOfTeams: {
      type: Number,
    },
    eventType: {
      type: String,
      default: "",
    },
    visitedUsers: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true });

const Event = mongoose.model("event", eventSchema);

module.exports = { Event };