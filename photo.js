

const auth = 'DGMNnrI6drHv2dhs8yPv2PLMlbXIHAhskXCCFRJvp8xpVJ6tKAmq0uWs';

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
let more = document.querySelector(".more")
let currentSearch;
let page = 1;


function curatedPhotos() {
  fetch("https://api.pexels.com/v1/curated?per_page=16&page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    }
  })
    .then(res => res.json())
    .then(data => displayPhoto(data))
}

curatedPhotos();

function displayPhoto(photos) {
  let allPhotos = photos.photos

  allPhotos.forEach(photo => {
    const galleryImage = document.createElement("div")
    galleryImage.classList.add("gallery-img")
    galleryImage.innerHTML = `
        
        <img src="${photo.src.large}" alt="">
        <div class ="gallery-info">
            <a href="${photo.src.original}">Download</a>
            <p>${photo.photographer}</p>
         </div>   
        
       `
    gallery.appendChild(galleryImage)
  });
}

function searchPhotos(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    }
  })
    .then(res => res.json())
    .then(data => displaySearch(data))
}

function displaySearch(query) {
  let allPhotos = query.photos
  console.log(allPhotos)

  allPhotos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
            
            <img src="${photo.src.large}" alt="">
            <div class ="gallery-info">
                <a href="${photo.src.original}">Download</a>
                <p>${photo.photographer}</p>
            </div>
            
           `
    gallery.appendChild(galleryImage)
  });
}

searchInput.addEventListener("input", updateSearch)

function updateSearch(e) {
  searchValue = e.target.value
}

form.addEventListener("submit", e => {
  gallery.innerHTML = ""
  e.preventDefault()
  currentSearch = searchValue
  searchPhotos(searchValue)
  searchInput.value = ""
});

more.addEventListener("click",loadMore)


async function loadMore(){
    page++;
    if(currentSearch){
        link = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`
    }
    else{
        link = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
    }

    const data = searchPhotos(link)
    displaySearch(data)
}












