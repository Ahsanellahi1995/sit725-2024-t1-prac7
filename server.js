var express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express()
const uri = "mongodb+srv://ahsanellahi1995:Apple@fox@cluster0.hhqfxat.mongodb.net/";
var port = process.env.port || 8080;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a MongoClient with a MongoClientOptions object to set the Stable API version 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function runDBConnection() {
    try {
        // Connect the client to the server (optional starting in v4.7) 
        await client.connect();
        collection = client.db('card').collection('card');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

function insertProjects(card, callback) {
    try {
        collection.insertOne(card, callback);
    } catch (ex) {
        console.error(ex);
    }
}

function getAllCats(callback) {
    try {
        collection.find({}).toArray(callback);
    } catch (ex) {
        console.error(ex);
    }
}
app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/api/cards', (req, res) => {
    getAllCats((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'get all cards success' });
        }
    });
});

app.post('/api/cards', (req, res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Successfully added", data: result })
        }
    })
})


runDBConnection()
app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
    runDBConnection();
})

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const { connectDB } = require("./db");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the database
connectDB()
    .then(() => {
        // Use the router for all routes starting with '/api'
        app.use('/api', router);

        // Start the server after successful connection
        app.listen(port, () => {
            console.log("App running at http://localhost:" + port);
        });
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });
    const express = require("express");
    const cardModel = require("./models/cardModel");
    const { connectDB } = require("./db");
    
    const app = express();
    const port = process.env.PORT || 8080;
    
    app.use(express.static(__dirname + '/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Connect to the database
    connectDB()
        .then(() => {
            // Start the server after successful connection
            app.listen(port, () => {
                console.log("App running at http://localhost:" + port);
            });
        })
        .catch(error => {
            console.error("Error connecting to database:", error);
        });
    
    // Define routes and controllers as before...
    