
const climateResult = document.querySelector('.main_climateresult'),
    form = document.querySelector('#climateForm'),
    city = document.querySelector("#city"),
    country = document.querySelector("#country"),
    resultTable = document.querySelector(".tableResult"),
    cleanForm = document.querySelector(".cleanForm"),
    mapS = document.querySelector(".mapSection"),
    mapD = document.querySelector("#map");


const climateSearch = (event) => {
    event.preventDefault();
    if (city.value === "" || country.value === "") {
        formValidation()
        return;
    }
    checkAPI(city.value, country.value);
}


const formValidation = () => {
    alert("Por favor digite la información completa para la búsqueda");
}


const showClimate = (info) => {
    const currentTemperature = document.querySelector(".tableResult__currentTemperature"),
        maxTemperature = document.querySelector(".tableResult__maxTemperature"),
        minTemperature = document.querySelector(".tableResult__minTemperature");

    const { main: { temp, temp_max, temp_min } } = info;
    const { coord: { lon, lat } } = info;

    if (temp, temp_max, temp_min) {
        resultTable.removeAttribute("hidden");
        currentTemperature.innerHTML = `${toCelcius(temp)}°C  <i class="bi bi-thermometer"></i>`;
        maxTemperature.innerHTML = `${toCelcius(temp_max)}°C  <i class="bi bi-thermometer-sun"></i>`;
        minTemperature.innerHTML = `${toCelcius(temp_min)}°C  <i class="bi bi-thermometer-snow"></i>`;
        generateMap(lat, lon);
    }
}

const checkAPI = (city, country) => {
    const apiID = '3fb72f14436e451b397453b2b6171d87';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;
    fetch(URL).then(result => result.json()).then(cityinfo => {
        cityinfo.cod === "404" ? alert("Ciudad no encontrada") : showClimate(cityinfo);
    });
}


const toCelcius = (temperature) => Math.round(Number(temperature) - 273.15);


const cleanBtn = () => {
    form.reset();
    if (mapS) mapS.setAttribute("hidden", true);
    resultTable.setAttribute("hidden", true);

}


const generateMap = (lat, lon) => {

    const verification = L.DomUtil.get('map');
    if (verification._leaflet_id !== undefined) verification._leaflet_id = null;
    const map = L.map('map').setView([lat, lon], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
};


form.addEventListener('submit', climateSearch);
cleanForm.addEventListener("click", cleanBtn);



