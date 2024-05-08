const express = require('express');
const cardModel = require('./models/cardModel');

// Create a new Express router
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/api/cards', async (req, res) => {
    try {
        const cards = await cardModel.getAllCards();
        res.json({ statusCode: 200, data: cards, message: 'Get all cards success' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

router.post('/api/cards', async (req, res) => {
    try {
        const newCard = req.body;
        const result = await cardModel.insertCard(newCard);
        res.json({ statusCode: 200, message: "Card successfully added", data: result });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Bad request' });
    }
});

// Export the router
module.exports = router;
