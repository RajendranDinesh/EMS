const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('../dbConnect');
dbConnect();
const cors = require('cors');
const { sendMail } = require('./emailService');
const jwt = require("jsonwebtoken");

const { User } = require('../model/user');

app.use(cors());
app.use(express.json());

app.delete('/user/delete', authenticateToken, async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.user._id);

        const to = userDeleted.email;
        const subject = 'Account Deletion';
        const text = 'Your account has been deleted successfully';
        const result = await sendMail(to, subject, text);

        res.status(200).send({message: 'User deleted successfully'});
    }
    catch (error) {
        console.log(error);
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


app.listen(5000, () => {
    console.log('Server is running on port 5001');
});