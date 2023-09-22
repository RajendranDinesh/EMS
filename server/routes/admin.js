const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendMail } = require('../services/emailService');
const {User, validateUserLogin} = require('../model/user');
const { Event } = require('../model/event');
const { modRequest } = require('../model/modRequest');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

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

router.post('/admin/login', async (req, res) => {
    try {
        const {error} = validateUserLogin(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).send({message: "User not found."});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({message: "Invalid password."});

        const token = user.generateAuthToken();
        res.status(201).send({adminToken: token});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/admin/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id}).select('-password');
        if (!user) return res.status(404).send({message: "User not found."});

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/admin/organisation/search/:emailId', authenticateToken, async (req, res) => {
  try {
    const emailId = req.params.emailId;

    let userDetails = {};

    const organisation = await User.findOne({ email: emailId, type: 'organisation' }, 'fname createdAt profilePicture address');
    if (!organisation) return res.status(404).send({ message: 'Organisation not found.' });

    userDetails = {...userDetails, createdAt: organisation.createdAt, fname: organisation.fname, profilePicture: organisation.profilePicture, location: organisation.address, orgId: organisation._id};

    const events = await Event.find({ organisation: organisation._id });
    if (events !== undefined) {
      const numberOfEvents = events.length;
      userDetails.eventsCount = numberOfEvents;
    }

    const mods = await modRequest.findOne({ organisationId: organisation._id }, 'modsEmail');

    if (mods && mods.modsEmail.length !== 0){
      const numberOfMods = mods.modsEmail.length;
      userDetails.modsCount = numberOfMods;
    }

    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete('/admin/organisation/delete/:orgId', authenticateToken, async (req, res) => {
  try {
    const orgId = req.params.orgId;

    const userDeleted = await User.findOneAndDelete({ _id: orgId, type: 'organisation' });

    if (userDeleted.profilePictureId) {
        const publicId = userDeleted.profilePictureId;
        await cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) console.log(error);
        });
    };

    const to = userDeleted.email;
    const subject = "Account Deleted";
    const text = "Your account has been deleted successfully.";

    sendMail(to, subject, text);

    res.status(200).send({ message: 'Organisation deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;