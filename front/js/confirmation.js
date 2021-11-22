const str = document.location.href;
const url = new URL(str);
const searchParams = new URLSearchParams(url.search);

if (searchParams.has("orderid")) {
  const id = searchParams.get("orderid");
  const firstName = document.getElementById("firstName");
  firstName.innerHTML = localStorage.getItem("firstName");
  const total = document.getElementById("total");
  total.innerHTML = Intl.NumberFormat("fr-FR", {
   style:"currency",
   currency:"EUR"
  }).format(localStorage.getItem("total"));
  const orderId = document.getElementById("orderId");
  orderId.innerHTML = id;
}
