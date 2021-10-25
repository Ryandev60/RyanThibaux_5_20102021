// DATA RECOVERY
var str = document.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);

if (search_params.has("id")) {
  var id = search_params.get("id");
  console.log(id);
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));
console.log(fetch);

// DISPLAY OF PRODUCTS
function showProducts(products) {
  // TITLE
  let productTitle = document.getElementById("title");
  productTitle.innerHTML = products.name;

  // IMAGE
  let productImgDiv = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImgDiv.appendChild(productImg);
  productImg.src = products.imageUrl;
  productImg.alt = products.name;

  // PRICE
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = products.price;

  // DESCRIPTION
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = products.description;

  // COLORS
  for (const color of products.colors) {
    let productColors = document.getElementById("colors");
    let productColorsOptions = document.createElement("option");
    productColorsOptions.innerHTML = color;
    productColors.appendChild(productColorsOptions);
  }

  // CART

  let cart = document.getElementById("addToCart");
  cart.addEventListener("click", function () {
    if (colors.value == "" || quantity.value == 0) {
      alert(
        "S'il vous plaît, choissisez une couleur et le nombre d'article(s)"
      );
    } else {
      localStorage.setItem("name", products.name);
      localStorage.setItem("price", products.price);
      localStorage.setItem("colors", colors.value);
      localStorage.setItem("quantity", quantity.value);
      localStorage.setItem("img", products.imageUrl);
    }
  });
}

// TEST

// let productCart = [
//   {
//     id: id,
//     name: products.name,
//     price: products.price,
//     colors: colors.value,
//     quantity: quantity.value,
//   },
// ];

// var stockageData = localStorage.setItem(
//   "product",
//   JSON.stringify(productCart)
// );
