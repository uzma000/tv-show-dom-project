//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let cardList = document.createElement("div");
  cardList.setAttribute("class", "cards-wrapper");
  rootElem.appendChild(cardList);

  episodeList.forEach((show) => {
    let card = document.createElement("div");
    card.setAttribute("class", "single-card");
    cardList.appendChild(card);

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
