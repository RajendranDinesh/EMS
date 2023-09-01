const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User, validateUserLogin} = require('../model/user');


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

module.exports = router;