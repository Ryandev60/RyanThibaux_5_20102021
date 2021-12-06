// Recupération des données du produit cliqué

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

// Variable contenant le code pour convertir le prix en euro

const euro = Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;

// Récupération de la div englobant l'image du produit

const productImgDiv = document.querySelector(".item__img");
const productImg = document.createElement("img");
productImgDiv.appendChild(productImg);

// Récupération du titre du produit

const productTitle = document.getElementById("title");

// Récupération du prix du produit

const productPrice = document.getElementById("price");

// Récupération de la description du produit

const productDescription = document.getElementById("description");

// Récupération du tableau de couleurs du produit

const productColors = document.getElementById("colors");

// Récupération de la quantité du produit

const quantity = document.getElementById("quantity");

// Récupération du boutton ajouter au panier

const addToCartButton = document.getElementById("addToCart");

// Affichage du produit

function showproduct(product) {
  // Vérification du produit cliqué
  console.log("Produit cliqué et afficher :");
  console.log(product);

  // Affichage de l'image

  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  // Affichage du titre

  productTitle.innerHTML = product.name;

  // Affichage du prix

  productPrice.innerHTML = euro(product.price);

  // Affichage de la description

  productDescription.innerHTML = product.description;

  // Affichage du menu déroulant des couleurs

  for (const color of product.colors) {
    const productColorsOptions = document.createElement("option");
    productColorsOptions.innerHTML = color;
    productColors.appendChild(productColorsOptions);
  }

  //Lors du clic sur le bouton ajouter au panier on apelle la fonction addToCart
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });
}

// Fonction ajouter au panier

const addToCart = (product) => {
  let cartData = localStorage.getItem("cart");

  // Création de l'objet qui sera introduit dans cartData

  const productToAdd = {
    id: product._id,
    image: product.imageUrl,
    color: productColors.value,
    name: product.name,
    price: product.price,
    quantity: parseInt(quantity.value),
  };

  // Si le client ne séléctionne pas de quantité ou de couleur, on lui demande

  if (quantity.value == 0 || productColors.value === "") {
    alert("Veuillez choisir une couleur ainsi que la quantité du produit");
  } else if (cartData === null) {
    // Si l'objet cartData n'existe pas encore on le crée afin d'ajouter le premier produit au panier
    cartData = [productToAdd];
    redirectionToCart();
  } else {
    // Ajout du nouveau produit dans cartData
    cartData = JSON.parse(cartData);

    // On parcours cartData afin de vérifier si le produit existe déja

    for (let i = 0; i < cartData.length; i++) {
      if (
        cartData[i].id === product._id &&
        cartData[i].color === productColors.value
      ) {
        // Si le produit existe déja alors on additione la quantité
        cartData[i].quantity += parseInt(quantity.value);
        redirectionToCart();
        break;
      } else if (i === cartData.length - 1) {
        // Si le produit n'existe pas alors on le rajoute
        addProduct(cartData, productToAdd);
        redirectionToCart();
        break;
      }
    }
  }

  // Transformation du tableau cartData en objet JSON puis on l'ajoute dans le localStorage
  if (productColors.value !== "" && quantity.value != 0) {
    localStorage.setItem("cart", JSON.stringify(cartData));
    console.log(quantity.value);
  }
};

// Fonction pour envoyer productToAdd dans cartData

const addProduct = (cartData, productToAdd) => {
  cartData.push(productToAdd);
};

// Fonction pour rediriger les clients sur la page panier

const redirectionToCart = () => {
  if (
    confirm(
      "Le produit a été ajouté au panier. Voulez-vous voir votre panier ?"
    )
  ) {
    // Si le client clique sur "ok" il est rediriger vers la page panier

    location.href = "cart.html";
  }
};
