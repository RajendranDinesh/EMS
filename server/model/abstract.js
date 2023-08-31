const mongoose = require('mongoose');

const AbstractSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
    },
    path: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    declined: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Abstract = mongoose.model('abstract', AbstractSchema);

module.exports = { Abstract };