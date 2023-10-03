const gallery = document.querySelector(".gallery")

/// CRÉATION DE LA GALLERY ///


function createGallery(images) {
    images.forEach(img => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        image.src = img.imageUrl;
        descriptionImg.textContent = img.title;
        gallery.appendChild(imageBox);
        imageBox.append(image, descriptionImg);
    });
} 

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(images => createGallery(images));

/// CRÉATION DES BUTTONS ///
const filters = document.querySelector(".filters")

function createFilterButtons(categories) {
    categories.forEach(category => {
        const filterButton = document.createElement('button');
        filterButton.innerText = category.name;
        filters.appendChild(filterButton);
        /// ON FILTRE AU CLICK DES BUTTONS///
        filterButton.addEventListener("click",() => {
            createFilterImg(category.name);
        })
    });
} 

/// EXÉCUTION DE LA FONCTION POUR LES BUTTONS ///

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json()) 
    .then(categories => createFilterButtons(categories)
    );

/// CRÉATION DES FILTRES ///

function createFilterImg(categoryName) {
    fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(images => {
            const filtersImages = images.filter (img => img.category.name === categoryName);
            gallery.innerHTML = "";
            createGallery(filtersImages);
            const buttonForAllImages = document.querySelector(".allImages")
            buttonForAllImages.addEventListener("click",() => {
                gallery.innerHTML = "";
                createGallery(images)
            })
        })
}

/// EDIT PAGE ///

///console.log(localStorage.getItem("token"));

//const editMode = document.querySelectorAll(".hidden");
const editMode = document.querySelector(".edit")
const login = document.querySelector(".login")
const modify = document.querySelector(".modify-button")
const userLogin = document.querySelector(".login");
const userToken = localStorage.getItem("token");


editMode.style.display = "block";
login.style.display = "block";
modify.style.display = "inline-block";
userLogin.style.display = "none";

/// LOGOUT ///

const userLogout = document.querySelector(".logout")

userLogout.addEventListener("click", () => {
    localStorage.clear();
})


/// GALLERY MODAL ///

/*const galleryModal = document.querySelector(".gallery-modal");

function createGalleryModal(images) {
    images.forEach(img => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        image.src = img.imageUrl;
        galleryModal.appendChild(imageBox);
        imageBox.append(image);
    });
} 

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(images => createGallery(images));*/