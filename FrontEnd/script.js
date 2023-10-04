
/// CRÉATION DE LA GALLERY ///

const gallery = document.querySelector(".gallery")

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
//console.log(localStorage.getItem(userId));


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


    /// IMPORTER LES IMAGES DE LA GALLERY DANS LA MODALE ///

const galleryModal = document.querySelector(".figure-modal");

function createGalleryModal(images) {
    images.forEach(img => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        const trash = document.createElement('i');
        image.src = img.imageUrl;
        trash.classList.add("fa-solid","fa-trash-can");
        trash.dataset.imageId= img.id;
        imageBox.append(image, descriptionImg);
        galleryModal.appendChild(imageBox, descriptionImg);
        descriptionImg.appendChild(trash);
            /// supprimer les images dans la gallery au click ///
        trash.addEventListener("click", () => {
            imageBox.remove
            removeFigure(img.id);
        })
    });
} 

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(images => createGalleryModal(images));


    /// OUVRIR LA MODALE AU CLICK ///

const modal1 = document.querySelector("#modal1");

modify.addEventListener("click", () => {
    modal1.style.display = "flex";
})


    /// FERMER LA MODALE AU CLICK ///

const close = document.querySelector(".fa-xmark");

close.addEventListener("click", () => {
    modal1.style.display = "none";
})


    /// SUPPRIMER UNE IMAGE AU CLICK ///
function removeFigure(imgId){
    fetch(`http://localhost:5678/api/works/${imgId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken}` 
        },
    })
    .then(response => {
        if (response.ok) {
            updateGalleryAfterDeletion(imageId);
        }
    })
}

function updateGalleryAfterDeletion(deletedImageId) {
    const galleryAllImg = gallery.querySelectorAll("figure");
    galleryAllImg.forEach(image => {
        const idImg = image.querySelectorAll("img").dataset.idImg;
        if (idImg == deletedImageId) {
            image.remove();
        }
    });
}