// Function to get the host machine username
function getHostUsername() {
    // Placeholder username for demonstration
    return "RifsxD";
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