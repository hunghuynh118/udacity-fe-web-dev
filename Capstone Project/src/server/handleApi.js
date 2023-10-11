const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");

// api keys
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// api base urls
const GEONAMES_BASE_URL = "http://api.geonames.org/searchJSON";
const WEATHERBIT_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const PIXABAY_BASE_URL =
    "https://pixabay.com/api/?image_type=photo&category=travel&safesearch=true&order=popular&orientation=horizontal";

// Get geonames location
// The request format: { location }
// If location not found, send an error to client
// Otherwise, send response format: { lat, lon, name }
const getGeonamesLocation = async (req, res) => {
    let location = req.body.location.split(" ").join("+");
    const url = `${GEONAMES_BASE_URL}?q=${location}&username=${GEONAMES_USERNAME}`;

    const response = await axios.get(url);

    if (response.data.geonames.length === 0) {
        res.send({
            error: true,
            message: "Location not found",
        });
    } else {
        const { lat, lng, name } = response.data.geonames[0];
        res.send({ lat, lon: lng, name });
    }
};

// Get weatherbit forecase
// The request format: { lat, lon, date }
// The response format: { description, icon, temp, valid_date }
const getWeatherbitForecast = async (req, res) => {
    const { lat, lon, date } = req.body;
    const url = `${WEATHERBIT_BASE_URL}?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}`;

    const response = await axios.get(url);

    for (const item of response.data.data) {
        if (item.valid_date === date) {
            const {
                weather: { description, icon },
                temp,
                valid_date,
            } = item;

            res.send({ description, icon, temp, valid_date });
            return;
        }
    }

    res.send({
        error: true,
        message: "Weather forecast data not found",
    });
};

// Get pixabay image
// The request format: { location }
// If no related image, send an error to client
// Otherwise, send response format: { imageUrl }
const getPixabayImage = async (req, res) => {
    const location = req.body.location.split(" ").join("+");
    const url = `${PIXABAY_BASE_URL}&q=${location}&key=${PIXABAY_API_KEY}`;

    const response = await axios.get(url);

    if (response.data.hits.length === 0) {
        res.send({
            error: true,
            message: "No related image",
        });
    } else {
        res.send({ imageUrl: response.data.hits[0].webformatURL });
    }
};

module.exports = {
    getGeonamesLocation,
    getWeatherbitForecast,
    getPixabayImage,
};
