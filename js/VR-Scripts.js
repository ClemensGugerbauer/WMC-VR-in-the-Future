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
function fadeOutEffect() {
    let target = document.getElementById("target");
    let video = document.getElementById("my-video");
    let navbar = document.querySelector('.navbar');
    let opacity = 1;
    let secondOpacity = 0;
    let wait = 5;
    video.style.top = 800 + "px";
    video.style.transform = "rotate(0deg)";
    let interval = setInterval(function () {
      moveVideoToTop(video);
      if (opacity > 0) {
        opacity -= 0.1;
        secondOpacity += 0.1;
        target.style.opacity = opacity;
        video.style.opacity = secondOpacity;
        navbar.classList.add('navbar-hidden');
      } else if (wait < 0.1){
        clearInterval(interval);
        fadeInEffect();
      }
      if (wait > 0){
        wait -= 0.15;
      }
    }, 40);
  }
  function fadeInEffect() {
    let target = document.getElementById("target");
    let video = document.getElementById("my-video");
    let navbar = document.querySelector('.navbar');
    let opacity = 0;
    let secondOpacity = 1;
    let wait = 5;
    let interval = setInterval(function () {
      moveVideoToBottom(video);
      if (wait > 0){
        wait -= 0.5;
      }
      if (opacity < 1 && wait < 1) {
        opacity += 0.1;
        secondOpacity -= 0.1;
        target.style.opacity = opacity;
        video.style.opacity = secondOpacity;
        navbar.classList.remove('navbar-hidden');
      } else if (opacity >= 0 && wait < 0.1) {
        clearInterval(interval);
      }
     
    }, 40);
  }
  
  function moveVideoToBottom(video) {
    let currentPosition = parseInt(video.style.top); // get current top position
    let move = currentPosition/ 25;
    let newPosition = currentPosition + move; 
    video.style.top = newPosition + "px";  // set the new  position in pixels
    video.style.transform += "rotate(0.2deg)";
  }
  function moveVideoToTop(video) {
    let currentPosition = parseInt(video.style.top) || 900; // get current top position
    let move = currentPosition / 20;
    let newPosition = currentPosition - move; 
    video.style.top = newPosition + "px"; // set the new  position in pixels
    video.style.transform += "rotate(0.2deg)";
  }

  function SetBodyHeight(){
    document.body.style.height = window.innerHeight + 'px';
  }