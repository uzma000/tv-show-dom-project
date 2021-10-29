//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let allCardsDiv = document.createElement("div");
let bodyEl = document.querySelector("body");
let dropDown = document.getElementById("drop-down");

function setup() {
  createCardsWrapper();
  dropDownMenu();
  makeEpisodes(allEpisodes);
  numberOfDisplayedEpisodes(allEpisodes);
  showFooter();
}
window.onload = setup;

// Cards Wrapper
function createCardsWrapper() {
  bodyEl.appendChild(allCardsDiv);
  allCardsDiv.setAttribute("class", "cards-wrapper");
}
// shows all episodes
function makeEpisodes(episodeList) {
  allCardsDiv.innerHTML = "";
  episodeList.forEach((show) => {
    let card = document.createElement("div");
    card.setAttribute("class", "single-card");
    allCardsDiv.appendChild(card);

    // Creating Episodes and Season numbers
    let episodeNumber = show.number;
    let seasonNumber = show.season;
    if (episodeNumber < 10) {
      episodeNumber = `0${episodeNumber}`;
    }
    if (seasonNumber < 10) {
      seasonNumber = `0${seasonNumber}`;
    }
    let h2Element = document.createElement("h2");
    h2Element.setAttribute("class", "card-heading");
    h2Element.innerHTML = `${show.name} - S${seasonNumber}E${episodeNumber}`;
    card.appendChild(h2Element);

    // Create Episode Images
    let image = document.createElement("img");
    image.setAttribute("class", "show-image");
    image.src = show.image.medium;
    card.appendChild(image);

    // Episode description
    let pElement = document.createElement("p");
    pElement.setAttribute("class", "show-description");
    pElement.innerHTML = show.summary;
    card.appendChild(pElement);
  });
}
//Level 200
// Search Bar
let searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();
  let filteredShows = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchText) ||
      episode.summary.toLowerCase().includes(searchText)
    );
  });
  makeEpisodes(filteredShows);
  numberOfDisplayedEpisodes(filteredShows);
});

// Episode Counter
let episodeCount = document.getElementById("numbers");
function numberOfDisplayedEpisodes(searchedEpisode) {
  let totalEpisodesLength = allEpisodes.length;
  let searchLength = searchedEpisode.length;
  episodeCount.innerHTML = `Showing ${searchLength}/${totalEpisodesLength} episode(s).`;
}

//Level 300
// Dropdown Menu
function dropDownMenu() {
  const arrayOfEpisodes = [...allEpisodes];
  arrayOfEpisodes.unshift({ name: "default" });

  arrayOfEpisodes.forEach((episode, index) => {
    let episodeNum = episode.number;
    let seasonNum = episode.season;

    if (episodeNum < 10) {
      episodeNum = `0${episode.number}`;
    }
    if (seasonNum < 10) {
      seasonNum = `0${episode.season}`;
    }
    let formatted = `${episode.name} - S${seasonNum}E${episodeNum}`;
    let options = document.createElement("option");
    options.setAttribute("label", `${formatted}`);
    if (index === 0) {
      options.setAttribute("selected", "selected");
      options.setAttribute("label", `All Episodes`);
    }
    options.setAttribute("value", episode.name);
    dropDown.appendChild(options);
  });
}
// dropDownMenu
dropDown.addEventListener("change", (e) => {
  let episodeCount = document.getElementById("numbers");
  let selectedShow = dropDown.value;
  let displaySelected = allEpisodes.filter((show) => {
    return show.name.includes(selectedShow);
  });
  if (dropDown.value === "default") {
    makeEpisodes(allEpisodes);
  } else {
    makeEpisodes(displaySelected);
  }
  if (dropDown.value !== "default") {
    episodeCount.innerHTML = `Showing ${displaySelected.length}/${allEpisodes.length} Shows`;
  } else {
    episodeCount.innerHTML = `Showing ${allEpisodes.length}/${allEpisodes.length} Shows`;
  }
});
function showFooter() {
  let footer = document.createElement("footer");
  footer.setAttribute("class", "maze-tv-footer");
  bodyEl.appendChild(footer);
  footer.innerHTML = ` <p>
        Source:
        <a href="https://www.tvmaze.com"><em> TVMaze.com </em></a>
      </p>`;
}
