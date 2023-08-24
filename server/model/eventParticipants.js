const mongoose = require("mongoose");
require('dotenv').config()

const participantSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
    },
    participants: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

const Participant = mongoose.model("participant", participantSchema);

module.exports = { Participant };