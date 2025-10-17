window.onload = function() {
    var loader = document.getElementById('loader');
    const mainSection = document.querySelector('main');
    mainSection.style.opacity = '1';  
    loader.style.opacity = '0';
    setTimeout(function() {
        loader.style.display = 'none';
        loader.style.zIndex = -1;
    }, 300); // same duration as the CSS transition
};

const areasText = {
    Studio: { title: "Le studio <span class=subtitle>75m²</span>", desc: " En lumière du jour, zénithale ou avec rideaux noirs, le studio permet de nombreuses configurations", link: "studio" },
    Backstage1: { title: "Backstage <span class=subtitle>85m²</span>", desc: "Loges maquillage et bureau de production", link: "backstages" },
    Loft: { title: "Le Loft <span class=subtitle>135m²</span>", desc: "Open space permettant une modularité totale, décoration soignée, moderne et chaleureuse", link: "loft" },
    Backstage2: { title: "VIP area <span class=subtitle>25m²</span>", desc: "Un espace privé avec salle d’eau en suite pour les 'special guests'", link: "backstages2" },
    Terrasse: { title: "Terrace <span class=subtitle>240m²</span>", desc: "Un havre de paix exceptionnel , oasis inattendue en milieu urbain, en retrait de la rue", link: "terrasse" },
    Rooftop: { title: "Rooftop<span class=subtitle>230m²</span>", desc: "360 ° Plein ciel .. pour une imagination sans limites", link: "rooftop" },
};

const areaImage = {
    Studio: "studio",
    Backstage1: "backstage",
    Loft: "Loft",
    Backstage2: "backstages2",
    Terrasse: "terrasse",
    Rooftop: "rooftop",
    none: "main",
};

document.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById('apartmentPlan');
    var areas = document.querySelectorAll('area');
    var originalImageSrc = image.src;

    areas.forEach(function(area) {
        area.addEventListener('mouseenter', function() {
            var areaTitle = this.getAttribute('title');
            image.src = `assets/img/place/rooftopplan_${areaTitle}.png`; // Change to highlighted image

            // var descriptionButton = document.getElementById('littleButton');
            var descriptionTitle = document.getElementById('littleTitle');
            var descriptionText = document.getElementById('littleDescription');
            descriptionTitle.innerHTML = areasText[areaTitle]['title'] || areasText['none']['title'];
            descriptionText.innerHTML = areasText[areaTitle]['desc'] || areasText['none']['desc'];
            // descriptionButton.style.display = "inline-block";
            // descriptionButton.href = `./${areasText[areaTitle]['link']}.html`;
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

