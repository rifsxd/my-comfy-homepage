var searchEngine = "google"; // Change this variable to choose the search engine

        // Function to update the selected search engine text
        function updateSelectedSearchEngineText() {
            var selectedSearchEngineText = document.getElementById("selectedSearchEngineText");
            selectedSearchEngineText.textContent =
                searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1) + "!";
        }

        

        document.getElementById("searchinput").addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                var searchQuery = document.getElementById("searchinput").value;
                if (searchQuery.trim() !== "") {
                    var searchUrl;
                    switch (searchEngine) {
                        case "duckduckgo":
                            searchUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(searchQuery);
                            break;
                        case "bing":
                            searchUrl = "https://www.bing.com/search?q=" + encodeURIComponent(searchQuery);
                            break;
                        default:
                            searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchQuery);
                            break;
                    }
                    window.open(searchUrl, "_blank");
                }
            }
        });