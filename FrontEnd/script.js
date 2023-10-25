/// GALLERY ET FILTRES ///

    /// CRÉATION DE LA GALLERY ///

const gallery = document.querySelector(".gallery")

function createGallery(images) {
    images.forEach(img => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        image.src = img.imageUrl;
        imageBox.id = img.id
        descriptionImg.textContent = img.title;
        gallery.appendChild(imageBox);
        imageBox.append(image, descriptionImg);
    });
} 

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(images => createGallery(images))
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });


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


    /// ALLER CHERCHER LES BUTTONS DANS LE SWAGGER ///

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json()) 
    .then(categories => createFilterButtons(categories))
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });


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
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
}



/// EDIT PAGE ///

    /// PASSER LA PAGE D'ACCUEIL EN MODE ÉDITION ///

const editMode = document.querySelector(".edit")
const modify = document.querySelector(".modify-button")
const userLogin = document.querySelector(".login");
const userToken = localStorage.getItem("token");
const userLogout = document.querySelector(".logout");
const selectCategories = document.querySelector(".filters");

if(userToken !== null) { 
    editMode.style.display = "block";
    modify.style.display = "inline-block";
    userLogin.style.display = "none";
    selectCategories.style.display = "none";
}else {
    editMode.style.display = "none";
    modify.style.display = "none";
    userLogin.style.display = "block";
    userLogout.style.display = "none";
}


    /// LOGOUT ///

userLogout.addEventListener("click", () => {
    localStorage.clear();
    console.log(userLogout);
})



/// MODALES ///

    /// OUVERTURE DES MODALES AU CLICK /// 

const modal1 = document.querySelector("#modal1");
const modal2 = document.getElementById("modal2");
const addImgModal1 = document.querySelector(".addImage");

            /// MODALE 1 ///
modify.addEventListener("click", () => {
    modal1.style.display = "flex";
})

            /// MODALE 2 ///

addImgModal1.addEventListener("click", () => {
    modal2.style.display = "flex";
    modal1.style.display = "none";
})


    /// FERMETURE DES MODALES AU CLICK SUR LA CROIX///

const closeModal1 = document.querySelector(".fa-xmark");
const closeModal2 = document.querySelector(".close-modal2");

            /// MODALE 1 ///

closeModal1.addEventListener("click", () => {
    modal1.style.display = "none";
})

            /// MODALE 2 ///

closeModal2.addEventListener("click", () => {
    modal2.style.display = "none";
})


    /// RETOURNER À LA MODALE 1 AU CLICK SUR LA FLÈCHE///

const returnModal1 = document.querySelector(".fa-arrow-left")

returnModal1.addEventListener("click", () => {
    modal2.style.display = "none";
    modal1.style.display = "flex";
})


    /// FERMETURE DES MODALES AU CLICK À L'EXTÉRIEUR DES MODALES ///

const galleryModal = document.querySelector("#modal1 .gallery-modal");
const addPhotoModal = document.querySelector("#modal2 .add-photo-modal");

            /// MODALE 1 ///

modal1.addEventListener('click', () =>{
    modal1.style.display = "none";
})

galleryModal.addEventListener('click', (e) =>{
    e.stopPropagation()
})

            /// MODALE 2 ///

modal2.addEventListener('click', () =>{
    modal2.style.display = "none";
})

addPhotoModal.addEventListener('click', (e) =>{
    e.stopPropagation()
})



/// MODALE DE SUPPRESSION IMAGES ///

    /// IMPORTER LES IMAGES DE LA GALLERY DANS LA MODALE ///

const figureModal = document.querySelector(".figure-modal");

function createGalleryModal(images) {
    images.forEach(img => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        const trash = document.createElement('i');
        image.src = img.imageUrl;
        trash.classList.add("fa-solid","fa-trash-can");
        imageBox.append(image, descriptionImg);
        figureModal.appendChild(imageBox);
        descriptionImg.appendChild(trash);
            /// SUPPRIMER LES IMAGES DANS LA GALLERY AU CLICK ///
        trash.addEventListener("click", () => {
            removeFigure(img.id);
            document.getElementById(img.id).remove();
            imageBox.remove();
        })
        
    })
}

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(images => createGalleryModal(images))
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });


  /// SUPPRIMER UNE IMAGE CÔTÉ BACKEND AU CLICK ///

function removeFigure(imgId){
    fetch(`http://localhost:5678/api/works/${imgId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken}` 
        },
    })
    .then(response => response.ok)
    .catch(error => console.error("Erreur : Aucune réponse de l'API (POST api/works/ID) lors de la suppression de l'image", error));
}

/// MODALE D'AJOUT IMAGES///

    /// RÉCUPÉRER L'IMAGE AJOUTÉE ET LA METTRE DANS LA MODALE2 ///

const imgUpload = document.querySelector("#img-upload");
const imgUploadBox = document.querySelector(".imgAdded");
const imgIcon = document.querySelector(".fa-image");
const buttonAddImg = document.querySelector(".new-img-button");
const paragraph = document.querySelector(".paragraph");

imgUpload.addEventListener('change', function () {
    if (this.files.length > 0) {
        const selectedFile = this.files[0];
        const imgUrl = URL.createObjectURL(selectedFile);
        const imgAdded = document.createElement("img");
        imgAdded.src = imgUrl;
        imgUploadBox.innerHTML = '';
        imgUploadBox.appendChild(imgAdded);
        imgIcon.style.display = "none";
        buttonAddImg.style.display = "none";
        paragraph.style.display = "none";
    }
})


    /// RÉCUPÉRER LES CATÉGORIES DE L'API ///

const selectCategory = document.querySelector("#category");

function createOptionCategories(categories) {
    categories.forEach(category => {
        const filterCategories = document.createElement('option');
        filterCategories.innerText = category.name;
        filterCategories.value = category.id;        
        selectCategory.appendChild(filterCategories);
    });
}

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json()) 
    .then(categories => {
        createOptionCategories(categories)
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    })


    /// RÉCUPÉRER TOUTES LES INFORMATIONS DU FORMULMAIRE ///

const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    const imgfile = document.getElementById("img-upload").files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imgfile);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
              window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données :", error);
        });
});


    /// CHANGEMENT COULEUR BUTTON AU VALIDATE ///
const validateButton = document.querySelector(".validate");
const inputImg = document.getElementById("img-upload");
const inputTitle = document.getElementById("title");

function changeColorSubmitButton () {
    if (inputImg.files[0] && inputTitle.value !== "") {
        validateButton.style.background = "#1D6154"
    } else {
        validateButton.style.background = ""
    }
}

inputImg.addEventListener("input", changeColorSubmitButton);
inputTitle.addEventListener("input", changeColorSubmitButton);