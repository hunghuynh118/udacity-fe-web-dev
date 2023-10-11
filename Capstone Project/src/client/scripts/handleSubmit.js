// Render saved trips, wait for the content to be loaded, otherwise Client is not defined
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/get-saved-trips");
    const { savedTrips } = await response.json();
    console.log(savedTrips);
    Client.renderSavedTrips(savedTrips);
});

const handleSubmit = async event => {
    event.preventDefault();

    // get location and date from user input
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    const locationError = document.getElementById("location-error");
    const dateError = document.getElementById("date-error");

    // validate user input
    // if it's not valid, display error and return
    const isInputValid = Client.validateUserInput();
    if (!isInputValid) {
        return;
    }

    // get geonames data
    const geonamesData = await Client.postData("/get-geonames-location", {
        location: location.value,
    });

    // if there is no data, display error and return
    if (geonamesData.error) {
        locationError.innerHTML = "The location you entered was not found";
        return;
    } else {
        locationError.innerHTML = "";
    }

    // extract latitute, longitude and location name from geonames data response
    const { lat, lon, name } = geonamesData;

    // get weather forecast data
    const weatherbitData = await Client.postData("/get-weatherbit-forecast", {
        lat,
        lon,
        date: date.value,
    });

    // if there is no data, display error and return
    if (weatherbitData.error) {
        dateError.innerHTML =
            "Cannot forecast the weather on the date you entered";
        return;
    } else {
        dateError.innerHTML = "";
    }

    // get pixabay image url
    const pixabayData = await Client.postData("/get-pixabay-image", {
        location: name,
    });

    // if there is no data, display placeholder instead
    if (pixabayData.error) {
        pixabayData.imageUrl = "images/placeholder.jpg";
    }

    // calculate remaining days to go
    const remainingDays = Client.calculateRemainingDays(date.value);

    // create an object to save data
    const trip = {
        id: new Date().valueOf(),
        location: location.value,
        date: date.value,
        remainingDays,
        geonamesData,
        weatherbitData,
        pixabayData,
    };

    localStorage.setItem("tempTrip", JSON.stringify(trip));

    // render result
    await Client.updateUI(trip);
};

export { handleSubmit };
