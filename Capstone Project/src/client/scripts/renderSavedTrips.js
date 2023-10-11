const renderSavedTrips = async savedTrips => {
    const savedTripsSection =
        document.getElementsByClassName("trip-section")[0];

    if (savedTrips.length !== 0) {
        let documentFragment = new DocumentFragment();
        for (let savedTrip of savedTrips) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card", "card--column");

            cardElement.innerHTML = Client.updateUI(savedTrip, false);

            documentFragment.appendChild(cardElement);
        }
        savedTripsSection.appendChild(documentFragment);
    }
};

export { renderSavedTrips };
