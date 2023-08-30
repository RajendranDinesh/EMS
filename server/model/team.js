const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String,
        required: true   
    },
    members: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Teams = mongoose.model("Teams", teamSchema);

module.exports = { Teams };