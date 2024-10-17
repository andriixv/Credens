//Темний режим
const darkbtn = document.getElementById("darkmode");
const isDarkMode = localStorage.getItem("darkMode") === "enabled";
const cards = document.querySelectorAll(".card, .entry, .filter-container");
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

//Бургер-меню стара реалізація
// const burgerMenuBtn = document.getElementById("burger-menu");
// const mainMenu = document.getElementById("main-menu");

// burgerMenuBtn.addEventListener("click", () => {
//   mainMenu.classList.toggle("open");
// });

//Бургер-меню
function burgerMenu(){
  const mainMenu = document.getElementById("main-menu");
  mainMenu.classList.toggle("open");
  document.body.classList.toggle('menu-open')
}

//Календар
function calendar(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const day = document.querySelector(".calendar-dates");

  const currdate = document.querySelector(".calendar-current-date");

  const prenexIcons = document.querySelectorAll(".calendar-navigation span");

  // Array of month names
  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  // Function to generate the calendar
  const manipulate = () => {
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      // Check if the current date is today
      let isToday =
        i === date.getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear()
          ? "active"
          : "";
      lit += `<li class="${isToday}">${i}</li>`;
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }

    // Update the text of the current date element
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;

    // update the HTML of the dates element
    // with the generated calendar
    day.innerHTML = lit;
  };

  manipulate();

  // Attach a click event listener to each icon
  prenexIcons.forEach((icon) => {
    // When an icon is clicked
    icon.addEventListener("click", () => {
      // Check if the icon is "calendar-prev"
      // or "calendar-next"
      month = icon.id === "calendar-prev" ? month - 1 : month + 1;

      // Check if the month is out of range
      if (month < 0 || month > 11) {
        // Set the date to the first day of the
        // month with the new year
        date = new Date(year, month, new Date().getDate());

        // Set the year to the new year
        year = date.getFullYear();

        // Set the month to the new month
        month = date.getMonth();
      } else {
        // Set the date to the current date
        date = new Date();
      }

      // Call the manipulate function to
      // update the calendar display
      manipulate();
    });
  });
}

//Модальне вікно
function modal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  calendar()
  modal.style.display = "block";
  document.getElementsByTagName('body')[0].style.overflow = 'hidden'

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementsByTagName('body')[0].style.overflow = 'auto'

    }
  };
}
if (document.getElementById("view-selector")){
//Вид записів

  const viewBtn = document.getElementById("view-selector");
  const viewIcon = document.getElementById("viewIcon");

  let items = document.querySelectorAll(
    ".events-wraper, .event, .event-image, .event-header, .description, .more"
  );

  const currentView = localStorage.getItem("view") === "grid";//Стандартний вид матеріалів

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
}

//Показати/сховати фільтр

function showFilters() {
  const filterContainer = document.getElementsByClassName('filter-container')[0]
  // console.log('click')
  filterContainer.classList.toggle("open");
}
//Вибрані фільтри книг і матеріалів з'являються вгорі
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  // console.log('click2')
  const selectedCategoriesContainer = document.querySelector(
    ".selected-categories"
  );

  checkboxes.forEach((checkbox) => {
    // console.log('click3');
    checkbox.addEventListener("change", filterAndSortItems);

  });

  function filterAndSortItems() {
    const selectedValues = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    updateSelectedCategories(selectedValues);
  }

  function updateSelectedCategories(selectedValues) {
    selectedCategoriesContainer.innerHTML = "";

    selectedValues.forEach((value) => {
      const categoryElement = document.createElement("div");
      categoryElement.classList.add("selected-category");
      categoryElement.textContent = value.replace(/^./, value[0].toUpperCase());
      categoryElement.addEventListener("click", () => {
        document.querySelector(`input[value="${value}"]`).checked = false;
        filterAndSortItems();
      });
      selectedCategoriesContainer.appendChild(categoryElement);
    });
  }
});


//Відображення прев'ю зображення при додаванні книги
function showBook() {
  const [file] = bookImg.files
  if (file) {

    document.getElementById('bookImage').style.display = 'block';
    document.getElementById('bookImage').src = URL.createObjectURL(file)

    document.getElementById('add-cover').style.display = 'none';
    document.getElementById('edit-cover').style.display = 'block';
  }
}


//СКРИПТИ ДЛЯ СТОРІНКИ З МАПОЮ

//Створення об'єкта з id всіх областей і статусами клікнута/не клікнута для них
  let clicked = {}
  for (let path of document.getElementsByTagName('path')){
      clicked[path.id] = 0
   }
   //Відкривання модального вікна зі списком громад області
   let modalStatus = 0
   function modalInfo(oblastId){
      // oblastBackground(oblastId) зображення області для фону
      if (modalStatus === 0 ){
         document.getElementsByClassName('modal-gromady')[0].classList.add('open')
         document.getElementsByTagName('body')[0].style.overflow = 'hidden'
         modalStatus = 1 
      }
      else if (modalStatus === 1 && oblastId){
         document.getElementsByClassName('modal-gromady')[0].classList.remove('open')
         document.getElementsByTagName('body')[0].style.overflow = 'auto'
         document.getElementById(oblastId).classList.remove('selected')
         modalStatus = 0
         
      }
   }
  //Масштабування клікнутої області
   function myFunc(oblastId){
      if (clicked[oblastId] === 0){
         clicked[oblastId] = 1
         document.getElementById(oblastId).classList.add('selected')
         modalInfo(oblastId)

      }

      //Можна видалити, потрібне для зменшення клікнутої області тільки, якщо немає модального вікна
      else if (clicked[oblastId] === 1){
         clicked[oblastId] = 0
         document.getElementById(oblastId).classList.remove('selected')
         modalInfo(oblastId)
      }
      //
   }
   //Визначення id області, для якої відкрите модальне вікно
   function closeModalInfo(){
      let opened = Object.keys(clicked).find(key => clicked[key] === 1)
      return(opened)
   }

   //Створення фону для модального вікна області
   function oblastBackground(opened){
      let pathD = document.getElementById(opened).getAttribute("d")
      console.log(pathD)
      let oblast = '<svg xmlns="http://www.w3.org/2000/svg" width="612.47321" height="408.0199" fill="#f00"> <path d="'+ pathD + '"/> </svg>';
      console.log(oblast)
      document.getElementById('oblastMap').style.backgroundImage = oblast
   }