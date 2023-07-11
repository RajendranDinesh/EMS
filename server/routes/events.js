const router = require('express').Router();
const { Event } = require('../model/event');

router.post('/event/create', async (req, res) => {
    try {

        await new Event({
                eventId: req.body.eventId,
                name: req.body.name,
                organisation: req.body.organisation,
                location: req.body.location,
                price: req.body.price,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                regStartDate: req.body.regStartDate,
                regEndDate: req.body.regEndDate,
                participants: req.body.participants,
                maxParticipants: req.body.maxParticipants,
                description: req.body.description
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

module.exports = router;