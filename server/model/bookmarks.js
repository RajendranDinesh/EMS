const mongoose = require("mongoose");
require('dotenv').config()

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    eventId: [{
        type: String,
        required: true,
    }],
    }, { timestamps: true });

const Bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = { Bookmark };