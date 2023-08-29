const router = require('express').Router();
const jwt = require("jsonwebtoken");

const { Notification } = require('../model/notifications');

require('dotenv').config();

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
};

router.get('/notifications/user/count', authenticateToken, async (req, res) => {
try {
    const userId = req.user._id;
    const notifications = await Notification.findOne({ userId : userId });

    if (!notifications) {
        return res.status(200).json({ message: 'No notifications found', count: 0 });
    }

    const unreadNotifications = notifications.notifications.filter(notification => notification.read === false);

    return res.status(200).json({ count : unreadNotifications.length });
} catch (error) {
    
}
});

router.get('/notifications/user', authenticateToken, async (req, res) => {
    try {
    const userId = req.user._id;
    const notifications = await Notification.findOne({ userId : userId });

    if (!notifications) {
        return res.status(200).json({ message: 'No notifications found', notifications: [{message: "No Notifications", eventId: ""}] });
    }

    const requiredNotifications = notifications.notifications.map(notification => {
        return {
            message : notification.message,
            eventId : notification.eventId
        }
    });

    for (const notification of requiredNotifications) {
        if (notification.eventId !== "") {
            await Notification.findOneAndUpdate({ userId : userId, 'notifications.eventId' : notification.eventId }, { $set : { 'notifications.$.read' : true } });
        }
    }

    return res.status(200).json({ notifications : requiredNotifications });
} catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' });
}
});

router.delete('/notifications/user/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.findOne({ userId : userId });
        
        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found' });
        }

        if (notifications.notifications.length === 1) {
            await Notification.findOneAndDelete({ userId : userId });
            return res.status(200).json({ message: 'Notifications deleted successfully' });
        }

        const requiredNotifications = notifications.notifications.filter(notification => notification.eventId === req.params.id);
        
        const requiredIndex = []
        for (const notification of requiredNotifications) {
            requiredIndex.push(notifications.notifications.indexOf(notification));
        }

        requiredIndex.forEach(index => notifications.notifications.splice(index, 1));

        await notifications.save();

        return res.status(200).json({ message: 'Notifications deleted successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/notifications/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.findOneAndDelete({ userId : userId });

        return res.status(200).json({ message: 'Notifications deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router;