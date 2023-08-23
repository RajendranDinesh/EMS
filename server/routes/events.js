const router = require('express').Router();
const jwt = require("jsonwebtoken");

const { Event } = require('../model/event');
const { User } = require('../model/user');

const dotenv = require('dotenv');
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

router.post('/event/create', authenticateToken, async (req, res) => {
    try {
        const organisation = await User.findOne({ _id: req.user._id }, 'organisation');

        await new Event({
                eventId: req.body.eventId,
                name: req.body.name,
                organisation: organisation.organisation,
                location: req.body.location,
                price: req.body.price,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                regStartDate: req.body.regStartDate,
                regEndDate: req.body.regEndDate,
                participants: req.body.participants,
                maxParticipants: req.body.maxParticipants,
                description: req.body.description,
                createdBy: req.user._id,
            }).save();

        res.status(200).send({'message': 'Event created successfully'});
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).send({'message': 'Event already exists'});
        }
        else {
            console.log(error);
            res.status(403).send({'message': 'Event creation failed'});}
    }
});

router.put('/event/:id/name', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { name: req.body.name });
        res.status(200).send({'message': 'Event name updated successfully'});
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).send({'message': 'An Event already exists with the provided name'});
        }
        else {
            console.log(error);
            res.status(403).send({'message': 'Event retrieval failed'});}
    }
});

router.put('/event/:id/organisation', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { organisation: req.body.organisation });
        res.status(200).send({'message': 'Event organisation updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/location', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { location: req.body.location });
        res.status(200).send({'message': 'Event location updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/price', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { price: req.body.price });
        res.status(200).send({'message': 'Event price updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/startDate', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { startDate: req.body.startDate });
        res.status(200).send({'message': 'Event start date updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/endDate', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { endDate: req.body.endDate });
        res.status(200).send({'message': 'Event end date updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/regStartDate', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { regStartDate: req.body.regStartDate });
        res.status(200).send({'message': 'Event registration start date updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/regEndDate', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { regEndDate: req.body.regEndDate });
        res.status(200).send({'message': 'Event registration end date updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/participants', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { participants: req.body.participants });
        res.status(200).send({'message': 'Event participants updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/maxParticipants', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { maxParticipants: req.body.maxParticipants });
        res.status(200).send({'message': 'Event max participants updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.put('/event/:id/description', authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ eventId: req.params.id }, { description: req.body.description });
        res.status(200).send({'message': 'Event description updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.get('/event/nextid', async (req, res) => {
    try {
        const event = await Event.find().sort({ eventId: -1 }).limit(1);
        if (event.length == 0) {
            res.status(200).send({'nextId': 1});}
        else {
        res.status(200).send({'nextId': event[0].eventId + 1});}
    } catch (error) {
        console.log(error);
    }
});

router.get('/event/getall', async (req, res) => {
    try {
        const events = await Event.find().sort({ _id : -1});
        res.status(200).send(events);
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.get('/event/:id', async (req, res) => {
    try {
        const events = await Event.findOne({ eventId: req.params.id });
        res.status(200).send(events);
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.get('/event/:id/modcheck', authenticateToken, async (req, res) => {
    try {
        const eventUserId = await Event.findOne({ createdBy: req.user._id, eventId: req.params.id });
        if (eventUserId) {
            res.status(200).send({'message': 'User is a moderator'});
        }
        else {
            const event = await Event.findOne({ eventId: req.params.id });
            const user = await User.findById(req.user._id);

            if (event.organisation === user.fname) {
                res.status(200).send({'message': 'User is a moderator'});
            }
            else {
            res.status(204).send({'message': 'User is not a moderator'});}
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

module.exports = router;