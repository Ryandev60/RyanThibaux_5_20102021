// RECUPERATION DES DONNES PAR RAPPORT AU PRODUIT CLIQUE

const str = document.location.href;
const url = new URL(str);
const searchParams = new URLSearchParams(url.search);

if (searchParams.has("id")) {
  var id = searchParams.get("id");
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    showproduct(response);
  })
  .catch((error) => alert("Erreur : " + error));

// VARIABLE QUI VA STOCKER LE CODE POUR CONVERTIR LE PRIX EN EURO

const euro = Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;

// RECUPERATION DIV IMG ET CREATION IMG

const productImgDiv = document.querySelector(".item__img");
const productImg = document.createElement("img");
productImgDiv.appendChild(productImg);

// RECUPERATION TITRE

const productTitle = document.getElementById("title");

// RECUPERATION PRIX

const productPrice = document.getElementById("price");

// RECUPERATION DESCRIPTION

const productDescription = document.getElementById("description");

// RECUPERATION COULEURS

const productColors = document.getElementById("colors");

// RECUPERATION QUANTITE

const quantity = document.getElementById("quantity");

// CREATION PRIX TOTAL

const lastBlock = document.querySelector(".item__content__settings__quantity");
const totalPrice = document.createElement("p");
totalPrice.style.margin = "10px 0 0 0";
lastBlock.appendChild(totalPrice);

// RECUPERATION BOUTTON AJOUTER AU PANIER

const addToCartButton = document.getElementById("addToCart");

// AFFICHAGE DU PRODUIT

function showproduct(product) {
  // AFFICHAGE DE L'IMAGE

  productImg.src = product.imageUrl;
  productImg.alt = product.name;

  // AFFICHAGE DU TITRE

  productTitle.innerHTML = product.name;

  // AFFICHAGE DU PRIX

  productPrice.innerHTML = euro(product.price);

  // AFFICHAGE DE LA DESCRIPTION

  productDescription.innerHTML = product.description;

  // AFFICHAGE SELECTION COULEURS

  for (const color of product.colors) {
    const productColorsOptions = document.createElement("option");
    productColorsOptions.innerHTML = color;
    productColors.appendChild(productColorsOptions);
  }

  // AFFICHAGE PRIX TOTAL

  totalPrice.innerHTML =
    "Total: " + euro(parseInt(quantity.value) * product.price);

  quantity.addEventListener("change", () => {
    if (quantity.value == 0) {
      quantity.value = 1;
    }
    totalPrice.innerHTML =
      "Total: " + euro(parseInt(quantity.value) * product.price);
  });

  // LORS DU CLIC SUR LE BOUTTON AJOUTER AU PANIER ON APELLE LA FONCTION addToCart

  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });

  // RECUPERATION DE L'OBJET CART DANS LE LOCAL STORAGE

  const addToCart = (product) => {
    let cartData = localStorage.getItem("cart");

    // CREATION DE L'OBJET QUI SERA INTRODUIT DANS CARTDATA

    const productToAdd = {
      id: product._id,
      image: product.imageUrl,
      color: productColors.value,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity.value),
    };

    // SI LE CLIENT NE SELECTIONNE PAS DE QUANTITE OU DE COULEUR ON LUI DEMANDE

    if (quantity.value == 0 || productColors.value == "") {
      alert("Veuillez choisir une couleur ainsi que la quantité du produit");
    } else if (cartData === null) {
      // SI L'OBJET DANS LE LOCAL STORAGE N'EXISTE PAS ON LE CREE
      cartData = [productToAdd];
      redirectionToCart();
    } else {
      cartData = JSON.parse(cartData);
      for (let i = 0; i < cartData.length; i++) {
        if (
          cartData[i].id === product._id &&
          cartData[i].color === productColors.value
        ) {
          cartData[i].quantity += parseInt(quantity.value);
          redirectionToCart();
          break;
        } else if (i === cartData.length - 1) {
          addProduct(cartData, productToAdd);
          redirectionToCart();
          break;
        }
      }
    }
    // TRANSFORMATION TABLEAU EN OBJET JSON PUIS AJOUT AU LOCAL STORAGE
    if (productColors.value != "") {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };
}

// FONCTION POUR ENVOYER LES DONNEES DE cartData DANS productToAdd

const addProduct = (cartData, productToAdd) => {
  cartData.push(productToAdd);
};

// FONCTION POUR REDIRIGER LE CLIENT VERS LA PAGE PANIER

function redirectionToCart() {
  if (
    confirm(
      "Le produit a été ajouté au panier. Voulez-vous voir votre panier ?"
    )
  ) {
    // REDIRECTION PAGE PANIER

    location.href = "cart.html";
  }
}
