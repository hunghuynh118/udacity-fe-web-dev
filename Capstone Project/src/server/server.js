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

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile("dist/index.html");
});

app.post("/get-geonames-location", handleApi.getGeonamesLocation);

app.post("/get-weatherbit-forecast", handleApi.getWeatherbitForecast);

app.post("/get-pixabay-image", handleApi.getPixabayImage);

app.get("/get-saved-trips", (req, res) => {
    res.send({ savedTrips });
});

app.post("/save-trip", (req, res) => {
    const trip = req.body;
    if (isTripSaved(trip.id)) {
        res.send({ error: true, message: "Trip has already existed" });
    } else {
        savedTrips.push(trip);
        res.send({ savedTrips });
    }
});

app.post("/remove-trip", (req, res) => {
    const { id } = req.body;
    if (isTripSaved(id)) {
        savedTrips = savedTrips.filter(obj => obj.id !== id);
        res.send({ savedTrips });
    } else {
        res.send({ error: true, message: "Trip does not exist" });
    }
});

const isTripSaved = tripId => {
    for (let savedTrip of savedTrips) {
        if (savedTrip.id === tripId) {
            return true;
        }
    }
    return false;
};

module.exports = server;
