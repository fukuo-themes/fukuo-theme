const currentLink = location.pathname;
const navLink = document.querySelectorAll(".nav__menu a");
navLink.forEach(function (item, idx) {
    if (item.getAttribute("href") === currentLink) {
        item.parentElement.classList.add("nav__menu--actived");
    }
});