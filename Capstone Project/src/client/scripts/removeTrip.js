// remove trip from server
const removeTrip = async () => {
    const parentCardElement = event.target.closest(".card");
    const tripId = event.target.dataset.tripId;
    const response = await Client.postData("/remove-trip", { id: tripId });
    if (!response.error) {
        await Client.renderSavedTrips(response.savedTrips);
    } else {
        console.log(response.message);
    }
};

export { removeTrip };
