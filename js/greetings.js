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
        return "Good night";
    }
}

// Function to update the displayed time and date
function updateTime() {
    var currentDateTimeElement = document.getElementById("currentDateTime");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // Month is zero-based
    var year = currentTime.getFullYear();

    // Format hours, minutes, day, and month with leading zero if less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    var dateTimeString = hours + ":" + minutes + " - " + year + "-" + month + "-" + day;
    currentDateTimeElement.textContent = dateTimeString;
}

// Display greeting, update search engine text, and show the current time on page load
document.addEventListener("DOMContentLoaded", function () {
    var greeting = getGreeting();
    var greetingMessage = document.getElementById("greetingMessage");
    var hostUsername = getHostUsername();
    greetingMessage.textContent = greeting + " " + hostUsername;

    updateTime(); // Call updateTime function immediately after page load
    updateSelectedSearchEngineText();
});

// Call updateTime function every second to keep the time updated
setInterval(updateTime, 1000);
