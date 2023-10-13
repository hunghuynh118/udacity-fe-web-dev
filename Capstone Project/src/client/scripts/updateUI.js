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
                        : "<h3>" + trip.geonamesData.name + "</h3>"
                }
                <p>Your trip starts in ${trip.remainingDays} days from now</p>
            </div>
            <div class="card__weather">
                <div class="card__weather--icon">
                    <img src="icons/${trip.weatherbitData.icon}.png" alt="">
                </div>
                <div class="card__weather--info">
                    <p class="temp">
                        ${trip.weatherbitData.temp}&deg;C
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
                            ? '<i class="fa-solid fa-heart"></i>'
                            : '<i class="fa-solid fa-trash-can"></i>'
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
