// Import dotenv config
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname);

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const e = require("express");
app.use(cors());

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile("dist/index.html");
    // res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/test", (req, res) => {
    res.send(mockAPIResponse);
});

// API URL and key
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

// Check api key
console.log(`Your API key is ${apiKey}`);

// POST method
app.post("/add", async (req, res) => {
    const data = req.body;
    const apiUrl = `${baseUrl}?key=${apiKey}&url=${data.url}&lang=en`;
    console.log(`Input url: ${data.url}`);

    // Fetch data from API
    const newData = await fetch(apiUrl, { method: "POST" });

    try {
        const result = await newData.json();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log("error", error);
    }
});
