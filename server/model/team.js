const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true   
    },
    members: {
        type: Array,
        default: [
            {
                userId: {
                    type: String,
                    required: true
                }
            }
        ]
    }
}, {timestamps: true});

const Teams = mongoose.model("Teams", teamSchema);

module.exports = { Teams };