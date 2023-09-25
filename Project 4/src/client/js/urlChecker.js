function checkForUrl(inputText) {
    console.log("::: Running checkForUrl :::", inputText);

    // Url regex
    const exp =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(exp);

    const invalid = document.getElementById("invalid");

    // Display alert if user input invalid url
    if (inputText.match(regex)) {
        console.log("Valid URL");
        invalid.style.display = "none";
    } else {
        console.log("Invalid URL");
        invalid.style.display = "inline";
    }
}

export { checkForUrl };
