function updateTime() {
    var currentDateTimeElement = document.getElementById("currentDateTime");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var day = currentTime.getDate();
    var monthIndex = currentTime.getMonth(); // Month is zero-based
    var year = currentTime.getFullYear();

    // Array of weekday names and month names
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Convert hours to 12-hour format and determine AM/PM
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (12:00 AM)

    // Format hours and minutes with leading zero if less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Function to add suffix to day number
    function addSuffix(number) {
        if (number >= 11 && number <= 13) {
            return number + "th";
        } else {
            switch (number % 10) {
                case 1:
                    return number + "st";
                case 2:
                    return number + "nd";
                case 3:
                    return number + "rd";
                default:
                    return number + "th";
            }
        }
    }

    var formattedDay = addSuffix(day);
    var weekday = weekdays[currentTime.getDay()];
    var month = months[monthIndex];

    var dateTimeString = weekday + ", " + month + " " + formattedDay + ", " + year + " - " + hours + ":" + minutes + " " + ampm;
    currentDateTimeElement.textContent = dateTimeString;
}

// Display greeting, update search engine text, and show the current time on page load
document.addEventListener("DOMContentLoaded", function () {
    updateTime(); // Call updateTime function immediately after page load
});

// Call updateTime function every second to keep the time updated
setInterval(updateTime, 1000);