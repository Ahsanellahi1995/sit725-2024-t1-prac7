const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://ahsanellahi1995:Apple@fox@cluster0.hhqfxat.mongodb.net/";
const client = new MongoClient(uri);

let database = null;

async function connectDB() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to the database");
        // Select the appropriate database (e.g., 'card')
        database = client.db('card');
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

function getDB() {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
}

module.exports = { connectDB, getDB };
