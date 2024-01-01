function toggleTheme() {
    const themeSwitch = document.querySelector('.theme-switch');
    const themeText = document.getElementById('themeText');
    
    const currentTheme = document.body.getAttribute("data-theme");
    const themeStylesheet = document.getElementById("themeStylesheet");

    const newTheme = currentTheme === "mira" ? "gruv" : "mira";
    const newThemeText = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);

    themeStylesheet.setAttribute("href", `css/${newTheme}-theme.css`);
    document.body.setAttribute("data-theme", newTheme);
    themeText.innerText = `${newThemeText} Theme`;

    // Toggle 'active' class on theme switch
    themeSwitch.classList.toggle('active', newTheme !== "mira");

    // Save the theme preference to localStorage
    localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", function () {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        const themeStylesheet = document.getElementById("themeStylesheet");
        const themeText = document.getElementById('themeText');
        const themeSwitch = document.querySelector('.theme-switch');

        themeStylesheet.setAttribute("href", `css/${storedTheme}-theme.css`);
        document.body.setAttribute("data-theme", storedTheme);
        themeText.innerText = `${storedTheme.charAt(0).toUpperCase() + storedTheme.slice(1)} Theme`;

        // Add 'active' class to theme switch if the theme is not the default one
        themeSwitch.classList.toggle('active', storedTheme !== "mira");
    }
});
