const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const handleApi = require("./handleApi");

const app = express();
const port = 3001;

let savedTrips = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile("dist/index.html");
});

app.post("/get-geonames-location", handleApi.getGeonamesLocation);

app.post("/get-weatherbit-forecast", handleApi.getWeatherbitForecast);

app.post("/get-pixabay-image", handleApi.getPixabayImage);
