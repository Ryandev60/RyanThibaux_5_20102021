// RECUPERATION DES DONNEES

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

// AFFICHAGE DES PRODUITS

function showProducts(products) {
  for (const product of products) {;

    // LIENS ARTICLE

    const productLink = document.createElement("a");
    productLink.href = "product.html?id=" + product._id;
    document.getElementById("items").appendChild(productLink);

    // ARTICLE

    const productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // IMAGE

    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.name;
    productArticle.appendChild(productImg);

    // TITRE

    const productTitle = document.createElement("h3");
    productTitle.innerHTML = product.name;
    productArticle.appendChild(productTitle);

    // DESCRIPTION

    const productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description;

    // PRIX

    const productPrice = document.createElement("p");
    productArticle.appendChild(productPrice);
    productPrice.innerHTML = product.price + " €";

    // BOUTTON

    const productButton = document.createElement("button");
    productArticle.appendChild(productButton);
    productButton.type = "button";
    productButton.innerHTML = "Voir l'article";
    productButton.style.backgroundColor = "#3498db";
    productButton.style.color = "#fff";
    productButton.style.border = "none";
    productButton.style.borderRadius = "15px";
    productButton.style.padding = "8px 16px 8px 16px";
    productButton.style.marginBottom = "16px";

    // LIEN BOUTTON
    
    const productButtonLink = document.createElement("a");
    productArticle.appendChild(productButtonLink);
    productButtonLink.appendChild(productButton);
    productButtonLink.href = "product.html?id=" + product._id;
    productButton.style.cursor = "pointer";
    productButtonLink.style.width = "fit-content";
  }
};