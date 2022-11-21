const url = window.location.href              /*--Récupération de l'url--*/
let def = new URL(url);                       /*-- Ajout de l'url--*/
let orderId= def.searchParams.get('orderid');  

let order = document.getElementById('orderId')

order.textContent=orderId