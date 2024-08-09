//Темний режим
const darkbtn = document.getElementById("darkmode");
const isDarkMode = localStorage.getItem("darkMode") === "enabled";
const cards = document.querySelectorAll(".card, .entry");
const icon = document.getElementById("darkModeIcon");

if (isDarkMode) {
  document.body.classList.add("dark");
  cards.forEach((card) => {
    card.classList.add("dark");
  });
  darkbtn.checked = true;
}

darkbtn.addEventListener("click", () => {
  if (darkbtn.checked) {
    icon.classList.replace("fa-moon", "fa-sun");
    document.body.classList.add("dark");
    cards.forEach((card) => {
      card.classList.add("dark");
    });
    localStorage.setItem("darkMode", "enabled");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    document.body.classList.remove("dark");
    cards.forEach((card) => {
      card.classList.remove("dark");
    });
    localStorage.setItem("darkMode", "disabled");
  }
});

//Вид записів
const viewBtn = document.getElementById("view-selector");
const viewIcon = document.getElementById("viewIcon");

let items = document.querySelectorAll(
  ".events-wraper, .event, .event-image, .event-header, .description, .more"
);

const currentView = localStorage.getItem("view") === "grid";

if (currentView) {
  items.forEach((item) => {
    item.classList.add("wide");
  });
  viewBtn.checked = true;
}
viewBtn.addEventListener("click", () => {
  if (viewBtn.checked) {
    items.forEach((item) => {
      item.classList.add("wide");
    });
    viewIcon.classList.replace("fa-list", "fa-table-cells-large");
    localStorage.setItem("view", "grid");
  } else {
    items.forEach((item) => {
      item.classList.remove("wide");
    });
    viewIcon.classList.replace("fa-table-cells-large", "fa-list");
    localStorage.setItem("view", "list");
  }
});

//Бургер-меню
const burgerMenuBtn =  document.getElementById("burger-menu")
const mainMenu = document.getElementById('main-menu')

burgerMenuBtn.addEventListener('click', () =>{
  mainMenu.classList.toggle('open')
})