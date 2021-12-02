// Recuperation des données dans l'API

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

// Fonction pour afficher les produits retourné par l'API

function showProducts(products) {

  // Vérification du tableau retourné par l'API
  console.log("Liste des produits retournés par l'API :");
  console.log(products);
  for (const product of products) {
    // Liens des articles

    const productLink = document.createElement("a");
    productLink.href = "product.html?id=" + product._id;
    document.getElementById("items").appendChild(productLink);

    // Article (Vignette)

    const productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // Image du produit

    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
    productArticle.appendChild(productImg);

    // Titre du produit

    const productTitle = document.createElement("h3");
    productTitle.innerHTML = product.name;
    productArticle.appendChild(productTitle);

    // Description du produit

    const productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description;

    // Prix du produit

    const productPrice = document.createElement("p");
    productArticle.appendChild(productPrice);
    productPrice.innerHTML = product.price + " €";

    // Boutton voir l'article pour plus d'ergonomie

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
    productButton.style.cursor = "pointer";
  }
}
