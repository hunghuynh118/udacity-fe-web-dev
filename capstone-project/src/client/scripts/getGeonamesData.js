// Get Geonames data from a location
const getGeonamesData = async location => {
    const response = await fetch("/getGeonamesLocation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
    });

    const geonamesData = await response.json();

    return geonamesData;
};

export { getGeonamesData };
