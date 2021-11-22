let quantityTotal = 0;
let priceTotal = 0;
const productSection = document.getElementById("cart__items");
// RECUPERATION DES PRODUITS DANS LE PANIER

const cartData = JSON.parse(localStorage.getItem("cart"));

//AFFICHAGE DES PRODUITS DANS LE PANIER

function showProducts() {
  // SECTION

  for (let i = 0; i < cartData.length; i++) {
    // ARTICLE
    const productArticle = document.createElement("article");
    productSection.appendChild(productArticle);
    productArticle.classList.add("cart__item");
    

    // DIV IMAGE

    const productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.classList.add("cart__item__img");

    // LIEN DU PRODUIT

    const productLinkImg = document.createElement("a");
    productDivImg.appendChild(productLinkImg);
    productLinkImg.href = `http://127.0.0.1:5500/front/html/product.html?id=${cartData[i].id}`;

    // IMAGE

    const productImg = document.createElement("img");
    productLinkImg.appendChild(productImg);
    productImg.src = cartData[i].image;
    productImg.alt = cartData[i].name;

    // DIV PARENT NOM ET PRIX DU PRODUIT

    const productCard = document.createElement("div");
    productArticle.appendChild(productCard);
    productCard.classList.add("cart__item__content");

    // DIV ENFANT NOM ET PRIX DU PRODUIT

    const productDivNamePrice = document.createElement("div");
    productDivNamePrice.style.alignItems = "center";
    productCard.appendChild(productDivNamePrice);
    productDivNamePrice.classList.add("cart__item__content__titlePrice");

    // TITRE DU PRODUIT

    const productTitle = document.createElement("h2");
    productDivNamePrice.appendChild(productTitle);
    productTitle.innerHTML = cartData[i].name;

    // COULEUR DU PRODUIT

    const productColor = document.createElement("p");
    productDivNamePrice.appendChild(productColor);
    productColor.innerHTML = cartData[i].color;

    // PRIX

    const productPrice = document.createElement("p");
    productDivNamePrice.appendChild(productPrice);
    productPrice.innerHTML = cartData[i].price + " €";

    // DIV PARENT QUANTITE

    const productDivNumber = document.createElement("div");
    productSection.appendChild(productDivNumber);
    productDivNumber.classList.add("cart__item__content__settings");

    // DIV ENFANT QUANTITE

    const productDivNumberChildren = document.createElement("div");
    productDivNumber.appendChild(productDivNumberChildren);
    productDivNumberChildren.classList.add(
      "cart__item__content__settings__quantity"
    );

    // AFFICHAGE QUANTITE

    const productNumber = document.createElement("p");
    productDivNumberChildren.appendChild(productNumber);
    productNumber.innerHTML = "Quantité : ";

    // SELECTION QUANTITE

    const productSelectNumber = document.createElement("input");
    productDivNumberChildren.appendChild(productSelectNumber);
    productSelectNumber.classList.add("itemQuantity");
    productSelectNumber.id = "quantity";
    productSelectNumber.type = "number";
    productSelectNumber.name = "itemQuantity";
    productSelectNumber.min = "1";
    productSelectNumber.max = "100";
    productSelectNumber.value = cartData[i].quantity;

    // ECOUTEUR D'EVENEMENT MODIFICATION QUANTITE

    productSelectNumber.addEventListener("change", function () {
      modifierQuantity();
    });

    // MODIFICATION QUANTITE

    const modifierQuantity = function () {
      if (productSelectNumber.value == 0) {
        productSelectNumber.value = 1;
      }
      cartData[i].quantity = parseInt(productSelectNumber.value);
      localStorage.setItem("cart", JSON.stringify(cartData));
      totalPerProduct.innerHTML =
        cartData[i].quantity * cartData[i].price + " €";
      quantityTotal = 0;
      priceTotal = 0;

      for (let m = 0; m < cartData.length; m++) {
        quantityTotal += cartData[m].quantity;
        priceTotal += cartData[m].price * cartData[m].quantity;
      }

      cartTotal.innerHTML =
        "Total: " + quantityTotal + " articles " + priceTotal + " €";
    };

    // DIV SUPPRESSION QUANTITE

    const productDivDelete = document.createElement("div");
    productDivNumber.appendChild(productDivDelete);
    productDivDelete.classList.add("cart__item__content__settings__delete");

    // SUPRESSION PRODUIT

    const productDelete = document.createElement("p");
    productDivDelete.appendChild(productDelete);
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = "Supprimer";
    productDelete.addEventListener("click", function () {
      cartData.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartData));
      alert("Le produit a bien été supprimer du panier");
      window.location.href = "cart.html";
    });

    // TOTAL PAR PRODUIT

    const quantityBlock = document.createElement("div");
    productDivNumberChildren.appendChild(quantityBlock);
    quantityBlock.appendChild(productNumber);
    quantityBlock.appendChild(productSelectNumber);
    quantityBlock.style.display = "flex";
    productDivNumberChildren.style.justifyContent = "space-between";
    const totalPerProduct = document.createElement("p");
    productDivNumberChildren.appendChild(totalPerProduct);
    totalPerProduct.innerHTML = cartData[i].quantity * cartData[i].price + " €";
    totalPerProduct.style.fontSize = "18px";

    // TOTAL QUANTITE ET PRIX

    quantityTotal += cartData[i].quantity;
    priceTotal += cartData[i].price * cartData[i].quantity;
  }

  // TOTAL

  const productDivTotal = document.createElement("div");
  productSection.appendChild(productDivTotal);
  productDivTotal.classList.add("cart__price");

  // AFFICHAGE TOTAL

  const cartTotal = document.createElement("p");
  productDivTotal.appendChild(cartTotal);
  let cartTotalSpan = document.createElement("span");
  cartTotal.appendChild(cartTotalSpan);
  cartTotalSpan = localStorage.getItem("quantity");
  const cartTotalSpanB = document.createElement("span");
  cartTotal.appendChild(cartTotalSpanB);
  cartTotal.innerHTML =
    "Total: " + quantityTotal + " articles " + priceTotal + " €";

  // BOUTTON COMMANDER AVEC FONCTION DE SOUMISSION DU FORMULAIRE

  const buttonDiv = document.querySelector(".cart__order__form__submit");
  const button = document.getElementById("order");
  button.addEventListener("click", function () {
    submit();
  });
}


