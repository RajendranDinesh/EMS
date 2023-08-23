const router = require('express').Router(); // Importing the express router module
const bcrypt = require('bcrypt'); // Importing the bcrypt module for password hashing
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken module for creating and verifying tokens

const multer = require('multer'); // Importing the multer module for handling file uploads
const path = require('path'); // Importing the path module for working with file paths
const cloudinary = require('cloudinary').v2; // Importing the cloudinary module for cloud-based image management(profile_pic here)
const fs = require('fs'); // Importing the fs module for working with the file system

const { sendMail } = require('../services/emailService'); // Importing the sendMail function from the emailService module
const { User, validateUserLogin, validateUserRegister, validatePasswordChange } = require('../model/user'); // Importing the User model and validation functions from the user module
const { PasswordReset } = require('../model/passwordReset'); // Importing the PasswordReset model from the passwordReset module
const { modRequest } = require("../model/modRequest"); // Importing the modRequest model from the modRequest module

//         CONFIGURATION STARTS HERE

// The following code loads the dotenv module from the node_modules directory
// and calls its config function to load environment variables from a .env file
require('dotenv').config();

// Configuring the cloudinary module with the provided environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

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
      }
  
      req.user = user;
      next();
    });
  }


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the folder where uploaded images will be stored
      cb(null, './uploads/organisation/profile_images');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded image
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

//         CONFIGURATION ENDS HERE


//         ROUTES START HERE
router.get('/organisation/profile', authenticateToken, async (req, res) => {
try {
    const user = await User.findOne({_id: req.user._id});
    if (!user) return res.status(400).send({message: "No User Found"});
    user.password = undefined;

    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.get('/organisation/authUserCount', authenticateToken, async (req, res) => {
    try {
        const organisation = await modRequest.findOne({organisationId: req.user._id});
        if (!organisation) return res.status(400).send({message: "No Organisation Found"});

        const authUserCount = organisation.modsEmail.length;

        res.status(200).send({authUserCount: authUserCount-1});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/organisation/profile/address', authenticateToken, async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.user._id, {address: req.body.address}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/profile/name', authenticateToken, async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.user._id, {fname: req.body.name}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/profile/email', authenticateToken, async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.user._id, {email: req.body.email}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/profile/dob', authenticateToken, async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.user._id, {dateOfBirth: req.body.dob}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/profile/description', authenticateToken, async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.user._id, {desc: req.body.description}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/profile/password', authenticateToken, async (req, res) => {
try {
    const {error} = validatePasswordChange(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(req.user._id, {password: hashedPassword}, {new: true});
    res.status(200).send({user: user});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.get('/organisation/name', authenticateToken, async (req, res) => {
try {
    const user = await User.findById(req.user._id);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.fname, profilePicture: user.profilePicture });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});

router.put('/organisation/profile/picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
try {
    const user = await User.findOne({_id: req.user._id});
    if (!user) return res.status(404).send({message: "User not found."});

    if (!req.file) {return res.status(400).send({ message: 'No file uploaded' });}

    const imagePath = req.file.path;

    const result = await cloudinary.uploader.upload(imagePath, {folder: "profile_images"});
    if (!result) return res.status(500).send({message: "Error uploading image."});

    await User.findByIdAndUpdate(req.user._id, {profilePicture: result.secure_url, profilePictureId: result.public_id});

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err)
            return
            }});

    res.status(200).send({url: result.secure_url});

} catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
};
});

router.get('/organisation/moderators', authenticateToken, async (req, res) => {
try {
    const organisation = await modRequest.findOne({organisationId: req.user._id});
    if (!organisation) return res.status(400).send({message: "No Organisation Found"});

    const emails = organisation.modsEmail;
    const users = await User.find({ email: { $in: emails } }, 'fname email profilePicture');

    const userArray = users.map((user) => {
    return {
        username: user.fname,
        email: user.email,
        profilePic: user.profilePicture
    };
    });

    res.status(200).send({moderators: userArray});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.get('/organisation/modrequests', authenticateToken, async (req, res) => {
try {
    const requests = await modRequest.findOne({organisationId: req.user._id});
    if (!requests) return res.status(400).send({message: "No User Request"})

    const modRequests = requests.usersEmail;
    
    const users = await User.find({ email: { $in: modRequests } }, 'fname email profilePicture');

    const userArray = users.map((user) => {
    return {
        username: user.fname,
        email: user.email,
        profilePic: user.profilePicture
    };
    });

    res.status(200).send({modrequests: userArray});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/declinemodrequest', authenticateToken, async (req, res) => {
try {
    const requests = await modRequest.findOne({organisationId: req.user._id});
    if (!requests) return res.status(400).send({message: "No User Request"});

    await modRequest.findOneAndUpdate({organisationId: req.user._id}, {$pull: {usersEmail: req.body.email}});
    res.status(200).send({message: "User Request Accepted"});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.put('/organisation/acceptmodrequest', authenticateToken, async (req, res) => {
try {
    const requests = await modRequest.findOne({organisationId: req.user._id});
    if (!requests) return res.status(400).send({message: "No User Request"});

    await modRequest.findOneAndUpdate({organisationId: req.user._id}, {$push: {modsEmail: req.body.email}});
    await modRequest.findOneAndUpdate({organisationId: req.user._id}, {$pull: {usersEmail: req.body.email}});

    const orgName = await User.findOne({_id: req.user._id});
    await User.findOneAndUpdate({email: req.body.email}, {organisation: orgName.fname});

    res.status(200).send({message: "User Request Accepted"});
}
catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
});

router.delete('/organisation/removemod', authenticateToken, async (req, res) => {
    try{
        const organisation = await modRequest.findOne({organisationId: req.user._id});
        if (!organisation) return res.status(400).send({message: "No Organisation"})

        await modRequest.findOneAndUpdate({organisationId: req.user._id}, {$pull: {modsEmail: req.body.email}});

        res.status(200).send({message: "Moderator Removed"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

router.get('/organisation/checkorganisation', authenticateToken, async (req, res) => {
try {
    const organisation = await User.findOne({_id: req.user._id});
    if (!organisation) return res.status(400).send({message: "No Organisation Found"});

    if (organisation.type === "organisation") {
        res.status(200).send({message: "Organisation"});
    }
    else {
        res.status(201).send({message: "Not Organisation"});
    }
}
catch (error) {
    res.status(500).send({message: error.message})
}
});

module.exports = router;