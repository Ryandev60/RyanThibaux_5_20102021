fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

function showProducts(products) {
  // SECTION
  let productSection = document.getElementById("cart__items");
  // ARTICLE
  let productArticle = document.createElement("article");
  productSection.appendChild(productArticle);
  productArticle.classList.add("cart__item");

  // DIV IMG
  let productDivImg = document.createElement("div");
  productArticle.appendChild(productDivImg);
  productDivImg.classList.add("cart__item__img");

  // IMG
  let productImg = document.createElement("img");
  productDivImg.appendChild(productImg);
  productImg.src = localStorage.getItem("img");
  productImg.alt = localStorage.getItem("name");

  // DIV PARENT NAME PRICE
  let productCard = document.createElement("div");
  productArticle.appendChild(productCard);
  productCard.classList.add("cart__item__content");

  // DIV ENFANT NAME PRICE

  let productDivNamePrice = document.createElement("div");
  productCard.appendChild(productDivNamePrice);
  productDivNamePrice.classList.add("cart__item__content__titlePrice");

  // TITLE OF PRODUCT
  let productTitle = document.createElement("h2");
  productDivNamePrice.appendChild(productTitle);
  productTitle.innerHTML = localStorage.getItem("name");

  // PRICE

  let productPrice = document.createElement("p");
  productDivNamePrice.appendChild(productPrice);
  productPrice.innerHTML = localStorage.getItem("price") + " €";

  // DIV PARENT QUANTITE
  let productDivNumber = document.createElement("div");
  productSection.appendChild(productDivNumber);
  productDivNumber.classList.add("cart__item__content__settings");

  // DIV ENFANT QUANTITE

  let productDivNumberChildren = document.createElement("div");
  productDivNumber.appendChild(productDivNumberChildren);
  productDivNumberChildren.classList.add(
    "cart__item__content__settings__quantity"
  );

  // AFFICHAGE QUANTITE

  let productNumber = document.createElement("p");
  productDivNumberChildren.appendChild(productNumber);
  productNumber.innerHTML = "Quantité : ";

  // SELECTION QUANTITE

  let productSelectNumber = document.createElement("input");
  productDivNumberChildren.appendChild(productSelectNumber);
  productSelectNumber.classList.add("itemQuantity");
  productSelectNumber.type = "number";
  productSelectNumber.name = "itemQuantity";
  productSelectNumber.min = "1";
  productSelectNumber.max = "100";
  productSelectNumber.value = localStorage.getItem("quantity");

  // DIV SUPPRESSION QUANTITE

  let productDivDelete = document.createElement("div");
  productDivNumber.appendChild(productDivDelete);
  productDivDelete.classList.add("cart__item__content__settings__delete");

  // AFFICHAGE DE SUPPRESSION

  let productDelete = document.createElement("p");
  productDivDelete.appendChild(productDelete);
  productDelete.classList.add("deleteItem");

  // TOTAL

  let productDivTotal = document.createElement("div");
  productSection.appendChild(productDivTotal);
  productDivTotal.classList.add("cart__price");

  // AFFICHAGE TOTAL

  let productTotal = document.createElement("p");
  productDivTotal.appendChild(productTotal);

  // RECUPERATION FORMULAIRE
  let storageFirstName = document.getElementById("firstName");
  let storageLastName = document.getElementById("lastName");
  let storageAddress = document.getElementById("address");
  let storageCity = document.getElementById("city");
  let storageEmail = document.getElementById("email");

  let order = document.getElementById("order");
  order.addEventListener("click", function () {
    if (storageFirstName.value != "") {
      localStorage.setItem("firstName", storageFirstName.value);
    } else {
      alert("Veuillez renseignez votre prénom");
    }

    if (storageLastName.value != "") {
      localStorage.setItem("lastName", storageLastName.value);
    } else {
      alert("Veuillez renseignez votre nom");
    }

    if (storageAddress.value != "") {
      localStorage.setItem("address", storageAddress.value);
    } else {
      alert("Veuillez renseignez votre adresse");
    }

    if (storageCity.value != "") {
     localStorage.setItem("city", storageCity.value);
    }

    else {
     alert("Veuillez renseigner votre ville")
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(storageEmail.value)) {
      localStorage.setItem("email", storageEmail.value);
    } else {
      alert("Email invalide");
    }
  });
}
