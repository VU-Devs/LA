const links = {
  "Essentials": [
    { title: "Canvas", url: "https://canvas.vu.nl/" },
    { title: "CS Hub", url: "https://cs-hub.notion.site/" },
    { title: "Study Guide", url: "https://studiegids.vu.nl/en#/" },
    { title: "VU Books", url: "https://www.vuboekhandel.nl/app/ds/dssufsea1.p?language=4&level=1&btnSearch=true&cboinsti=1"},
    { title: "Timetable", url: "https://rooster.vu.nl/schedule"},

  ],

  "Lab Manuals / Course Sites": [
    { title: "Computer Networks Lab Manual", url: "https://computerscienceeducation.gitbook.io/computer-networks-lab-manual" },
    { title: "Computer Organisation Lab Manual", url: "https://computerscienceeducation.gitbook.io/co-lab-manual" },
    { title: "Machine Learning", url: "https://mlvu.github.io/"}
  ],

  "Onboarding": [
    { title: "VU Dashboard", url: "https://vu.nl/en/dashboard" },
    { title: "Studielink", url: "https://www.studielink.nl/" },
    { title: "Student Immigration", url: "http://studentimmigration.vu.nl/" },
    { title: "Unofficial Y1 TU Delft Incoming Guidance", url: "https://docs.google.com/document/d/1y9kRZ5H1UIEsEbEe1jOKZiS72GPqX-wa3Na4-3uMb4E/edit?tab=t.y13v59u66kpb#heading=h.cjd47meacr5n" },
    { title: "VU / CS / AMS Guide by Applesauce", url: "https://csdiscdocs.gitbook.io/vu-cs-amst-guide"},
    { title: "Github Education Pack", url: "https://education.github.com/pack"},
  ],

  "GitHub / GitLab / Orgs": [
    { title: "AtLarge CO/CN Github", url: "https://github.com/ComputerScienceEducation" },
    { title: "VU IVM Github", url: "https://github.com/VU-IVM" },
    { title: "Machine Learning @ VU Github", url: "https://github.com/mlvu"},
    { title: "VU Programming Github", url: "https://github.com/VU-Programming" },
    { title: "VU StudSec Github", url: "https://github.com/StudSec/"},
    { title: "VU HPDC (High Performance Distributed Computing)", url:"https://www.vuhpdc.net/"},
    { title: "VU Studsec (Student Security)", url: "https://studsec.nl/"},
    { title: "VU Sec (Systems and Network Security Group)", url: "https://www.vusec.net/"},
  ],

  "Socials": [
    { title: "Icarus (Philosophy Student Club)", url: "https://www.instagram.com/vu.icarus/" },
    { title: "VU Pride", url: "https://linktr.ee/VUpride" },
    { title: "NDSA (Neurodiverse Student Association)", url: "https://linktr.ee/nd.sa" },
    { title: "Boosted Griffins (Gaming Group)", url: "https://www.instagram.com/boostedgryffins/" },
    { title: "Minescie (Minecraft)", url: "https://linktr.ee/minescie" },
    { title: "VU CS Discord", url: "https://discord.gg/MGG72qsKrn"},
    { title: "3D - VU (Gaming Discord)", url: "https://discord.gg/Ymae4vZ22s"},
    { title: "StudSec Discord", url: "https://url.studsec.nl/discord" },
  ],

  "Misc": [
    { title: "VU Link Aggregator", url: "https://vu-devs.github.io/LA/"},
    { title: "VU Services Uptime", url: "https://stats.uptimerobot.com/1QklV7XO7U" },
  ],

  "Archived": [
    { title: "Storage Systems Slides (No longer taught)", url: "https://drive.google.com/drive/folders/1Ob994kg2UBFdrdgeEAReNILmCx7mSlxT" },
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
    favorites = favorites.filter((fav) => fav !== url);
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
    .filter((link) => link.title.toLowerCase().includes(filter))
    .forEach((link) => list.appendChild(createLinkElement(link)));

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function renderAll(filter = "") {
  const allLinks = Object.values(links).flat();
  const favLinks = allLinks.filter((link) => isFavorited(link.url));
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
    const filteredList = list.filter((link) =>
      link.title.toLowerCase().includes(filter)
    );
    if (filteredList.length > 0) {
      sectionsContainer.appendChild(renderSection(name, filteredList, filter));
    }
  }
}

document
  .getElementById("search")
  .addEventListener("input", (e) =>
    renderAll(e.target.value.toLowerCase())
  );

renderAll();
