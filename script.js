const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoad = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'gnbdwIIeBuBDZVksW9cuPipQ0tl6bX8Z1pJfYGDRuZ4';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;



// check if all images were loaded
function imageLoaded() {
    // console.log("image loaded");
    imageLoad++;
    console.log(imageLoad);
    if(imageLoad === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }

}



// helper function to set attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    // if is not declared here, imageLoad count 30+
    imageLoad = 0;
    totalImages = photosArray.length;
    console.log("total images", totalImages);
    // run function for each object in photoArrays
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, 
            alt: photo.alt_description,
            title:photo.alt_description,
        });
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> instead <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//  Get photos from Unsplash API
async function getPhotos() {
    try {
        const respone = await fetch(apiUrl);
        photosArray = await respone.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        
    }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    // console.log("scrolled")
    if(window.innerHeight + window.scrollY >= document.body
        .offsetHeight - 1000 && ready){
            ready = false;
            getPhotos();
            // console.log("window.innerHeight", window.innerHeight);
            // console.log("window.scrollY", window.scrollY);
            // console.log("window.innerHeight + window.scrollY", window.innerHeight +
            //  window.scrollY);
            // console.log(window.innerHeight + window.scrollY >= document.body
            //     .offsetHeight - 1000)
                console.log("Load More");           
    }
})



// onLoad
getPhotos();
// displayPhotos();