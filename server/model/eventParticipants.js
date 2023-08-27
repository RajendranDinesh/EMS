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
        default: [
            {
                userId: {
                    type: String,
                    required: true,
                },
                ticketCode: {
                    type: String,
                    required: true,
                },
                participated: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
}, { timestamps: true });

const Participant = mongoose.model("participant", participantSchema);

module.exports = { Participant };