async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const formText = document.getElementById("url").value;
    const isValid = Client.checkForUrl(formText);

    if (!isValid) return;

    console.log("::: Form Submitted :::");

    // Make a POST request to server
    // After receive the response, update the UI
    await fetch("/add", {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formText }),
    })
        .then(res => res.json())
        .then(res => {
            try {
                document.getElementById("agreement").innerHTML = res.agreement;
                document.getElementById("subjectivity").innerHTML =
                    res.subjectivity;
                document.getElementById("confidence").innerHTML =
                    res.confidence;
                document.getElementById("irony").innerHTML = res.irony;
            } catch (error) {
                console.log("error", error);
            }
        })
        .catch(error => {
            console.log("error", error);
        });
}

export { handleSubmit };
