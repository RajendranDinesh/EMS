const router = require('express').Router();
const jwt = require("jsonwebtoken");

const multer = require('multer'); // Importing the multer module for handling file uploads
const path = require('path'); // Importing the path module for working with file paths
const cloudinary = require('cloudinary').v2; // Importing the cloudinary module for cloud-based image management(profile_pic here)
const fs = require('fs'); // Importing the fs module for working with the file system

const { Event } = require('../model/event');
const { User } = require('../model/user');
const { Participant } = require('../model/eventParticipants');
const { Bookmark } = require('../model/bookmarks');

require('dotenv').config();

// Configuring the cloudinary module with the provided environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
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

router.post('/event/create', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }, 'organisation');

        if(req.body.organisation) {
            user.organisation = req.user._id;
        }

        await new Event({
                eventId: req.body.eventId,
                name: req.body.name,
                organisation: user.organisation,
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
        console.log(error)
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
        const currentDate = new Date();

        const upcomingEvents = await Event.find({ startDate: { $gte : currentDate }}, 'eventId name location price organisation regStartDate startDate description eventIcon' ).sort('date').exec();

        for (const event of upcomingEvents) {
            try {
                const eventOrganizer = await User.findOne({ _id: event.organisation }, 'fname');
                event.organisation = eventOrganizer.fname;
            } catch (error) {
                console.error('Error fetching event organizer:', error);
            }
        }

        const events = upcomingEvents;

        res.status(200).send(events);
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event retrieval failed'});
    }
});

router.get('/event/:id', async (req, res) => {
    try {
        let events = await Event.findOne({ eventId: req.params.id });
        const eventOrganizer = events.organisation;
        const organizer = await User.findOne({ _id: eventOrganizer }, 'fname');
        events.organisation = organizer.fname;
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

router.get('/event/:id/hasRegistered', authenticateToken, async (req, res) => {
    try {
        const eventId = await Event.findOne({ eventId: req.params.id }, '_id');
        const participants = await Participant.findOne({ eventId: eventId._id });
        const user = await User.findById(req.user._id);

        if(!participants) return res.status(204).send({message: 'User has not registered'});

        //check whether participants.participants contains user._id as an object
        const userExists = participants.participants.some(participant => participant.userId === req.user._id);
        if (userExists) {
            return res.status(200).send({'message': 'User has registered'});
        }
        else {
            return res.status(204).send({'message': 'User has not registered'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({'message': error.message});
    }
});

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the folder where uploaded images will be stored
      cb(null, './uploads/eventIcons');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded image
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

router.put('/event/:id/icon', authenticateToken, upload.single('eventIcon'), async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        if (!user) return res.status(404).send({message: "User not found."});

        if (!req.file) {return res.status(400).send({ message: 'No file uploaded' });}
        
        const imagePath = req.file.path;

        const result = await cloudinary.uploader.upload(imagePath, {folder: "eventIcons"});
        if (!result) return res.status(500).send({message: "Error uploading image."});

        await Event.findOneAndUpdate({ eventId: req.params.id }, {eventIcon: result.secure_url, eventIconId: result.public_id});

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

router.get('/attendedevents', authenticateToken, async (req, res) => {
    try {
        const participants = await Participant.find({ 'participants.userId': req.user._id });
        const events = [];

        for (const participant of participants) {
            try {
                const event = await Event.findOne({ '_id': participant.eventId });

                if (event) {
                    events.push({
                        eventId: event.eventId,
                        name: event.name,
                        location: event.location,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        eventIcon: event.eventIcon,
                    });
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        }

        res.status(200).send({attended: events});
    } catch (error) {
        
    }
});

router.get('/numberOfEventsAttended', authenticateToken, async (req, res) => {
    try {
        const participants = await Participant.find({ 'participants.userId': req.user._id });
        res.status(200).send({numberOfEventsAttended: participants.length});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put('/event/bookmark/:id', authenticateToken, async (req, res) => {
    try {
        const eventId = req.params.id;

        const bookmark = await Bookmark.findOne({ userId: req.user._id });
        if (bookmark) {
            bookmark.eventId.push(eventId);
            await bookmark.save();
        }
        else {
            await new Bookmark({
                userId: req.user._id,
                eventId: eventId,
            }).save();
        }
        res.status(200).send({'message': 'Event bookmarked successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event bookmarking failed'});
    }
});

router.delete('/event/bookmark/:id', authenticateToken, async (req, res) => {
    try {
        const eventId = req.params.id;
        
        const bookmark = await Bookmark.findOne({ userId: req.user._id });
        if (bookmark) {
            bookmark.eventId.pull(eventId);
            await bookmark.save();
        }
        res.status(200).send({'message': 'Event bookmark deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event bookmark deletion failed'});
    }
});

router.get('/event/bookmark/:id', authenticateToken, async (req, res) => {
    try {
        const eventId = req.params.id;

        const bookmark = await Bookmark.findOne({ userId: req.user._id });
        if (bookmark) {
            const exists = bookmark.eventId.includes(eventId);
            if (exists) {
                res.status(200).send({'message': 'Event is bookmarked'});
            }
            else {
                res.status(204).send({'message': 'Event is not bookmarked'});
            }
        }
        else {
            res.status(204).send({'message': 'Event is not bookmarked'});
        }

    } catch (error) {
        console.log(error);
        res.status(403).send({'message': 'Event bookmark checking failed'});
    }
});

router.get('/event/user/bookmarks', authenticateToken, async (req, res) => {
    try {
        const bookmarks = await Bookmark.findOne({ userId: req.user._id });
        if (!bookmarks) return res.status(204).send({message: "User has no bookmarks"});
        
        const eventId = bookmarks.eventId;
        const bookmarkedEvents = [];

        for (const event of eventId) {
            try {
                const eventDetails = await Event.findOne({ eventId: event });
                bookmarkedEvents.push({
                    eventId: eventDetails.eventId,
                    name: eventDetails.name,
                    location: eventDetails.location,
                    startDate: eventDetails.startDate,
                    endDate: eventDetails.endDate,
                    eventIcon: eventDetails.eventIcon,
                });
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        }
        
        res.status(200).send({bookmarks:bookmarkedEvents});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;