/*------Récupération des données product et exécution de la fonction affichage ----*/


fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(products) {
        displayKanap(products)
      })
     .catch(function(err) {

    alert(err)
    
    });
 
        function displayKanap(products){
            
            for (let product in products){


                /*----------Injection balise <a> dans items -------*/
                let productLink = document.createElement("a");

                document.querySelector("#items").append(productLink);  /*---inject productlink dans id items --*/
               
                let KanapId=products[product]._id
                let urlProduct = new URL (`product.html?id=${KanapId}`,'http://127.0.0.1:3000/front/html/'); /*--$() permet d'injecter une fonction----*/
                productLink.href = urlProduct

                /*---inject le numéro id du produit dans biblio products ----  OU  ---- productLink.href = `product.html?id=${products[product]._id}`;*/
                


                /*-----Injection Balise article------*/
                let productArticle = document.createElement("article");

                productLink.append(productArticle);  /*inject productarticle dans product link*/
            
            
            
                /*------Injection <img> et alt -----*/
                let productImg = document.createElement("img");

                productArticle.append(productImg); /*inject productImg dans product Article*/
                productImg.src = products[product].imageUrl; /*--chercher dans tout les products -le bon produit */
                productImg.alt = products[product].altTxt;  /*----Chercher Alt --*/
            

                /*----Injection  <h3> -------*/
                let productTitle = document.createElement("h3");

                productArticle.append(productTitle);
                productTitle.classList = "productName";  /*-----Création de la class productName---*/
                productTitle.textContent = products[product].name; /*---injection texte par textContent----*/
            
            
                /*---------Injection <p> descripton ------*/
                let productDescription = document.createElement("p");

                productArticle.append(productDescription);
                productDescription.classList = "productDescription";
                productDescription.textContent = products[product].description;
    }

}