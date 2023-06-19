const router = require('express').Router();
const {User, validateUserLogin, validateUserRegister} = require('../model/user');
const bcrypt = require('bcrypt');

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
        res.status(200).send({token: token});

    } catch (error) {
        res.status(500).send({message: error.message});
    }
});


module.exports = router;