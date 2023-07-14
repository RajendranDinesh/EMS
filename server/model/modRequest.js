const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    organisationId: {
        type: String,
        required: true,
    },
    usersEmail: {
        type: [String],
        default: [],
    },
});

const modRequest = mongoose.model("modRequest", requestSchema);

module.exports = { modRequest };
