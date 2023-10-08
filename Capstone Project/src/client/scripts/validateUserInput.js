// Validate user inputs
// If the input doesn't have value, add the error class to it
// Otherwise, remove the error class from it
const validateUserInput = () => {
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    const locationError = document.getElementById("location-error");
    const dateError = document.getElementById("date-error");

    let isInputValid = true;

    if (!location.value) {
        location.classList.add("error");
        locationError.innerHTML = "Please enter your destination!";
        isInputValid = false;
        console.log("Missing location");
    } else {
        location.classList.remove("error");
        locationError.innerHTML = "";
    }

    if (!date.value) {
        date.classList.add("error");
        dateError.innerHTML = "Please enter your departure date!";
        isInputValid = false;
        console.log("Missing date");
    } else {
        date.classList.remove("error");
        dateError.innerHTML = "";
    }

    return isInputValid;
};

export { validateUserInput };
