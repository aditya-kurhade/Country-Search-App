let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let countriesList = [];
let searchInputVal = "";





function createAndAppend(country) {

    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);

    // Creating and appending countryNameEl to the countryInfoEl
    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    // Creating and appending countryPopulationEl to the countryInfoEl
    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}


function displaySearchResult() {
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.toLowerCase().includes(searchInputVal.toLowerCase())) {
            createAndAppend(country);
        }
    }


}

function getCountries() {
    let options = {
        method: "GET"
    };


    spinnerEl.classList.remove("d-none");


    fetch("https://apis.ccbp.in/countries-data", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            console.log(jsonData);
            countriesList = jsonData;
        });
}



function onChangeSearchResult(event) {
    searchInputVal = event.target.value;
    displaySearchResult();

}


getCountries();

searchInputEl.addEventListener("keyup", onChangeSearchResult);