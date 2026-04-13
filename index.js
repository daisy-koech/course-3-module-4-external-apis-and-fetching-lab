// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

//fetch weather alerts based on state code
function fetchWeatherAlerts(state) {
    return fetch(`${weatherApi}${state}`)
    .then(function(response) {
        if (!response.ok) {
            throw new Error("There is an issue")
        }
        return (response.json());
    });
}

function displayAlerts(data) {
    const alerts = document.getElementById("alerts-display");

    const summary = document.createElement("p");
    summary.textContent = `Current watches, warnings, and advisories for ${data.title}: ${data.features.length}`;
    alerts.appendChild(summary);

    data.features.forEach((alert) => {
        const alertsList = document.createElement("p");
        alertsList.textContent = alert.properties.headline;
        alerts.appendChild(alertsList);
    })
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
    const input = document.getElementById("state-input")
    const state = input.value.trim();
    const error = document.getElementById("error-message");

    input.value = "";

    //fetch data from the API
    fetchWeatherAlerts(state)
    .then (data => {
        error.textContent = "";
        error.classList.add("hidden");
        
        displayAlerts(data);
    })

    //err is the error object
    .catch(errorObject=> {
        error.textContent = errorObject.message;
        //clear error message
        error.classList.remove("hidden");
    })
})


