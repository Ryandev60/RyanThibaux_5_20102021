// RECUPERATION DES DONNEES
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then(response => {
  showProducts(response)
})
.catch(error => alert("Erreur : " + error));

// AFFICHAGE DES DONNEES
function showProducts(products) {
 const maSection = document.getElementById('items')

 for(const product of products) {
  console.log('information du produit:')
  console.log(product)
//ARTICLE LINK
let productLink = document.createElement("a");
productLink.href = 'product.html?id=' + product._id
document.getElementById("items").appendChild(productLink);
//ARTICLE
let productArticle = document.createElement("article");
productLink.appendChild(productArticle);
//IMAGE
let productImg = document.createElement("img");
productImg.src = product.imageUrl;
productImg.alt = product.name;
productArticle.appendChild(productImg);
//TITLE
let productTitle = document.createElement("h3");
productTitle.innerHTML = product.name;
productArticle.appendChild(productTitle);
//DESCRIPTION
let productText = document.createElement("p");
productArticle.appendChild(productText);
productText.innerHTML = product.description;
//PRICE
let productPrice = document.createElement("p")
productArticle.appendChild(productPrice);
productPrice.innerHTML = product.price + " €";
//BUTTON
let productButton = document.createElement("button");
productArticle.appendChild(productButton);
productButton.type = "button";
productButton.innerHTML = "Voir l'article";
productButton.style.backgroundColor = "#3498db";
productButton.style.color = "#fff";
productButton.style.border = "none";
productButton.style.borderRadius = "15px"
productButton.style.padding = "8px 16px 8px 16px"
productButton.style.marginBottom = "16px"
//BUTTON LINK
let productButtonLink = document.createElement("a");
productArticle.appendChild(productButtonLink);
productButtonLink.appendChild(productButton);
productButtonLink.href = 'product.html?id=' + product._id;
productButton.style.cursor = "pointer";
productButtonLink.style.width = "fit-content";

 }
}




