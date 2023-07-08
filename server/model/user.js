const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
require('dotenv').config()


dbConnect();

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    description: {
        type: String,
        default: "",
    },
    dateOfBirth: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id,},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
};

const User = mongoose.model("user", userSchema);

const validateUserRegister = (user) => {
    const complexityOptions = {
      min: 6,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
    };
  
    const complexitySchema = passwordComplexity(complexityOptions).required();
  
    const schema = Joi.object({
      fname: Joi.string().required(),
      email: Joi.string().required().email(),
      password: complexitySchema,
      confirmPassword: complexitySchema,
    });
  
    return schema.validate(user);
};

const validatePasswordChange = (user) => {
    const complexityOptions = {
      min: 6,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1
    };

    const schema = Joi.object({
        password: passwordComplexity(complexityOptions).required(),
    });

    return schema.validate(user);
};

const validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().max(50).required().email(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
}

module.exports = {User, validateUserLogin, validateUserRegister, validatePasswordChange}