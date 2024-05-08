const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ahsanellahi1995:Apple@fox@cluster0.hhqfxat.mongodb.net/";

class CardModel {
    constructor() {
        this.client = new MongoClient(uri);
        this.collection = null;
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.collection = this.client.db('card').collection('card');
            console.log("Connected to the database");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    async insertCard(card) {
        try {
            const result = await this.collection.insertOne(card);
            return result;
        } catch (error) {
            console.error("Error inserting card:", error);
            throw error;
        }
    }

    async getAllCards() {
        try {
            const cards = await this.collection.find({}).toArray();
            return cards;
        } catch (error) {
            console.error("Error getting all cards:", error);
            throw error;
        }
    }
}

module.exports = new CardModel();
