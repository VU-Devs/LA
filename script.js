const links = {
  "Semester 1": [
    { title: "Calculus I", url: "https://example.com/calculus1" },
    { title: "Physics I", url: "https://example.com/physics1" }
  ],
  "Semester 2": [
    { title: "Calculus II", url: "https://example.com/calculus2" },
    { title: "Physics II", url: "https://example.com/physics2" }
  ],
  "Projects": [
    { title: "AI Project", url: "https://example.com/ai" },
    { title: "Web Project", url: "https://example.com/web" }
  ]
};

const FAVORITE_KEY = "favoritedLinks";
let favorites = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];

function saveFavorites() {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
}

function isFavorited(url) {
  return favorites.includes(url);
}

function toggleFavorite(url) {
  if (isFavorited(url)) {
    favorites = favorites.filter(fav => fav !== url);
  } else {
    favorites.push(url);
  }
  saveFavorites();
  renderAll(document.getElementById("search").value.toLowerCase());
}

function createLinkElement(link) {
  const div = document.createElement("div");
  div.className = "link-item";

  const a = document.createElement("a");
  a.href = link.url;
  a.target = "_blank";
  a.textContent = link.title;

  const star = document.createElement("button");
  star.innerHTML = "★";
  star.className = "star-button";
  if (isFavorited(link.url)) star.classList.add("favorited");

  star.onclick = () => toggleFavorite(link.url);

  div.appendChild(a);
  div.appendChild(star);

  return div;
}

function renderSection(name, linksArray, filter) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  title.textContent = name;
  const list = document.createElement("div");
  list.className = "link-list";

  linksArray
    .filter(link => link.title.toLowerCase().includes(filter))
    .forEach(link => list.appendChild(createLinkElement(link)));

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function renderAll(filter = "") {
  const allLinks = Object.values(links).flat();
  const favLinks = allLinks.filter(link => isFavorited(link.url));
  const favoritesContainer = document.getElementById("favorites");
  const sectionsContainer = document.getElementById("sections");

  favoritesContainer.innerHTML = "";
  sectionsContainer.innerHTML = "";

  if (favLinks.length > 0) {
    const favSection = renderSection("Favorites", favLinks, filter);
    favSection.querySelector(".link-list").classList.add("favorites-grid");
    favoritesContainer.appendChild(favSection);
  }

  for (const [name, list] of Object.entries(links)) {
    sectionsContainer.appendChild(renderSection(name, list, filter));
  }
}

document.getElementById("search").addEventListener("input", e =>
  renderAll(e.target.value.toLowerCase())
);

renderAll();
