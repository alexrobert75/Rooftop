// Carousel

// Select big pictures and thumbnails using class
var bigPics = document.querySelectorAll('.bigpic');
var miniPics = document.querySelectorAll('.tpic');

// Function to change display of pictures
var changeDisplay = function(bigPic, miniPic) {
    // Hide all big pictures and reset thumbnails
    bigPics.forEach(pic => pic.classList = "bigpic");
    miniPics.forEach(pic => pic.classList = "tpic");

    // Show selected big picture and highlight thumbnail
    bigPic.classList = "bigpic showimg";
    miniPic.classList = "tpic clear";
};

window.onload = function() {
    console.log('okok');
    var loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(function() {
        loader.style.display = 'none';
        loader.style.zIndex = -1;
    }, 300); // same duration as the CSS transition

    // Set default display on load for carousel
    changeDisplay(bigPics[0], miniPics[0]);
};


// Thumbnail click events
miniPics.forEach((miniPic, index) => {
    miniPic.addEventListener("click", function() {
        changeDisplay(bigPics[index], miniPics[index]);
    });
});

// Navigation arrows
var previous = document.getElementById('prev');
var next = document.getElementById('next');
var currentIndex = 0;

next.addEventListener("click", function() {
    currentIndex = (currentIndex + 1) % bigPics.length;
    changeDisplay(bigPics[currentIndex], miniPics[currentIndex]);
});

previous.addEventListener("click", function() {
    currentIndex = (currentIndex - 1 + bigPics.length) % bigPics.length;
    changeDisplay(bigPics[currentIndex], miniPics[currentIndex]);
});

// Keyboard navigation
document.body.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous.click();
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next.click();
    }
});

// Fullscreen image
var picB = document.getElementById("mainP");
var modal = document.querySelector(".modal");
var span = document.getElementById("closed");
var carousel = document.getElementById("caroussel");

picB.onclick = function () {
    picB.classList.toggle("modal");
    span.style.display = (span.style.display === "block") ? "none" : "block";
    carousel.classList.toggle("relativeP");
    previous.classList.toggle("bigfleche");
    next.classList.toggle("bigfleche");
};
