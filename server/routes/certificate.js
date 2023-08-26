const router = require('express').Router();
const jwt = require('jsonwebtoken');

const multer = require('multer'); // Importing the multer module for handling file uploads
const path = require('path'); // Importing the path module for working with file paths
const cloudinary = require('cloudinary').v2; // Importing the cloudinary module for cloud-based image management(profile_pic here)
const fs = require('fs'); // Importing the fs module for working with the file system

const { Event } = require('../model/event');
const { Certificate } = require('../model/certificate');
const { Participant } = require('../model/eventParticipants');

// The following code loads the dotenv module from the node_modules directory
// and calls its config function to load environment variables from a .env file
require('dotenv').config();

// Authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        };

        req.user = user;
        next();
    });
};

// Configuring the cloudinary module with the provided environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the folder where uploaded images will be stored
      cb(null, './uploads/certificate_background');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded image
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

router.post('/certificate/create', authenticateToken, upload.single('background'),async (req, res) => {
    var eventId, path;
    try {
    ({ eventId, xCoordinate, yCoordinate } = req.body);
    ({ path } = req.file);
    }catch(error){
        return res.status(400).json({ message: 'Error uploading background' });
    }

    if (!eventId || !path) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const event = await Event.findOne({ eventId: eventId });

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const backgroundUpload = await cloudinary.uploader.upload(path, { folder: 'certificate_background' });
    if (!backgroundUpload) {
        return res.status(500).json({ message: 'Error uploading background' });
    }

    fs.unlink(path, (err) => {
        if (err) {
            console.log(err);
            return
        }
    });

    const certificate = await new Certificate({
        eventId: event._id,
        backgroundImage: backgroundUpload.secure_url,
        backgroundImageId: backgroundUpload.public_id,
        xCoordinate: xCoordinate,
        yCoordinate: yCoordinate,
    });

    try{
    //if certificate already exists for this event, delete it and create a new one
    const existingCertificate = await Certificate.findOne({ eventId: event._id });
    if (existingCertificate) {
        await cloudinary.uploader.destroy(existingCertificate.backgroundImageId);
        await Certificate.findByIdAndDelete(existingCertificate._id);
    }

    const savedCertificate = await certificate.save();
    if (!savedCertificate) {
        return res.status(500).json({ message: 'Error saving Certificate' });
    }

} catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Error saving Certificate' });
}
    return res.status(201).json({ message: 'Certificate created successfully' });
});

module.exports = router;