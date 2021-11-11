let searchBar = document.getElementById("searchBar");
let bodyEl = document.querySelector("body");
let dropDownEpisode = document.getElementById("dropDown-episodes");
let dropDownShow = document.getElementById("dropDown-shows");
let allEpisodes;
let allShows;

function setup() {
  allShows = getAllShows();
  const showsList = allShows.sort((showA, showB) => {
    return showA.name < showB.name ? -1 : 1;
  });
  differentShowPopulate(showsList);
  populateAllCards(showsList);
}
window.onload = setup;

// level 400
function populateEpisodes(showId) {
  const currentShowUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
  return fetch(currentShowUrl).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw `${response.status} ${response.statusText}`;
  });
}

function countShows(search) {
  let countEpisodes = document.getElementById("count");
  let episodeList = allEpisodes.length;
  let searchLength = search.length;
  dropDownEpisode.innerText = `Showed ${searchLength} / ${episodeList} Episodes.`;
  return countEpisodes;
}

function removeShow() {
  let countEpisodes = document.getElementById("count");
  countEpisodes.innerHTML = "";
  return countEpisodes;
}

// Creating Episodes and Season numbers
function displayEpisodes(episode) {
  let episodeNumber = episode.number;
  let seasonNumber = episode.season;
  let episodeName = episode.name;

  if (episodeNumber < 10) {
    episodeNumber = `0${episode.number}`;
  }
  if (seasonNumber < 10) {
    seasonNumber = `0${episode.season}`;
  }
  if (episodeNumber || seasonNumber) {
    return `S${seasonNumber}E${episodeNumber} - ${episodeName}`;
  } else {
    return episode.name;
  }
}

//const newLocal = "input";
// Search Bar

searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  let searchText = e.target.value.toLowerCase();
  let filteredShows = numberOfDisplayedEpisodes(searchText, allEpisodes);
  //numberOfDisplayedEpisodes(filteredShows); // changed
  // showingEpisodes(filteredShows);
  populateAllCards(filteredShows);
  countShows(filteredShows);
});

// Episode Counter
function numberOfDisplayedEpisodes(searchInput, allEpisodes) {
  let totalEpisodesLength = allEpisodes.filter((episode) => {
    if (episode.summary != undefined) {
      return (
        episode.name.toLowerCase().includes(searchInput) ||
        episode.summary.toLowerCase().includes(searchInput)
      );
    } else {
      return episode.name.toLowerCase().includes(searchInput);
    }
  });
  return totalEpisodesLength;
}

//Level 300

//for single show
function singleShowPopulate(show) {
  // let showId = show.id;
  // let showName = show.name
  let options = document.createElement("option");
  options.setAttribute("label", show.id);

  options.innerHTML = show.name;
  return options;
}

//for all shows
function differentShowPopulate(allShows) {
  dropDownShow.appendChild(
    singleShowPopulate({ name: "All-Shows", id: "All-Shows" })
  );
  allShows.forEach((show) => {
    let showSelection = singleShowPopulate(show);
    dropDownShow.appendChild(showSelection);
  });
}

// dropDown for show
dropDownShow.addEventListener("change", (e) => {
  let showCount = e.target.value;
  if (showCount === "All-Shows") {
    populateAllCards(allShows);
    removeShow();
    differentEpisodePopulate([
      {
        name: "Selection required for show",
        id: "Selection required for show",
      },
    ]);
    searchBar.disabled = true;
    searchBar.Placeholder = "To enable search please select a show";
  } else {
    populateEpisodes(showCount).then((data) => {
      allEpisodes = data;

      populateAllCards(allEpisodes);
      countShows(allEpisodes);
      differentEpisodePopulate(allEpisodes);
      searchBar.disabled = false;
      searchBar.Placeholder = "";
    });
  }
});

//for single episode
function singleEpisodePopulate(episode) {
  let options = document.createElement("option");
  options.setAttribute("label", episode.id);
  let title = displayEpisodes(episode);
  options.innerHTML = title;
  return options;
}

//for different episodes
function differentEpisodePopulate(allEpisodes) {
  dropDownEpisode.innerHtml = "";

  allEpisodes.forEach((episode) => {
    let episodeSelection = singleEpisodePopulate(episode);
    dropDownEpisode.appendChild(episodeSelection);
  });
}

//dropdown for episodes
dropDownEpisode.addEventListener("change", (e) => {
  let episodeCount = e.target.value;
  location.href = `#${episodeCount}`;
  let value = document.getElementById(episodeCount);
  value.classList.add("selectedItem");
  setTimeout(() => {
    value.classList.remove("selectedItem");
  }, 1100);
});

// Lets create One Card for a show/episode
function populateCard(element) {
  let cardList = document.createElement("li");
  let cardTitle = document.createElement("h2");
  let cardImage = document.createElement("img");
  let pElement = document.createElement("p");
  let link = document.createElement("a");
  cardList.setAttribute("id", element.id);
  cardList.setAttribute("class", "single-card");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = element.name;
  cardImage.setAttribute("class", "card-picture");
  cardImage.src = element.image ? element.image.medium : "";
  cardImage.alt = `${element.name} cover picture`;
  pElement.setAttribute("class", "card-detail");
  pElement.innerHTML = element.summary;
  link.setAttribute("class", "pageLink");
  link.href = element.url;
  link.target = "_blank";
  link.innerHTML = "Click here to watch";
  cardList.appendChild(cardTitle);
  cardList.appendChild(cardImage);
  cardList.appendChild(link);
  cardList.appendChild(pElement);
  return cardList;
}
// to make cards empty
function emptyCards(cardElement) {
  cardElement.innerHTML = "";
}
function populateAllCards(arr) {
  let cardElement = document.getElementById("all-cards");
  emptyCards(cardElement);
  arr.forEach((element) => {
    let li = populateCard(element);
    cardElement.appendChild(li);
  });
}
