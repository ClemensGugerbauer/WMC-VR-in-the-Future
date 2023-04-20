function scrollToElement(section) {
    let element = document.getElementById(section);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
function setNavbarPosition() {
    let navbar = document.querySelector('.navbar');
    let navbarHeight = navbar.offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navbarHeight) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
    });
}