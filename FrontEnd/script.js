const gallery = document.querySelector(".gallery")

/// Créer la gallery//////


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



////// Créer les boutons//////
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

//Execution de la fonction pour les buttons//

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json()) 
    .then(categories => createFilterButtons(categories)
    );

/// CREATION DES FILTRES///

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