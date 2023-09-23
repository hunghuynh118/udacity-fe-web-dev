/* Global Variables */
const apiKey = "5249cf40261029de29251eefd00fc8df";
const baseGeoUrl = "http://api.openweathermap.org/geo/1.0/zip";
const baseWeatherUrl = "https://api.openweathermap.org/data/3.0/onecall";

//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}

// Get data from API or server
const getData = async (url = "") => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

// Post data to server
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

// Get weather data from user input
// Then POST data to server
// Then GET data from server and update UI
const handleGenerate = async () => {
    // Get latitude and longitude from zip code
    const zip = document.getElementById("zip").value;
    const geoUrl = `${baseGeoUrl}?zip=${zip}&appid=${apiKey}`;
    const geoData = await getData(geoUrl);
    const { lat, lon } = geoData;

    // Get weather data from above lat and lon
    const weatherUrl = `${baseWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherData = await getData(weatherUrl);
    const temp = weatherData.current.temp;

    // Create a new date instance dynamically with JS
    const d = new Date();
    const date = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

    // Create data to return
    const content = document.getElementById("feelings").value;
    const data = {
        date,
        temp,
        content,
    };

    // Make a POST request to update data
    await postData("/add", data);

    // Update UI
    await updateUI();
};

// Get data from server then update UI
const updateUI = async () => {
    const data = await getData("/all");
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = Math.round(data.temp) + "&degC";
    document.getElementById("content").innerHTML = data.content;
};

// Add event when click Generate button
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", handleGenerate);
