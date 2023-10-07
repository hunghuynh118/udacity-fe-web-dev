const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const GEONAMES_BASE_URL = "http://api.geonames.org/searchJSON";
const WEATHERBIT_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const PIXABAY_BASE_URL = "";

const axios = require("axios");

const getGeonamesLocation = async (req, res) => {
    const response = await axios.get(
        `${GEONAMES_BASE_URL}?q=${req.body.location}&username=${GEONAMES_USERNAME}`
    );

    if (response.data.geonames.length === 0) {
        res.send({
            error: true,
            message: "Location not found",
        });
    } else {
        const { lat, lng, name } = response.data.geonames[0];
        res.send({ lat, lng, name });
    }
};

const getWeatherbitForecast = async (req, res) => {
    const { lat, lon, remainingDays } = req.body;
    const response = await axios.get(
        `${WEATHERBIT_BASE_URL}?lat=${lat}&lon=${lon}&days=${remainingDays}&key=${WEATHERBIT_API_KEY}`
    );
    const {
        weather: { description, icon },
        temp,
        valid_date,
    } = response.data.data[response.data.data.length - 1];

    res.send({ description, icon, temp, valid_date });
};

const getPixabayImages = () => {};

module.exports = {
    getGeonamesLocation,
    getWeatherbitForecast,
};
