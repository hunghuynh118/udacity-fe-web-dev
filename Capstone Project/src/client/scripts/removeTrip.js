// save trip to server
const removeTrip = async () => {
    const parentCardElement = event.target.closest(".card");
    // TODO: get location and
    const location = "";
    const date = "";
    const trip = { location, date };
    const response = await Client.postData("/remove-trip", trip);
    if (!response.error) {
        await Client.renderSavedTrips(response.saveTrips);
    } else {
        console.log(response.message);
    }
};

export { removeTrip };
