const hamburgerMenu = document.getElementById("hamburger-icon");
const link = document.querySelectorAll(".link");
const closeBtn = document.getElementById("close");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Menu
hamburgerMenu.addEventListener("click", function () {
  const sidebar = document.getElementById("sidebars");
  sidebar.classList.toggle("toggle");
});

//   close icon
function closeNav() {
  const sidebar = document.getElementById("sidebars");
  sidebar.classList.toggle("toggle");
}
