const areasText = {
    Studio: {title: "The Studio <span class=subtitle>75m²</span>", desc: "Former photo studio of a renowned photographer, white, sober, with polished concrete floor, the studio allows many configurations", link: "studio"},
    Backstage1: {title: "The Backstages <span class=subtitle>77m²</span>", desc: "From makeup room, to a VIP space, via a fullsize production office", link: "backstages"},
    Salon: {title: "The Loft <span class=subtitle>135m²</span>", desc: "A huge open modular place, filled with designers' objects and possibilities", link: "loft"},
    Backstage2: {title: "The Backstages <span class=subtitle>77m²</span>", desc: "From makeup room, to a VIP space, via a fullsize production office", link: "backstages"},
    Terrasse: {title: "Rooftop/ Terrasse <span class=subtitle>470m²</span>", desc: "A 230m² completes a 240m² terrasse, giving a unique haven of peace, an oasis impossible to find elsewhere", link: "rooftop"},
    Rooftop: {title: "Rooftop/ Terrasse <span class=subtitle>470m²</span>", desc: "A 230m² completes a 240m² terrasse, giving a unique haven of peace, an oasis impossible to find elsewhere", link: "rooftop"},
};

const areaImage = {
    Studio: "studio",
    Backstage1: "backstage",
    Salon: "salon",
    Backstage2: "backstage",
    Terrasse: "terrasse",
    Rooftop: "terrasse",
    none: "loft",
};

document.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById('apartmentPlan');
    var areas = document.querySelectorAll('area');
    var originalImageSrc = image.src;

    areas.forEach(function(area) {
        area.addEventListener('mouseenter', function() {
            var areaTitle = this.getAttribute('title');
            image.src = `assets/img/place/rooftopplan_${areaTitle}.png`; // Change to highlighted image

            var descriptionButton = document.getElementById('littleButton');
            var descriptionTitle = document.getElementById('littleTitle');
            var descriptionText = document.getElementById('littleDescription');
            descriptionTitle.innerHTML = areasText[areaTitle]['title'] || areasText['none']['title'];
            descriptionText.innerHTML = areasText[areaTitle]['desc'] || areasText['none']['desc'];
            descriptionButton.style.display = "inline-block";
            descriptionButton.href = `./${areasText[areaTitle]['link']}.html`;
            descriptionBox.style.backgroundImage  = `url('assets/img/places-thumbnails/${areaImage[areaTitle]}.jpg')`;

        });

        // area.addEventListener('mouseleave', function() {
        //     image.src = originalImageSrc; // Revert to the original image

        //     var descriptionTitle = document.getElementById('littleTitle');
        //     var descriptionText = document.getElementById('littleDescription');
        //     var descriptionButton = document.getElementById('littleButton');

        //     descriptionTitle.innerHTML =  areasText['none']['title'];
        //     descriptionText.innerHTML = areasText['none']['desc'];
        //     descriptionBox.style.backgroundImage  = `url('assets/img/places-thumbnails/loft.jpg')`;
        //     descriptionButton.style.display = "none";
        // });
    });

    // Function to resize map areas based on actual image size
    function resizeMap() {
        areas.forEach(function(area) {
            var originalCoords = area.dataset.originalCoords.split(',').map(function(coord) {
                return Math.round(coord * image.offsetWidth / image.naturalWidth);
            });
            area.coords = originalCoords.join(',');
        });
    }

    // Save the original coordinates
    areas.forEach(function(area) {
        area.dataset.originalCoords = area.getAttribute('coords');
    });

    // Resize map when window is resized
    window.addEventListener('resize', resizeMap);

    // Initial resize to adjust the map to the initial image size
    resizeMap();
});

var contactform = document.getElementById('contactform');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var nameInput = document.getElementById('name');
var message = document.getElementById('message');
var submitButton = document.getElementById('submitButton');
var projectType = document.getElementById('projectType');

const publicKey = "kdHrdq7y59fUkNRq2";
const serviceID = "service_pka2q0p";
const templateID = "template_qe0v1j6";
emailjs.init(publicKey);

contactform.addEventListener('submit', e => {
    e.preventDefault();
    submitButton.innerText = "Sending now...";
    const inputFields = {
        name: nameInput.value,
        email: email.value,
        projectType: projectType.value,
        message: message.value,
        phone: phone.value
    };
    emailjs.send(serviceID, templateID, inputFields).then(()=> {
        submitButton.innerText = "Message sent!";
        nameInput.value = "";
        email.value = "";
        projectType.value = "";
        message.value = "";
        phone.value = "";
    }, (error) => {
        console.log(error);
        submitButton.innerText = "There was a problem...";

    })

})

