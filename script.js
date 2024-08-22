// Define the browse tools data
const browseTools = [
    { id: 1, name: "Tool Name 1", desc: "Description 1", date: "2024-08-01", popularity: 200, toolkit: 1 },
    { id: 2, name: "Tool Name 2", desc: "Description 2", date: "2024-08-02", popularity: 300, toolkit: 2 },
    { id: 3, name: "Tool Name 3", desc: "Description 3", date: "2024-08-03", popularity: 100, toolkit: null },
    { id: 4, name: "Tool Name 4", desc: "Description 4", date: "2024-08-04", popularity: 150, toolkit: 1 },
    { id: 5, name: "Tool Name 5", desc: "Description 5", date: "2024-08-05", popularity: 250, toolkit: 2 },
    { id: 6, name: "Tool Name 6", desc: "Description 6", date: "2024-08-06", popularity: 200, toolkit: 2 },
    { id: 7, name: "Tool Name 7", desc: "Description 7", date: "2024-08-07", popularity: 300, toolkit: 1 },
    { id: 8, name: "Tool Name 8", desc: "Description 8", date: "2024-08-08", popularity: 100, toolkit: 2 },
    { id: 9, name: "Tool Name 9", desc: "Description 9", date: "2024-08-09", popularity: 150, toolkit: null },
    { id: 10, name: "Tool Name 10", desc: "Description 10", date: "2024-08-10", popularity: 250, toolkit: 1 },
    // Add more items as needed
];

// Define the featured tools data
const featuredTools = [
    { id: 1, name: "Tool 1", desc: "Description 1", demo: "Demo of a single tool" },
    { id: 2, name: "Tool 2", desc: "Description 2", demo: "Demo of another tool" },
    // Add more items as needed
];

// Define the featured toolkits data
const featuredToolkits = [
    { id: 1, name: "Toolkit 1", desc: "Description 1", demo: "Demo of using multiple tools" },
    { id: 2, name: "Toolkit 2", desc: "Description 2", demo: "Demo of another toolkit" },
    { id: 3, name: "Toolkit 3", desc: "Description 3", demo: "Demo of yet another toolkit" },
    // Add more items as needed
];

// Define the navigation information
const navInfo = {
    projects: [
        { name: "Project 1", link: "project1.html" },
        { name: "Project 2", link: "project2.html" },
        // Add more items as needed
    ],
    tools: [
        { id: 1, name: "Tool 1", link: "tool1.html"},
        { id: 2, name: "Tool 2", link: "tool2.html"},
        // Add more items as needed
    ],
    toolkits: [
        { id: 1, name: "Toolkit 1", link: "toolkit1.html" },
        { id: 2, name: "Toolkit 2", link: "toolkit2.html" },
        { id: 3, name: "Toolkit 3", link: "toolkit3.html" },
        // Add more items as needed
    ],
};

// Define the current view and toolkit filters
let currentViewFilter = "recent";
let currentToolkitFilter = "all";

// Render the featured tools section
const renderFeaturedTools = () => {
    const featuredSection = document.querySelector(".featured-section");
    featuredTools.forEach((tool) => {
        const toolDiv = document.createElement("div");
        toolDiv.className = "featured-tool";
        toolDiv.innerHTML = `
            <div class="featured-tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.desc}</p>
            </div>
            <div class="demo">${tool.demo}</div>
            <div class="featured-tool-btns">
                <button class="featured-tool-btn">Try Now</button>
                <button class="featured-tool-btn">⭐ Star</button>
            </div>
        `;
        featuredSection.appendChild(toolDiv);
    });
};

// Render the featured toolkits section
const renderFeaturedToolkits = () => {
    const toolkitsSection = document.querySelector(".toolkits-section");
    featuredToolkits.forEach((toolkit) => {
        const toolkitDiv = document.createElement("div");
        toolkitDiv.className = "featured-tool";
        toolkitDiv.innerHTML = `
            <div class="featured-tool-info">
                <h3>${toolkit.name}</h3>
                <p>${toolkit.desc}</p>
            </div>
            <div class="demo">${toolkit.demo}</div>
            <div class="featured-tool-btns">
                <button class="featured-tool-btn">Try Now</button>
                <button class="featured-tool-btn">⭐ Star</button>
            </div>
        `;
        toolkitsSection.appendChild(toolkitDiv);
    });
};

