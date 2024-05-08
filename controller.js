const express = require("express");
const cardModel = require("./models/cardModel");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/cards', async (req, res) => {
    try {
        const cards = await cardModel.getAllCards();
        res.json({ statusCode: 200, data: cards, message: 'Get all cards success' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

app.post('/api/cards', async (req, res) => {
    try {
        const newCard = req.body;
        const result = await cardModel.insertCard(newCard);
        res.json({ statusCode: 200, message: "Card successfully added", data: result });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: 'Bad request' });
    }
});

app.listen(port, () => {
    console.log("App running at http://localhost:" + port);
});
