// Function to fetch username from a JSON file
async function getHostUsername() {
    try {
        // Fetch JSON file
        const response = await fetch('/my-comfy-homepage/config/user.json'); // Adjust the path accordingly
        
        // Parse JSON
        const data = await response.json();
        
        // Extract and return the username
        return data.user.username;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        // Handle error as needed
        return null;
    }
}

// Function to get the current time and return a greeting
function getGreeting() {
    var currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
        return "Good morning";
    } else if (currentTime >= 12 && currentTime < 18) {
        return "Good afternoon";
    } else if (currentTime >= 18 && currentTime < 22) {
        return "Good evening";
    } else {
        return "Go to sleep";
    }
}

// Display greeting, update search engine text, and show the current time on page load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        var greeting = getGreeting();
        var greetingMessage = document.getElementById("greetingMessage");

        // Use await to get the username asynchronously
        var hostUsername = await getHostUsername();

        // Update the greeting message with the username
        greetingMessage.textContent = greeting + " " + hostUsername;
    } catch (error) {
        console.error('Error:', error);
    }
});
