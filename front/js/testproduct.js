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
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

// AFFICHAGE DES PRODUITS

function showProducts(products) {
  // TITRE

  const productTitle = document.getElementById("title");
  productTitle.innerHTML = products.name;

  // IMAGE

  const productImgDiv = document.querySelector(".item__img");
  const productImg = document.createElement("img");
  productImgDiv.appendChild(productImg);
  productImg.src = products.imageUrl;
  productImg.alt = products.name;

  // PRIX

  const productPrice = document.getElementById("price");
  productPrice.innerHTML = products.price;

  // DESCRIPTION

  const productDescription = document.getElementById("description");
  productDescription.innerHTML = products.description;

  // SELECTION COULEUR

  const productColors = document.getElementById("colors");
  for (const color of products.colors) {
    const productColorsOptions = document.createElement("option");
    productColorsOptions.innerHTML = color;
    productColors.appendChild(productColorsOptions);
  }

  // RECUPERATION BOUTON CART

  const addToCartButton = document.getElementById("addToCart");

  // AJOUT ECOUTEUR D'EVENEMENT CLICK SUR LE BOUTON CART

  addToCartButton.addEventListener("click", () => {
    addToCart(products);
  });

  // RECUPERATION DE L'OBJET CART DANS LE LOCAL STORAGE

  const addToCart = (products) => {
    let cartData = localStorage.getItem("cart");
    const quantity = document.getElementById("quantity");
    console.log(quantity.value);
    const productToAdd = {
      id: products._id,
      image: products.imageUrl,
      color: productColors.value,
      name: products.name,
      price: products.price,
      quantity: parseInt(quantity.value),
    };

    // SI LE CLIENT NE SELECTIONNE PAS DE QUANTITE OU DE COULEUR ON LUI DEMANDE
    if (quantity.value == 0 || productColors.value == "") {
      alert("Veuillez choisir une couleur ainsi que la quantité du produit");
    }

    // SI L'OBJET DANS LE LOCAL STORAGE N'EXISTE PAS ON LE CREE
    else if (cartData === null) {
      cartData = [productToAdd];
    }

    // SINON ON TRANSFORME EN TABLEAU
    else {
      cartData = JSON.parse(cartData);
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].id === products._id) {
          console.log("Product existe");
          if (cartData[i].color === productColors.value) {
            console.log("Color existe");
  
            cartData[i].quantity += parseInt(quantity.value);
          } else {
            console.log("No color new product");
  
            addProduct(cartData, productToAdd);
          }
        } else {
          console.log("New product");
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

// for (var i = 0; i < cartData.length; i++) {
//   if (
//     cartData[i]["id"] &&
//     cartData[i]["color"] == cartData[i]["id"] &&
//     cartData[i]["color"]
//   ) {
//     cartData["quantity"] = cartData["quantity"] + quantity.value;
//   }
// }

// for (const elementId in cartData) {
//   ;
// }
