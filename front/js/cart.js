// Varible qui va stocker le prix total et la quantité total

let priceTotal = 0;
let quantityTotal = 0;

// VARIABLE QUI VA STOCKER LE CODE POUR CONVERTIR LE PRIX EN EURO
// Varible qui va stocker le code pour convertir le prix en euro

const productSection = document.getElementById("cart__items");
const euro = Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;

// Recupération du tableau contenant les produits ajouter dans le panier

const cartData = JSON.parse(localStorage.getItem("cart"));

// Récupération du formulaire
const form = document.getElementsByClassName("cart__order");

// Récupération du titre "Votre panier"
const title = document.getElementById("yourCart");

// Récupération de la section panier

const cartSection = document.getElementsByClassName("cart");

// Affichage des produits dans le panier


// On parcours le panier afin d'afficher chaque produit

for (let product in cartData) {
  // Article (vignette) de chaque produit

  const productArticle = document.createElement("article");
  productSection.appendChild(productArticle);
  productArticle.classList.add("cart__item");

  // Div contenant l'image du produit

  const productDivImg = document.createElement("div");
  productArticle.appendChild(productDivImg);
  productDivImg.classList.add("cart__item__img");

  // Lien de la page du produit

  const productLinkImg = document.createElement("a");
  productDivImg.appendChild(productLinkImg);
  productLinkImg.href = `http://127.0.0.1:5500/front/html/product.html?id=${cartData[product].id}`;

  // Image du produit

  const productImg = document.createElement("img");
  productLinkImg.appendChild(productImg);
  productImg.src = cartData[product].image;
  productImg.alt = cartData[product].name;

  // Div parent contenant le nom, la couleur et le prix du produit

  const productCard = document.createElement("div");
  productArticle.appendChild(productCard);
  productCard.classList.add("cart__item__content");

  // Div enfant contenant le nom, la couleur et le prix du produit

  const productDivNamePrice = document.createElement("div");
  productDivNamePrice.style.alignItems = "center";
  productCard.appendChild(productDivNamePrice);
  productDivNamePrice.classList.add("cart__item__content__titlePrice");

  // Nom du produit

  const productName = document.createElement("h2");
  productDivNamePrice.appendChild(productName);
  productName.innerHTML = cartData[product].name;

  // Couleur du produitT

  const productColor = document.createElement("p");
  productDivNamePrice.appendChild(productColor);
  productColor.innerHTML = cartData[product].color;

  // Prix du produit

  const productPrice = document.createElement("p");
  productDivNamePrice.appendChild(productPrice);
  productPrice.innerHTML = euro(cartData[product].price);

  // Div parent contenant la quantité, le prix total par produit et la supression du produit

  const productDivNumber = document.createElement("div");
  productSection.appendChild(productDivNumber);
  productDivNumber.classList.add("cart__item__content__settings");

  // Div enfant contenant la quantité et le prix total par produit

  const productDivNumberChildren = document.createElement("div");
  productDivNumber.appendChild(productDivNumberChildren);
  productDivNumberChildren.classList.add(
    "cart__item__content__settings__quantity"
  );

  // Affichage de la quantité par produit

  const productNumber = document.createElement("p");
  productDivNumberChildren.appendChild(productNumber);
  productNumber.innerHTML = "Quantité : ";

  // Séléction de la quantité par produit

  const productSelectNumber = document.createElement("input");
  productDivNumberChildren.appendChild(productSelectNumber);
  productSelectNumber.classList.add("itemQuantity");
  productSelectNumber.id = "quantity";
  productSelectNumber.type = "number";
  productSelectNumber.name = "itemQuantity";
  productSelectNumber.min = "1";
  productSelectNumber.max = "100";
  productSelectNumber.value = cartData[product].quantity;

  // Quand la quantité change on apelle la fonction modifyQuantity

  productSelectNumber.addEventListener("change", () => {
    modifyQuantity();
  });

  // Fonction qui permet de modifier la quantité 

  const modifyQuantity = () => {
    if (productSelectNumber.value == 0) {
      productSelectNumber.value = 1;
    }
    cartData[product].quantity = parseInt(productSelectNumber.value);
    localStorage.setItem("cart", JSON.stringify(cartData));
    totalPerProduct.innerHTML = euro(
      cartData[product].quantity * cartData[product].price
    );
    quantityTotal = 0;
    priceTotal = 0;

    for (let m = 0; m < cartData.length; m++) {
      quantityTotal += cartData[m].quantity;
      priceTotal += cartData[m].price * cartData[m].quantity;
    }

    cartTotal.innerHTML =
      "Total: " + quantityTotal + " articles " + euro(priceTotal);
  };

  // Div qui contient l'option supprimer le produit

  const productDivDelete = document.createElement("div");
  productDivNumber.appendChild(productDivDelete);
  productDivDelete.classList.add("cart__item__content__settings__delete");

  // Supression du produit

  const productDelete = document.createElement("p");
  productDivDelete.appendChild(productDelete);
  productDelete.classList.add("deleteItem");
  productDelete.innerHTML = "Supprimer";
  productDelete.addEventListener("click", () => {
    cartData.splice(product, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    alert("Le produit a bien été supprimer du panier");
    window.location.href = "cart.html";
  });

  // Total par produit

  const quantityBlock = document.createElement("div");
  productDivNumberChildren.appendChild(quantityBlock);
  quantityBlock.appendChild(productNumber);
  quantityBlock.appendChild(productSelectNumber);
  quantityBlock.style.display = "flex";
  productDivNumberChildren.style.justifyContent = "space-between";
  const totalPerProduct = document.createElement("p");
  productDivNumberChildren.appendChild(totalPerProduct);
  totalPerProduct.innerHTML = euro(
    cartData[product].quantity * cartData[product].price
  );
  totalPerProduct.style.fontSize = "18px";
  quantityTotal += cartData[product].quantity;
  priceTotal += cartData[product].price * cartData[product].quantity;
}

// Div total

const productDivTotal = document.createElement("div");
productDivTotal.classList.add("cart__price");
productDivTotal.style.display = "flex";
productDivTotal.style.alignItems = "center";
productDivTotal.style.justifyContent = "space-between";
productDivTotal.style.flexDirection = "row-reverse";
productSection.appendChild(productDivTotal);

// Affichage du total

const cartTotal = document.createElement("p");
productDivTotal.appendChild(cartTotal);
let cartTotalSpan = document.createElement("span");
cartTotal.appendChild(cartTotalSpan);
cartTotalSpan = localStorage.getItem("quantity");
const cartTotalSpanB = document.createElement("span");
cartTotal.appendChild(cartTotalSpanB);
cartTotal.innerHTML =
  "Total: " + quantityTotal + " articles " + euro(priceTotal);

// Bouton vider le panier

const clearCart = document.createElement("button");
productDivTotal.appendChild(clearCart);
clearCart.style.border = "none";
clearCart.style.borderRadius = "15px";
clearCart.style.color = "#3498db";
clearCart.style.fontFamily = "Montserrat";
clearCart.style.fontSize = "18px";
clearCart.style.cursor = "pointer";
clearCart.style.backgroundColor = "white";
clearCart.style.height = "fit-content";
clearCart.style.padding = "10px 7px 10px 7px";
clearCart.innerHTML = "Vider le panier";

clearCart.addEventListener("click", () => {
  localStorage.clear();
  alert("Votre panier à été vidé");
  window.location.href = "cart.html";
});

// Récupération des champs de formulaires et des messages liés

const inputFirstName = document.getElementById("firstName");
const messageFirstName = document.getElementById("firstNameErrorMsg");
const inputLastName = document.getElementById("lastName");
const messageLastName = document.getElementById("lastNameErrorMsg");
const inputAddress = document.getElementById("address");
const messageAddress = document.getElementById("addressErrorMsg");
const inputCity = document.getElementById("city");
const messageCity = document.getElementById("cityErrorMsg");
const inputEmail = document.getElementById("email");
const messageEmail = document.getElementById("emailErrorMsg");

// Reg exp pour les champs prénom, nom et ville

const rejexLetter = new RegExp(
  "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$",
  "u"
);

// Validation du champ prénom

inputFirstName.addEventListener("change", () => {
  validFirstName(this);
});

const validFirstName = () => {
  const testFirstName = rejexLetter.test(inputFirstName.value);

  if (testFirstName) {
    messageFirstName.style.color = "green";
    messageFirstName.innerHTML = "Prénom valide";
  } else {
    messageFirstName.style.color = "red";
    messageFirstName.innerHTML = "Prénom invalide";
  }
};
// Validation du champ nom

inputLastName.addEventListener("change", () => {
  validLastName();
});

const validLastName = () => {
  const testLastName = rejexLetter.test(inputLastName.value);

  if (testLastName) {
    messageLastName.style.color = "green";
    messageLastName.innerHTML = "Nom valide";
  } else {
    messageLastName.style.color = "red";
    messageLastName.innerHTML = "Nom invalide";
  }
};

// Validation du champ ville

inputCity.addEventListener("change", () => {
  validCity();
});
const validCity = () => {
  const testCity = rejexLetter.test(inputCity.value);
  if (testCity) {
    messageCity.style.color = "green";
    messageCity.innerHTML = "Nom de ville valide";
  } else {
    messageCity.style.color = "red";
    messageCity.innerHTML = "Nom de ville invalide";
  }
};

// Validation du champ adresse

inputAddress.addEventListener("change", () => {
  validAdress();
});
const validAdress = () => {
  const rejexAdress = new RegExp("[w',-\\/.s]");
  const testAdress = rejexAdress.test(inputAddress.value);

  if (testAdress) {
    messageAddress.style.color = "green";
    messageAddress.innerHTML = "Adresse valide";
  } else {
    messageAddress.style.color = "red";
    messageAddress.innerHTML = "Adresse invalide";
  }
};

// Validation du champ email

inputEmail.addEventListener("change", () => {
  validEmail();
});

const validEmail = () => {
  const rejexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const testEmail = rejexEmail.test(inputEmail.value);

  if (testEmail) {
    messageEmail.style.color = "green";
    messageEmail.innerHTML = "Email valide";
  } else {
    messageEmail.style.color = "red";
    messageEmail.innerHTML = "Email invalide";
  }
};

// Fonction submit permettant la soumission du formulaire si tout les champs sont correct

const orderForm = document.getElementById("order");
orderForm.addEventListener("submit", (event) => {
  submit(event);
});

const submit = (event) => {
  event.preventDefault();

  if (
    messageFirstName.style.color == "green" &&
    messageLastName.style.color == "green" &&
    messageCity.style.color == "green" &&
    messageAddress.style.color == "green" &&
    messageEmail.style.color == "green"
  ) {
    const contact = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    };

    localStorage.setItem("contact", JSON.stringify(contact));

    let products = [];
    for (let item of cartData) {
      products.push(item.id);
    }

    const sendOrder = {
      contact,
      products,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendOrder),
    })
      .then((response) => response.json())
      .then((response) => { 
        localStorage.setItem("firstName", response.contact.firstName);
        localStorage.setItem("total", priceTotal);
        const orderId = response.orderId;
        window.location.href = "confirmation.html?orderid=" + orderId;
      })
      .catch((error) => {
        alert("Erreur: " + error);
      });
  } else {
    alert("Merci de remplir correctement tout les champs du formulaire.");
  }
};

// Si le panier est vide on cache le formulaire et la section panier puis on affiche votre panier est vide

if (cartData == null || cartData.length == 0) {
  localStorage.removeItem("cart");
  form[0].style.display = "none";
  cartSection[0].style.display = "none";
  title.innerHTML = "Votre panier est vide";
}
