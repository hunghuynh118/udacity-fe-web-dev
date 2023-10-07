const getWeatherbitData = async (lat, lon, remainingDays) => {
    const response = await fetch("/getWeatherbitForecast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lon, remainingDays }),
    });

    const weatherbitData = await response.json();

    return weatherbitData;
};

export { getWeatherbitData };
