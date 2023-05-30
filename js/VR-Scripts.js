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
    var target = document.getElementById("target");
    var video = document.getElementById("my-video");
    let navbar = document.querySelector('.navbar');
    var opacity = 1;
    var secondOpacity = 0;
    var wait = 5;
    video.style.top = 800 + "px";
    video.style.transform = "rotate(0deg)";
    var interval = setInterval(function () {
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
    var target = document.getElementById("target");
    var video = document.getElementById("my-video");
    let navbar = document.querySelector('.navbar');
    var opacity = 0;
    var secondOpacity = 1;
    var wait = 5;
    var interval = setInterval(function () {
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
    var currentPosition = parseInt(video.style.top); // get current top position
    var move = currentPosition/ 25;
    var newPosition = currentPosition + move; 
    video.style.top = newPosition + "px";  // set the new  position in pixels
    video.style.transform += "rotate(0.2deg)";
  }
  function moveVideoToTop(video) {
    var currentPosition = parseInt(video.style.top) || 900; // get current top position
    var move = currentPosition / 20;
    var newPosition = currentPosition - move; 
    video.style.top = newPosition + "px"; // set the new  position in pixels
    video.style.transform += "rotate(0.2deg)";
  }

  function SetBodyHeight(){
    document.body.style.height = window.innerHeight + 'px';
  }