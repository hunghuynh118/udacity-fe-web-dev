const handleSubmit = async event => {
    event.preventDefault();

    // get location and date from user input
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    const locationError = document.getElementById("location-error");

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
        locationError.innerHTML = "The location you entered was not found.";
        console.log("The location you entered was not found");
        return;
    } else {
        locationError.innerHTML = "";
    }
};

export { handleSubmit };
