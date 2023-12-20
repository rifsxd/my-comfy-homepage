// Function to fetch API keys from a JSON file
async function getApiKeys() {
    try {
        // Fetch JSON file
        const response = await fetch('config.json'); // Adjust the path accordingly
        
        // Parse JSON
        const data = await response.json();
        
        // Extract and return the openWeatherMap API key
        return data.apiKey.openWeatherMap;
    } catch (error) {
        console.error('Error fetching or parsing API keys JSON:', error);
        // Handle error as needed
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Get user's location and fetch weather information
    async function getLocation() {
        const weatherContainer = document.getElementById('weatherContainer');

        try {
            const apiKey = await getApiKeys();

            if (!apiKey) {
                throw new Error('API key not found');
            }

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
        } catch (error) {
            console.error('Error:', error);
            weatherContainer.innerHTML = 'Error fetching API key';
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
