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

app.get("/get-saved-trips", (req, res) => {
    res.send({ savedTrips });
});

app.post("/save-trip", (req, res) => {
    const trip = req.body;
    if (isTripSaved(trip)) {
        res.send({ error: true, message: "Trip has already existed" });
    } else {
        savedTrips.push(trip);
        res.send({ savedTrips });
    }
});

app.post("remove-trip", (req, res) => {
    const trip = req.body;
    if (isTripSaved(trip)) {
        savedTrips = savedTrips.filter(
            obj => obj.location !== trip.location || obj.date !== trip.date
        );
        res.send({ savedTrips });
    } else {
        res.send({ error: true, message: "Trip does not exist" });
    }
});

const isTripSaved = trip => {
    for (let savedTrip of savedTrips) {
        if (
            savedTrip.location === trip.location &&
            savedTrip.date === trip.date
        ) {
            return true;
        }
    }
    return false;
};
