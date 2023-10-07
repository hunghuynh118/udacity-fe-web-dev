// Validate user input array
// If the input doesn't have value, add the error class to it
// Otherwise, remove the error class
const validateUserInput = userInput => {
    let isInputValid = true;

    for (let input of userInput) {
        if (!input.value) {
            input.classList.add("error");
            isInputValid = false;
        } else {
            input.classList.remove("error");
        }
    }

    return isInputValid;
};

export { validateUserInput };
