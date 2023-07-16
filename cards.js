const cardContainer = document.querySelector(".card-container");
const showMoreButton = document.querySelector(".show-more");
const loadingScreen = document.querySelector(".loading-screen");
const loadingScreenText = document.querySelector(".loading-screen-text");
let cardCount = 0;
const apiKey = "38086846-5d9c819359353723991757094";

async function getRandomImage() {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&per_page=3`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data =>
      data.hits.map(hit => ({
        imageUrl: hit.webformatURL,
        title: hit.tags,
        description: hit.user,
        price: "kn" + Math.floor(Math.random() * 100)
      }))
    )
    .catch(error => console.log(error));
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "added_card";

  const image = document.createElement("img");
  image.src = cardData.imageUrl;

  const title = document.createElement("h2");
  title.className = "added_card-title";
  title.textContent = cardData.title;


  const description = document.createElement("p");
  description.className = "added_card-desc";
  description.textContent = cardData.description;

  const price = document.createElement("h2");
  price.className = "added_card-price";
  price.textContent = cardData.price;

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  cardContainer.appendChild(card);
}

function showLoadingScreen() {
  loadingScreen.style.display = "flex";
}

function hideLoadingScreen() {
  loadingScreen.style.display = "none";
}

async function loadMoreCards() {
  showLoadingScreen();
  setTimeout(async function () {
    const imageUrls = await getRandomImage();
    imageUrls.forEach(imageUrl => createCard(imageUrl));
    hideLoadingScreen();
  }, 1000);
}

showMoreButton.addEventListener("click", loadMoreCards);
