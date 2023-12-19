// Get user's location and fetch weather information
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, handleLocationError);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function showWeather(position) {
    const { latitude, longitude } = position.coords;

    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '0b3fb444200819f7267081e9f04bf7c6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information (e.g., temperature, description)
            const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
            const description = data.weather[0].description;

            // Display the weather information
            const weatherContainer = document.getElementById('weatherContainer');
            weatherContainer.innerHTML = `Current Weather: ${temperature}°C, ${description}`;
        })
        .catch(error => console.error('Error fetching weather data', error));
}

function handleLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        default:
            console.error("An error occurred while getting user location.");
    }
}

// Call the function to ask for location permission
getLocation();
