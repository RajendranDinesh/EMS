const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Event } = require('../model/event');
const { Participant } = require('../model/eventParticipants');
const { User } = require('../model/user');
const { Teams } = require("../model/team");

const CLIENT_URL = process.env.CLIENT_URL;

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
        };

        req.user = user;
        next();
    });
};

async function generateTicketCode(userId, eventId) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ticketCode = '';

    for (let i = 0; i < 5; i++) {
        ticketCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const participants = await Participant.findOne({ eventId: eventId });

    if (!participants) {
        return ticketCode;
    }

    const participantWithSameCode = participants.participants.find(participant => Object.values(participant)[0] === ticketCode);

    if (participantWithSameCode) {
        return generateTicketCode(userId, eventId);
    }

    return ticketCode;
}


router.post('/create-checkout-session-solo', authenticateToken, async (req, res) => {
    let { eventId } = req.body;

    eventId = parseInt(eventId);

    if (isNaN(eventId)) {
        return res.status(400).json({ message: 'Invalid event ID' });
    }

    const event = await Event.findOne({ eventId : eventId});

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const eventName = event.name;
    const eventPrice = event.price;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Ticket for ${eventName}`,
                        },
                        unit_amount: eventPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${CLIENT_URL}/event/user/payment-success/${eventId}`,
            cancel_url: `${CLIENT_URL}/event/payment-cancelled/${eventId}`,
        });

        if(!session){
            return res.status(500).json({ message: 'Something went wrong' });
        }
        else{
        res.json({ url: session.url });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/create-checkout-session-team', authenticateToken, async (req, res) => {
    try {
        let { eventId, teamName } = req.body;
        eventId = parseInt(eventId);
        
        if (isNaN(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const event = await Event.findOne({ eventId : eventId});

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const team = await Teams.findOne({ teamName: teamName })
        if (!team) return res.status(409).json({ message: 'Team not found'});

        const totalMembers = team.members.length;

        const eventName = event.name;
        const eventPrice = event.price;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: `Ticket for ${eventName} for ${teamName} with ${totalMembers} members..`,
                            },
                            unit_amount: eventPrice * 100 * totalMembers,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${CLIENT_URL}/event/team/payment-success/${eventId}/${teamName}`,
                cancel_url: `${CLIENT_URL}/event/payment-cancelled/${eventId}`,
            });

            if(!session){
                return res.status(500).json({ message: 'Something went wrong' });
            }
            else{
                res.json({ url: session.url });
            }
        } catch (error) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }

    } catch (error) {
        
    }
});

module.exports = router;