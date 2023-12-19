document.addEventListener('DOMContentLoaded', function () {
    // Get user's location and fetch weather information
    function getLocation() {
        const weatherContainer = document.getElementById('weatherContainer');
        const apiKey = '0b3fb444200819f7267081e9f04bf7c6';

        if (navigator.geolocation) {
            // Display loading message
            weatherContainer.innerHTML = 'Huh? No Weather!?';

            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            // Extract relevant weather information (e.g., temperature, description)
                            const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
                            const description = data.weather[0].description;

                            // Display the weather information
                            weatherContainer.innerHTML = `${temperature}°C, ${description}`;
                        })
                        .catch(error => {
                            console.error('Error fetching weather data', error);
                            weatherContainer.innerHTML = 'Error fetching weather data';
                        });
                },
                handleLocationError
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            weatherContainer.innerHTML = 'Geolocation is not supported';
        }
    }

    function handleLocationError(error) {
        const weatherContainer = document.getElementById('weatherContainer');
        switch (error.code) {
            case error.PERMISSION_DENIED:
                weatherContainer.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                weatherContainer.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                weatherContainer.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                weatherContainer.innerHTML = "An unknown error occurred.";
                break;
            default:
                weatherContainer.innerHTML = "An error occurred while getting user location.";
        }
    }

    // Call the function to ask for location permission
    getLocation();
});
