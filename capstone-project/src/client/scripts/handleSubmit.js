const handleSubmit = async event => {
    event.preventDefault();

    // get location and date from user input
    const location = document.getElementById("location");
    const date = document.getElementById("date");

    // validate user input
    // if it's not valid, display error and return
    const isInputValid = Client.validateUserInput([location, date]);
    if (!isInputValid) {
        console.log("Missing location or date");
        return;
    }

    let geonamesData, weatherbitData, pixabayData;

    // get geonames data
    geonamesData = await Client.getGeonamesData(location.value);
    // if there is no data, return
    // TODO: display error "The location you entered was not found"
    if (geonamesData.error) {
        console.log("The location you entered was not found");
        return;
    }

    // extract latitute, longitude and location name from geonames data response
    const { lat, lng, name } = geonamesData;

    console.log(lat, lng, name);

    const remainingDays = Client.calculateRemainingDays(date.value);

    console.log(remainingDays);

    weatherbitData = await Client.getWeatherbitData(lat, lng, remainingDays);
    console.log(weatherbitData);

    // TODO: get pixabay image

    // TODO: save data to projectData

    // TODO: post projectData to server
};

export { handleSubmit };
