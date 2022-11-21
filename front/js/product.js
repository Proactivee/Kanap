
const url = window.location.href              /*--Récupération de l'url--*/
let def = new URL(url);                       /*-- Ajout de l'url--*/
let identit= def.searchParams.get('id');      /*-- Recherche de id dans l'url--*/

fetch(`http://localhost:3000/api/products/${identit}`)
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(product) {
        displayOne(product)
      })
     .catch(function(err) {
        
    
    });


    function displayOne(product) {

        /*-----Inject imag + alt --*/

        let productImgKanap = document.createElement("img");

        document.querySelector('section div.item__img').append(productImgKanap);

        productImgKanap.src= product.imageUrl;
        productImgKanap.alt= product.altTxt;

        /*-----Inject Name Kanap --*/

        let productTxtKanap = document.createElement('p');

        document.getElementById('title').append(productTxtKanap)
        productTxtKanap.textContent=product.name;

        /*-----Inject price Kanap --*/

        let productPriceKanap = product.price
        document.getElementById('price').append(productPriceKanap)


        /*-----Inject description Kanap --*/

        let productDescriptionKanap =  document.createElement('p');

        document.getElementById('description').append(productDescriptionKanap)
        productDescriptionKanap.textContent=product.description;

        /*------Inject Color -------*/


        const opti = document.getElementById('colors')
        
        for (i=0 ; i<product.colors.length; i++){

          let productColorKanap0= document.createElement('option');
          productColorKanap0.value=product.colors[i];
          productColorKanap0.text=productColorKanap0.value;
  
          opti.add(productColorKanap0,null);

        }

    }

     /*--------Création Objet kanape --------*/

     function Kanape(id, colors, quantity){
      this.id =id;
      this.colors =colors;
      this.quantity =quantity;

     }


   /*----------------------------------------Information Button Direction cart -------------------------------------*/

    const command=[];  /*----Stock in array command------*/
    let recup = JSON.parse(localStorage.getItem('commande')) /*--- cart Back--*/
    let show = 0


     /*--------Get Quantity---------*/

     let quant= document.querySelector('#quantity')
     quant.addEventListener('change',function(){
      console.log(quant.value)
    })

     /*-------Get Color ---------*/
     let select= document.querySelector('#colors')
     select.addEventListener('change',function(){
       console.log(select.value)
       
     })

     /*-----------  Onclick button cart --------*/
     
     document.getElementById('addToCart').onclick =function(){

      let firstCommand= new Kanape (`${identit}`,select.value,quant.value)
 
      getPreviousCommand(firstCommand)
 
    }


    /*--------- Récupération de la commande précédente -------------*/

    function getPreviousCommand(firstCommand){
      
      if (recup === null){
        
        chooseDefault(firstCommand)

      }else{

        checkDobble(firstCommand)
        chooseDefault(firstCommand)
        }
      }

/*-------------------- Vérification si même ID et Couleur que article dans panier ----------*/

      function checkDobble(firstCommand){
        for (let i=0; i < recup.length; i++){
          if (firstCommand.id == recup[i].id && firstCommand.colors == recup[i].colors){
            let addition = parseInt(quant.value) + parseInt(recup[i].quantity)
            console.log(addition)
            let replace= new Kanape(`${identit}`,select.value,addition)
            recup.splice(i,1,replace)
            localStorage.setItem('commande',JSON.stringify(recup))
            show++
            
          }
          
          }}

/*---------------- Vérification si des défaults sont observés avant push de la commande + redirection cart ----------*/


     function chooseDefault (firstCommand){
      if(quant.value < 1 || select.value == "" || quant.value > 100){

        alert('Vous devez choisir une couleur et une quantité comprise entre 1 et 100')
        
      }else if(recup === null){

        command.push(firstCommand)
        localStorage.setItem('commande',JSON.stringify(command))
        window.location.href=('http://127.0.0.1:3000/front/html/cart.html')

      }else if(show == 0){

        recup.push(firstCommand)
        localStorage.setItem('commande',JSON.stringify(recup))
        window.location.href=('http://127.0.0.1:3000/front/html/cart.html')
    
      
      }else{
        window.location.href=('http://127.0.0.1:3000/front/html/cart.html')
      }
     }
     

     

     
    



  


