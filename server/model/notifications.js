const mongoose = require('mongoose');
require('dotenv').config();

const notificationSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    notifications : [{
        message : {
            type : String,
            required : true
        },
        read : {
            type : Boolean,
            default : false
        },
        eventId : {
            type : String,
            required : true
        }
    }],
}, { timestamps : true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification }