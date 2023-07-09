const router = require('express').Router();
const {User, validateUserLogin, validateUserRegister, validatePasswordChange} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { sendMail } = require('../services/emailService');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
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

router.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        res.status(200).send({user: user});
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
        const user = await User.findByIdAndUpdate(req.user._id, {desc: req.body.description}, {new: true});
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

        await User.findByIdAndUpdate(req.user._id, {profilePicture: result.secure_url}, {new: true});

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