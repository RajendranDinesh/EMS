const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
    token: {
        type: String,
        default: "",
    },
    userId: {
        type: String,
        default: "",
    },
}, {timestamps: true});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = { PasswordReset };