// Render the browse items based on the provided filter and toolkit filter
const renderBrowseItems = (filter = "recent", toolkitFilter = "all") => {
    const browseList = document.getElementById("browse-list");
    browseList.innerHTML = "";

    let filteredTools = [...browseTools];

    // Default sorting by date from most recent
    filteredTools.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filter === "popular") {
        filteredTools.sort((a, b) => b.popularity - a.popularity);
    }

    if (toolkitFilter !== "all") {
        const toolkitId = parseInt(toolkitFilter);
        filteredTools = filteredTools.filter(tool => tool.toolkit === toolkitId);
    }

    filteredTools.forEach((tool) => {
        const toolDiv = document.createElement("div");
        toolDiv.className = "browse-item";
        toolDiv.innerHTML = `
            <div class="browse-item-info">
                <h4>${tool.toolkit ? `Toolkit ${tool.toolkit}` : "No Toolkit"}</p>
                <h3>${tool.name}</h3>
                <p>${tool.desc}</p>
            </div>
            <div class="browse-item-meta">
                <p>Popularity: ${tool.popularity}</p>
                <p>${tool.date}</p>
            </div>
        `;
        browseList.appendChild(toolDiv);
    });
};

// Render the recent items in the navigation section
const renderRecentItems = (sectionId, items) => {
    const section = document.getElementById(sectionId);
    items.forEach((item) => {
        const button = document.createElement("button");
        button.className = "nav-tookit-btn";
        button.textContent = item.name;
        button.addEventListener("click", () => {
            window.location.href = item.link;
        });
        section.appendChild(button);
    });
    const seeMore = document.createElement("strong");
    seeMore.textContent = "See more";
    section.appendChild(seeMore);
};

// Populate the toolkit filter dropdown
const populateToolkitFilter = () => {
    const toolkitFilter = document.getElementById("toolkit-filter");
    toolkitFilter.innerHTML = '<option value="all">All Toolkits</option>'; // Reset options

    featuredToolkits.forEach((toolkit) => {
        const option = document.createElement("option");
        option.value = toolkit.id;
        option.textContent = toolkit.name;
        toolkitFilter.appendChild(option);
    });
};

// Handle scroll event for infinite scrolling
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        renderBrowseItems(currentViewFilter, currentToolkitFilter);
    }
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    renderRecentItems("recent-projects", navInfo.projects);
    renderRecentItems("recent-tools", navInfo.tools);
    renderRecentItems("recent-toolkits", navInfo.toolkits);
    renderFeaturedTools();
    renderFeaturedToolkits();
    renderBrowseItems(); 
    populateToolkitFilter();

    window.addEventListener("scroll", handleScroll);

    // Toggle the navigation tab on burger button click
    document.getElementById("burger-button").addEventListener("click", () => {
        var navigation = document.getElementById("navigation-tab");
        if (navigation.style.display === "none" || navigation.style.display === "") {
            navigation.style.display = "flex";
        } else {
            navigation.style.display = "none";
        }
    });

    // Handle the view filter change
    document.getElementById("view-filter").addEventListener("change", (event) => {
        currentViewFilter = event.target.value;
        const toolkitFilter = document.getElementById("toolkit-filter").value;
        currentToolkitFilter = toolkitFilter;
        renderBrowseItems(currentViewFilter, currentToolkitFilter);
    });
    
    // Handle the toolkit filter change
    document.getElementById("toolkit-filter").addEventListener("change", (event) => {
        currentToolkitFilter = event.target.value;
        const viewFilter = document.getElementById("view-filter").value;
        currentViewFilter = viewFilter;
        renderBrowseItems(currentViewFilter, currentToolkitFilter);
    });
});
