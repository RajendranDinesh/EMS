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
    path: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Abstract = mongoose.model('abstract', AbstractSchema);

module.exports = { Abstract };