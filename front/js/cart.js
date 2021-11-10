//RECUPERATION DES DONNES

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

function showProducts(products) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  
  

  // SECTION

  const productSection = document.getElementById("cart__items");
  for (const product of cart) {
    // ARTICLE

    const productArticle = document.createElement("article");
    productSection.appendChild(productArticle);
    productArticle.classList.add("cart__item");

    // DIV IMAGE

    const productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.classList.add("cart__item__img");

    // IMAGE

    const productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = product.image;
    productImg.alt = localStorage.getItem("name");

    // DIV PARENT NOM ET PRIX DU PRODUIT

    const productCard = document.createElement("div");
    productArticle.appendChild(productCard);
    productCard.classList.add("cart__item__content");

    // DIV ENFANT NOM ET PRIX DU PRODUIT

    const productDivNamePrice = document.createElement("div");
    productCard.appendChild(productDivNamePrice);
    productDivNamePrice.classList.add("cart__item__content__titlePrice");

    // TITRE DU PRODUIT

    const productTitle = document.createElement("h2");
    productDivNamePrice.appendChild(productTitle);
    productTitle.innerHTML = product.name;

    // PRIX

    const productPrice = document.createElement("p");
    productDivNamePrice.appendChild(productPrice);
    productPrice.innerHTML = product.price + " €";

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
    productSelectNumber.type = "number";
    productSelectNumber.name = "itemQuantity";
    productSelectNumber.min = "1";
    productSelectNumber.max = "100";
    productSelectNumber.value = product.quantity;

    // DIV SUPPRESSION QUANTITE

    const productDivDelete = document.createElement("div");
    productDivNumber.appendChild(productDivDelete);
    productDivDelete.classList.add("cart__item__content__settings__delete");

    // AFFICHAGE DE SUPPRESSION

    const productDelete = document.createElement("p");
    productDivDelete.appendChild(productDelete);
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = "Supprimer";

    let cartData = localStorage.getItem("cart");
    console.log(cartData)
      
    productDelete.addEventListener("click", function() {
      this.remove
      console.log("hello");
    }) 
  }

  
    
    

  // TOTAL

  const productDivTotal = document.createElement("div");
  productSection.appendChild(productDivTotal);
  productDivTotal.classList.add("cart__price");

  // AFFICHAGE TOTAL

  const testTotal = document.getElementsByClassName("itemQuantity");
  const productTotal = document.createElement("p");
  productDivTotal.appendChild(productTotal);
  let productTotalSpan = document.createElement("span");
  productTotal.appendChild(productTotalSpan);
  productTotalSpan = localStorage.getItem("quantity");
  const productTotalSpanB = document.createElement("span");
  productTotal.appendChild(productTotalSpanB);
  productTotal.innerHTML = "salut";

  // BOUTTON COMMANDER 
  const buttonDiv = document.querySelector(".cart__order__form__submit");
  const buttonLink = document.createElement("a");
  buttonDiv.appendChild(buttonLink);
  buttonLink.href = "confirmation.html";
  const button = document.getElementById("order");
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
  "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
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
    localStorage.setItem("firstName", storageFirstName.value);
  } else {
    messageFirstName.style.color = "red";
    messageFirstName.innerHTML = "Prénom invalide";
  }
};
// VALIDATION DU CHAMP NOM

storageLastName.addEventListener("change", function () {
  validLastName(this);
});
const validLastName = function (validLetter) {
  const testLastName = rejexLetter.test(storageLastName.value);
  if (testLastName) {
    messageLastName.style.color = "green";
    messageLastName.innerHTML = "Nom valide";
    localStorage.setItem("lastName", storageLastName.value);
  } else {
    messageLastName.style.color = "red";
    messageLastName.innerHTML = "Nom invalide";
  }
};

// VALIDATION DU CHAMP VILLE

storageCity.addEventListener("change", function () {
  validCity(this);
});
const validCity = function (validLetter) {
  const testCity = rejexLetter.test(storageCity.value);
  if (testCity) {
    messageCity.style.color = "green";
    messageCity.innerHTML = "Nom de ville valide";
    localStorage.setItem("city", storageCity.value);
  } else {
    messageCity.style.color = "red";
    messageCity.innerHTML = "Nom de ville invalide";
  }
};

// VALIDATION CHAMP ADRESSE

storageAddress.addEventListener("change", function () {
  validAdress(this);
});
const validAdress = function (storageAddress) {
  const rejexAdress = new RegExp("[w',-\\/.s]");
  const testAdress = rejexAdress.test(storageAddress.value);

  if (testAdress) {
    messageAddress.style.color = "green";
    messageAddress.innerHTML = "Adresse valide";
    localStorage.setItem("email", storageAddress.value);
  } else {
    messageAddress.style.color = "red";
    messageAddress.innerHTML = "Adresse invalide";
  }
};

// VALIDATION CHAMP EMAIL
storageEmail.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (storageEmail) {
  const rejexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const testEmail = rejexEmail.test(storageEmail.value);

  if (testEmail) {
    messageEmail.style.color = "green";
    messageEmail.innerHTML = "Email valide";
    localStorage.setItem("email", storageEmail.value);
  } else {
    messageEmail.style.color = "red";
    messageEmail.innerHTML = "Email invalide";
  }
};
