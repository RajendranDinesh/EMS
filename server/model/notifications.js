const mongoose = require('mongoose');
require('dotenv').config();

const notificationSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    notifications : [{
        type : String,
        required : true
    }],
    read : {
        type : Boolean,
        default : false
    }
}, { timestamps : true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification }