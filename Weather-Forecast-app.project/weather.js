const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            showError('City not found. Please enter a valid city name.');
        } else {
            showWeather(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to fetch weather data. Please try again.');
    }
}

function showWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div>Temperature: ${data.main.temp} &deg;C</div>
        <div>Weather: ${data.weather[0].main}</div>
        <div>Humidity: ${data.main.humidity}%</div>
        <div>Wind Speed: ${data.wind.speed} m/s</div>
    `;
}

function showError(message) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `<div class="error">${message}</div>`;
}
