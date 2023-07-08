const router = require('express').Router();
const {User, validateUserLogin, validateUserRegister, validatePasswordChange} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.post('/register', async (req, res) => {
    try {
        const {error} = validateUserRegister(req.body);

        if (error) return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});

        if (user) return res.status(409).send({message: "User already registered."});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({
            fname: req.body.fname,
            email: req.body.email,
            password: hashedPassword
        }).save();

        res.status(201).send({message: "User registered successfully."});

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


module.exports = router;