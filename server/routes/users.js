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
const { Participant } = require('../model/eventParticipants');
const { Event } = require('../model/event');
// The following code loads the dotenv module from the node_modules directory
// and calls its config function to load environment variables from a .env file
require('dotenv').config();


// Configuring the cloudinary module with the provided environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});


router.post('/register', async (req, res) => {
    try {
        const {error} = validateUserRegister(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if (user) return res.status(409).send({message: "User already registered."});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const fUser = await new User({
            fname: req.body.fname,
            email: req.body.email,
            password: hashedPassword
        }).save();

        const token = fUser.generateAuthToken();
        res.status(201).send({token: token});

    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {error} = validateUserLogin(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).send({message: "User not found."});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({message: "Invalid password."});

        const token = user.generateAuthToken();
        res.status(201).send({token: token});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.post('/user/forgot-password', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).send({message: "User not found."});

        const token = user.generateForgotPasswordToken();

        await new PasswordReset({
            userId: user._id,
            token: token,
        }).save();

        const link = `${process.env.CLIENT_URL}/reset-password/?token=${token}`;
        const to = user.email;
        const subject = "Reset Password";
        const html = `<p>Click <a href="${link}">here</a> to reset your password.</p>`;
        const text = `Click the following link to reset your password: ${link}`;

        const mail = await sendMail(to, subject, html, text);
        res.status(200).send({message: "Reset link sent to your email."});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/reset-password', async (req, res) => {
    try {
        const {error} = validatePasswordChange({password: req.body.password, confirmPassword: req.body.confirmPassword});
        if (error) return res.status(400).send({message: error.details[0].message});

        //find token in db
        const passwordReset = await PasswordReset.findOne({token: req.body.token});
        //delete token from db
        await PasswordReset.findByIdAndDelete(passwordReset._id);
        if (!passwordReset) return res.status(404).send({message: "Invalid token."});

        //find user in db
        const user = await User.findOne({_id: passwordReset.userId});
        if (!user) return res.status(404).send({message: "User not found."});

        //hash new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //update user password
        const newUser = await User.findByIdAndUpdate(user._id, {password: hashedPassword});

        //create new token
        const newToken = newUser.generateAuthToken();
        res.status(200).send({token: newToken, message: "Password updated successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        if (user.organisation === "") user.organisation = "";
        else if (user.organisation) {
            const organisationName = await User.findOne({_id: user.organisation}, 'fname');
            user.organisation = organisationName.fname;
        }
        const eventsAttended = await Participant.find({ 'participants.userId' : req.user._id, 'participants.participated': true });
        
        res.status(200).send({user: user, eventsAttended: eventsAttended.length});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/address', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {address: req.body.address}, {new: true});
        res.status(200).send({user: user});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/name', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {fname: req.body.name}, {new: true});
        res.status(200).send({user: user});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/email', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {email: req.body.email}, {new: true});
        res.status(200).send({user: user});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/dob', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {dateOfBirth: req.body.dob}, {new: true});
        res.status(200).send({user: user});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/description', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {description: req.body.description}, {new: true});
        res.status(200).send({user: user});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/profile/password', authenticateToken, async (req, res) => {
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

router.get('/user/name', authenticateToken, async (req, res) => {
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

router.delete('/user/delete', authenticateToken, async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.user._id);

        if (userDeleted.profilePictureId) {
            const publicId = userDeleted.profilePictureId;
            await cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) console.log(error);
            });
        };

        const to = userDeleted.email;
        const subject = "Account Deleted";
        const text = "Your account has been deleted successfully.";

        const result = sendMail(to, subject, text);
        res.status(200).send({message: "User deleted successfully."});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/user/modrequest', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({message: "User not found."});

        const organisation = await User.findOne({email: req.body.organisation, type: "organisation"});
        if (!organisation) return res.status(404).send({message: "Organisation not found."});

        const requestOrg = await modRequest.findOne({organisationId: organisation._id});
        if (!requestOrg) {
            const newModRequest = new modRequest({
                organisationId: organisation._id,
                usersEmail: req.user.email
            });

            await newModRequest.save();
            res.status(200).send({message: "Mod request sent successfully."});
        }
        else {
            const userExists = await modRequest.find({usersEmail: user.email})

            if(userExists.length > 0) return res.status(201).send({message: "Request Already Sent"})

            const requests = await modRequest.findByIdAndUpdate(requestOrg._id, {$push: {usersEmail: user.email}}, 
                {new: true});
            res.status(200).send({message: "Mod request sent successfully."});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/user/modrequest', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({message: "User not found."});

        const requests = await modRequest.find({usersEmail: user.email}, 'organisationId');
        if (requests.length === 0) return res.status(204).send({message: "No requests found."});

        const orgEmail = await User.findById(requests[0].organisationId, 'email');
        if (!orgEmail) return res.status(404).send({message: "No Such Organisation"});

        res.status(200).send({email: orgEmail.email});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/user/modcheck', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({message: "User not found."});

        const isMod = await modRequest.find({modsEmail: user.email});
        if (!isMod[0] || isMod[0].modsEmail.length === 0) return res.status(204).send({message: "Not a mod."});

        res.status(200).send({message: "Is a mod."});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/user/createdevents', authenticateToken, async (req, res) => {
    try {
        const events = await Event.find({createdBy: req.user._id}, 'eventId name location startDate endDate eventIcon');
        if (!events) return res.status(404).send({message: "No events found."});

        res.status(200).send({created: events});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
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
      cb(null, './uploads/profile_images');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded image
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

router.put('/user/profile/picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
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


module.exports = router;