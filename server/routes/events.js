const router = require('express').Router();
const { Event } = require('../model/event');

router.post('/create', async (req, res) => {
    try {
        
        await new Event({
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
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;