function toggleTermSection() {
    var termSection = document.getElementById("termSection");
    var termContent = document.getElementById("termContent");

    if (termSection.style.display === "none" || termSection.style.display === "") {
        // Show the term section with a smooth fade-in effect
        termSection.style.display = "block";
        var termContent = document.getElementById('termContent');
        termContent.innerHTML = '';
        initializeTerminal()
        setTimeout(function () {
            termSection.style.opacity = "1";
        }, 10);
    } else {
        // Hide the term section with a smooth fade-out effect
        termSection.style.opacity = "0";
        setTimeout(function () {
            termSection.style.display = "none";
        }, 300); // Adjust the duration to match the transition duration in CSS
    }
}

async function processCommand(command) {
    command = command.toLowerCase();

    if (command === 'help') {
        return 'Available commands: help, time, date, whoami, unixporn, youtube, github, clear';
    } else if (command === 'time') {
        var currentTime = new Date().toLocaleTimeString();
        return 'Current time is: ' + currentTime;
    } else if (command === 'date') {
        var currentDate = new Date().toLocaleDateString();
        return 'Current date is: ' + currentDate;
    } else if (command === 'unixporn') {
        window.open('https://www.reddit.com/r/unixporn/');
        return 'Opening UnixPorn in a new tab...';
    } else if (command === 'github') {
        window.open('https://github.com/');
        return 'Opening GitHub in a new tab...';
    } else if (command === 'youtube') {
        window.open('https://www.youtube.com/');
        return 'Opening YouTube in a new tab...';
    } else if (command === 'clear') {
        var termContent = document.getElementById('termContent');
        termContent.innerHTML = '';
        return ''; // Clear the terminal
    } else if (command === 'whoami') {
        try {
            var currentUser = await getHostUsername();
            return 'Current user is: ' + currentUser;
        } catch (error) {
            console.error('Error:', error);
            return 'Error getting current user.';
        }
    } else if (command === 'exit') {
            termSection.style.opacity = "0";
            var termContent = document.getElementById('termContent');
            termContent.innerHTML = '<br>';
            setTimeout(function () {
                termSection.style.display = "none";
            }, 300);
            return `Exiting... goodbye!`;
    } else {
        return `Command "${command}" not recognized. Type "help" for available commands.`;
    }
}


function handleTermInput(event) {
    if (event.key === 'Enter') {
        var termInput = document.getElementById('termInput');
        var command = termInput.value;

        processCommand(command).then(result => {
            var termContent = document.getElementById('termContent');
            termContent.innerHTML += `<div>${result}</div><br>`;
            // Scroll to the bottom of the terminal to show the latest output
            termContent.scrollTop = termContent.scrollHeight;
        }).catch(error => {
            console.error('Error:', error);
        });

        // Clear the input after processing the command
        termInput.value = '';
    }
}

// Function to fetch a welcome message
async function fetchWelcomeMessage() {
    try {
        const response = await fetch('welcome.json');
        const data = await response.json();
        var currentUser = await getHostUsername();
        return `>_ ` + data.message + ` ` + currentUser + `!`; // Assuming the welcome message is returned as { "message": "Welcome to the terminal test" }
    } catch (error) {
        console.error('Error fetching welcome message:', error);
        return 'Failed to retrieve welcome message.';
    }
}

// Function to initialize the terminal with a welcome message
async function initializeTerminal() {
    var termContent = document.getElementById('termContent');
    
    // Fetch the welcome message
    const welcomeMessage = await fetchWelcomeMessage();

    // Display the welcome message in the terminal
    termContent.innerHTML += `<br><div>${welcomeMessage}</div><br>`;
}


