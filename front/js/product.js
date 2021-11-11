// RECUPERATION DES DONNES PAR RAPPORT AU PRODUIT CLIQUE

const str = document.location.href;
const url = new URL(str);
const search_params = new URLSearchParams(url.search);

if (search_params.has("id")) {
  var id = search_params.get("id");
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    showproduct(response);
  })
  .catch((error) => alert("Erreur : " + error));

// RECUPERATION TITRE

const productTitle = document.getElementById("title");

// RECUPERATION DIV IMG ET CREATION IMG

const productImgDiv = document.querySelector(".item__img");
const productImg = document.createElement("img");
productImgDiv.appendChild(productImg);

// RECUPERATION PRIX

const productPrice = document.getElementById("price");

// RECUPERATION DESCRIPTION

const productDescription = document.getElementById("description");

// RECUPERATION COULEURS

const productColors = document.getElementById("colors");

// RECUPERATION BOUTTON AJOUTER AU PANIER

const addToCartButton = document.getElementById("addToCart");

// AFFICHAGE DU PRODUIT

function showproduct(product) {
  // AFFICHAGE DU TITRE

  productTitle.innerHTML = product.name;

  // AFFICHAGE DE L'IMAGE

  productImg.src = product.imageUrl;
  productImg.alt = product.name;

  // AFFICHAGE DU PRIX

  productPrice.innerHTML = product.price;

  // AFFICHAGE DE LA DESCRIPTION

  productDescription.innerHTML = product.description;

  // SELECTION COULEUR

  for (const color of product.colors) {
    const productColorsOptions = document.createElement("option");
    productColorsOptions.innerHTML = color;
    productColors.appendChild(productColorsOptions);
  }

  // AJOUT ECOUTEUR D'EVENEMENT CLICK SUR LE BOUTON CART

  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });

  // RECUPERATION DE L'OBJET CART DANS LE LOCAL STORAGE

  const addToCart = (product) => {
    let cartData = localStorage.getItem("cart");
    const quantity = document.getElementById("quantity");
    console.log(quantity.value);

    // CREATION DE L'OBJET QUI SERA INTRODUIT DANS CARTDATA
    const productToAdd = {
      id: product._id,
      image: product.imageUrl,
      color: productColors.value,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity.value),
    };

    if (quantity.value == 0 || productColors.value == "") {
      // SI LE CLIENT NE SELECTIONNE PAS DE QUANTITE OU DE COULEUR ON LUI DEMANDE
      alert("Veuillez choisir une couleur ainsi que la quantité du produit");
    } else if (cartData === null) {
      // SI L'OBJET DANS LE LOCAL STORAGE N'EXISTE PAS ON LE CREE
      cartData = [productToAdd];
    } else {
      // SINON ON TRANSFORME EN TABLEAU
      cartData = JSON.parse(cartData);
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].id === product._id && cartData[i].color === productColors.value) {
          console.log("Product existe");
          

            cartData[i].quantity += parseInt(quantity.value);
            
            
        } else {
          addProduct(cartData, productToAdd);
        }
      }
    }

    console.log("Panier init");
    console.log(cartData);

    // TRANSFORMATION TABLEAU EN OBJET JSON PUIS AJOUT AU LOCAL STORAGE

    localStorage.setItem("cart", JSON.stringify(cartData));
    if (
      confirm(
        "Le produit a été ajouté au panier. Voulez-vous voir votre panier ?"
      )
    ) {
      // REDIRECTION PAGE PANIER

      location.href = "cart.html";
    }
  };
}

const addProduct = (cartData, productToAdd) => {
  cartData.push(productToAdd);
};
