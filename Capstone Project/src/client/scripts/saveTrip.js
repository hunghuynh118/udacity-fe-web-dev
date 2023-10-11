// save trip to server
const saveTrip = async () => {
    const trip = JSON.parse(localStorage.getItem("tempTrip"));
    const response = await Client.postData("/save-trip", trip);
    if (!response.error) {
        await Client.renderSavedTrips(response.savedTrips);
    } else {
        console.log(response.message);
    }
};

export { saveTrip };