// FORMULAIRE EN DISPLAY NONE ET PARAGRAPHE VOTRE PANIER EST VIDE

const form = document.getElementsByClassName("cart__order");
const title = document.getElementById("yourCart");

if (cartData == null || cartData.length == 0) {
  form[0].style.display = "none";
  localStorage.removeItem("cart");
  title.innerHTML = "Votre panier est vide";
} else {
  showProducts();
}
// RECUPERATION DES CHAMPS DE FORMULAIRES ET DES MESSAGES D'ERREUR

const storageFirstName = document.getElementById("firstName");
const messageFirstName = document.getElementById("firstNameErrorMsg");
const storageLastName = document.getElementById("lastName");
const messageLastName = document.getElementById("lastNameErrorMsg");
const storageAddress = document.getElementById("address");
const messageAddress = document.getElementById("addressErrorMsg");
const storageCity = document.getElementById("city");
const messageCity = document.getElementById("cityErrorMsg");
const storageEmail = document.getElementById("email");
const messageEmail = document.getElementById("emailErrorMsg");

// REG EXP LETTER

const rejexLetter = new RegExp(
  "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$",
  "u"
);

// VALIDATION DU CHAMP PRENOM

storageFirstName.addEventListener("change", function () {
  validFirstName(this);
});
const validFirstName = function () {
  const testFirstName = rejexLetter.test(storageFirstName.value);

  if (testFirstName) {
    messageFirstName.style.color = "green";
    messageFirstName.innerHTML = "Prénom valide";
  } else {
    messageFirstName.style.color = "red";
    messageFirstName.innerHTML = "Prénom invalide";
  }
};
// VALIDATION DU CHAMP NOM

storageLastName.addEventListener("change", function () {
  validLastName();
});

const validLastName = function () {
  const testLastName = rejexLetter.test(storageLastName.value);

  if (testLastName) {
    messageLastName.style.color = "green";
    messageLastName.innerHTML = "Nom valide";
  } else {
    messageLastName.style.color = "red";
    messageLastName.innerHTML = "Nom invalide";
  }
};

// VALIDATION DU CHAMP VILLE

storageCity.addEventListener("change", function () {
  validCity();
});
const validCity = function () {
  const testCity = rejexLetter.test(storageCity.value);
  if (testCity) {
    messageCity.style.color = "green";
    messageCity.innerHTML = "Nom de ville valide";
  } else {
    messageCity.style.color = "red";
    messageCity.innerHTML = "Nom de ville invalide";
  }
};

// VALIDATION CHAMP ADRESSE

storageAddress.addEventListener("change", function () {
  validAdress();
});
const validAdress = function () {
  const rejexAdress = new RegExp("[w',-\\/.s]");
  const testAdress = rejexAdress.test(storageAddress.value);

  if (testAdress) {
    messageAddress.style.color = "green";
    messageAddress.innerHTML = "Adresse valide";
  } else {
    messageAddress.style.color = "red";
    messageAddress.innerHTML = "Adresse invalide";
  }
};

// VALIDATION CHAMP EMAIL
storageEmail.addEventListener("change", function () {
  validEmail();
});

const validEmail = function () {
  const rejexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const testEmail = rejexEmail.test(storageEmail.value);

  if (testEmail) {
    messageEmail.style.color = "green";
    messageEmail.innerHTML = "Email valide";
  } else {
    messageEmail.style.color = "red";
    messageEmail.innerHTML = "Email invalide";
  }
};

// SOUMISSION DU FORMULAIRE SI TOUT LES CHAMPS SONT CORRECT

const submit = function () {
  event.preventDefault();

  if (
    messageFirstName.style.color == "green" &&
    messageLastName.style.color == "green" &&
    messageCity.style.color == "green" &&
    messageAddress.style.color == "green" &&
    messageEmail.style.color == "green"
  ) {
    const contact = {
      firstName: storageFirstName.value,
      lastName: storageLastName.value,
      address: storageAddress.value,
      city: storageCity.value,
      email: storageEmail.value,
    };
    let contactStorage = localStorage.setItem(
      "contact",
      JSON.stringify(contact)
    );
  } else {
    alert("Merci de remplir correctement tout les champs du formulaire.");
  }
};




      
