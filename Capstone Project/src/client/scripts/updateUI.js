const updateUI = (trip, save = true) => {
    const innerCard = `
        <div class="card__image">
            <img src="${trip.pixabayData.imageUrl}">
        </div>
        <div class="card__body">
            <div class="card__text">
                ${
                    save
                        ? "<h2>" + trip.geonamesData.name + "</h2>"
                        : "<h4>" + trip.geonamesData.name + "</h4>"
                }
                <p>Your trip is in ${trip.remainingDays} days time</p>
            </div>
            <div class="card__weather">
                <div class="card__weather--icon">
                    <img src="icons/${trip.weatherbitData.icon}.png" alt="">
                </div>
                <div class="card__weather--info">
                    <p class="temp">
                        ${trip.weatherbitData.temp}<sup>&#8451;</sup>
                    </p>
                    <p>${trip.weatherbitData.description}</p>
                </div>
            </div>
        </div>
        <div class="card__footer">
            <button 
                class="btn btn__save" 
                type="button" 
                data-trip-id="${trip.id}" 
                onclick="return ${
                    save ? "Client.saveTrip()" : "Client.removeTrip()"
                }">
                    ${
                        save
                            ? '<i class="far fa-heart"></i>'
                            : '<i class="far fa-trash-alt"></i>'
                    }
                    ${save ? "Save" : "Remove"} Trip
            </button>
        </div>
    `;

    if (save) {
        const searchResult =
            document.getElementsByClassName("result-section")[0];
        searchResult.innerHTML = `<div class="card">${innerCard}</div>`;
    }
    return innerCard;
};

export { updateUI };
