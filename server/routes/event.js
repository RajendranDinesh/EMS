const router = require('express').Router();
const {Event} = require('../model/Event')

router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;