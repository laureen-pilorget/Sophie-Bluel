const gallery = document.querySelector(".gallery")
const filterButton = document.createElement('button');

/// Créer la gallery//////


function createGallery(works) {
    works.forEach(work => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        image.src = work.imageUrl;
        descriptionImg.textContent = work.title;
        gallery.appendChild(imageBox);
        imageBox.append(image, descriptionImg);
    });
} 

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(works => createGallery(works)
    );



////// Créer les boutons//////
const filters = document.querySelector(".filters")

function createFilterButtons(categories) {
    categories.forEach(category => {
        filterButton.innerText = category.name;
        filters.appendChild(filterButton);


        filterButton.addEventListener("click",() =>{
            gallery.innerHTML="";
            createGallery()
            if (category.name===work.name);
        })
    });
} 

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json()) 
    .then(categories => createFilterButtons(categories)
    );


function trier(createFilterButtons,createGallery) {
    if (work.name === )
}