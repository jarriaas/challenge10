document.addEventListener('DOMContentLoaded', function () {
    fetchCityData('41.8781', '-87.6298', 'Chicago');
    fetchCityData('48.8566', '-2.3522', 'Paris');
    fetchCityData('35.6764', '139.6500', 'Tokyo');
});

function fetchCityData(latitude, longitude, city) {
    fetchWeatherData(latitude, longitude, `weather-${city.toLowerCase()}`);
    fetchAirQualityData(latitude, longitude, `air-${city.toLowerCase()}`);
}

function fetchWeatherData(latitude, longitude, elementId) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            const weatherInfo = `Today's forecast: ${data.current.temperature_2m}°F`;
            document.getElementById(elementId).innerHTML = `<p>${weatherInfo}</p>`;
        })
        .catch(error => console.error('Failed to fetch weather data:', error));
}


function fetchAirQualityData(latitude, longitude, elementId) {
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${52.52}&longitude=${longitude}&current=european_aqi,us_aqi`;

    fetch(aqiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const aqiUSInfo = `Current United States AQI: ${data.current.us_aqi}`;
            const aqiEUInfo = `Current European AQI: ${data.current.european_aqi}`;
            document.getElementById(elementId).innerHTML = `<p>${aqiUSInfo}</p><p>${aqiEUInfo}</p>`;
        })
        .catch(error => console.error('Failed to fetch AQI data:', error));
}