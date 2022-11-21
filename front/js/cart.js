


let commands= JSON.parse(localStorage.getItem('commande'));
console.log(commands);




fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(products) {
        
        commandProducts(products)
        addition()

        
      })
      .then(function(){

        modif()
        supress()

      })
     .catch(function(err) {

    alert(error)

    
    });

 

/*----------------Affichage de la commande passé a la page Product-------------*/

    function commandProducts(products){

        for(command of commands){                           /*-------Pour chaque Array dans commands--------*/
            
            for (let product in products){                 
           
                let kanapId=products[product]._id
                
                console.log(kanapId)
                
    
               if (kanapId.indexOf(command.id)!== -1){    /*----Si Id de la bibliotèque products = Id commandé alors --------*/
                
               let i= products[product].imageUrl                     /*--- Cherche imageURL du produit trouver par if--------*/
               console.log(i)
    
    
                let kanapArticle=document.createElement('article')
                document.getElementById('cart__items').append(kanapArticle)
                kanapArticle.classList='cart__item'
                kanapArticle.setAttribute('data-id', command.id)
                kanapArticle.setAttribute('data-colors', command.colors)
    
                  /*------- Indication image--------------*/
    
                    let kanapItem=document.createElement('div')
                    kanapItem.classList='cart__item__img'
                    kanapArticle.append(kanapItem)
    
                       let kanapItemImg=document.createElement('img')
                       kanapItem.append(kanapItemImg)
                       kanapItemImg.src=products[product].imageUrl
                       kanapItemImg.alt=products[product].altTxt
                
    
                       /*------------Indication Produit ------------ */
    
                    let kanapDescript=document.createElement('div')
                    kanapDescript.classList='cart__item__content'
                    kanapArticle.append(kanapDescript)
    
                       let kanapDescriptContent=document.createElement('div')
                       kanapDescriptContent.classList='cart__item__content__description'
                       kanapDescript.append(kanapDescriptContent)
    
                           let kanapContentTitle=document.createElement('h2')
                           kanapDescriptContent.append(kanapContentTitle)
                           kanapContentTitle.textContent=products[product].name
    
                           let kanapContentColor=document.createElement('p')
                           kanapDescriptContent.append(kanapContentColor)
                           kanapContentColor.textContent=command.colors
                           console.log(kanapContentColor.textContent)
    
                           let kanapContentPrice=document.createElement('p')
                           kanapDescriptContent.append(kanapContentPrice)
                           kanapContentPrice.setAttribute('value',`${products[product].price}`)
                           kanapContentPrice.textContent=`${products[product].price} €`
    
                            /*-----Indication ajout suppression et choix de quantité--------------*/
    
                       let kanapSetting=document.createElement('div')
                       kanapSetting.classList='cart__item__content__settings'
                       kanapDescript.append(kanapSetting)
    
                           let kanapSetQuantity=document.createElement('div')
                           kanapSetQuantity.classList='cart__item__content__settings_quantity'
                           kanapSetting.append(kanapSetQuantity)
    
                               let kanapQuantity=document.createElement('p')
                               kanapSetQuantity.append(kanapQuantity)
                               kanapQuantity.textContent='Qté :'
    
                               let kanapInputQuantity=document.createElement('input')
                               kanapInputQuantity.classList='itemQuantity'
                               kanapInputQuantity.setAttribute("type","number")
                               kanapInputQuantity.setAttribute('name','itemQuantity')
                               kanapInputQuantity.setAttribute('min',1)
                               kanapInputQuantity.setAttribute('max',100)
                               kanapInputQuantity.setAttribute('value',command.quantity)
                               
                               kanapSetQuantity.append(kanapInputQuantity)
    
                               /*-----Suppresion article-------*/
    
                          let kanapDelete=document.createElement('div')
                          kanapDelete.classList='cart__item__content__settings__delete'
                          kanapSetting.append(kanapDelete)
    
                               let  kanapDeleteTxt=document.createElement('p')
                               kanapDeleteTxt.classList='deleteItem'
                               kanapDeleteTxt.textContent='Supprimer'
                               kanapDelete.append(kanapDeleteTxt)
                             
                            }} }
                
                     }

                   
/*------------------ Additione les prix et quantité des plusieurs produits -------------------*/

    function addition (){

        let quantityWatch=document.querySelectorAll('.itemQuantity')
        let priceWatch=document.querySelectorAll('.cart__item__content__description')
        
        
        /*----Afficher la quantity total de canapé avant modification ---*/
        let sum= 0
        for (let i=0; i <quantityWatch.length; i++){
            sum += parseInt(quantityWatch[i].value)
        }


        let totalQuant= document.getElementById('totalQuantity')
        totalQuant.textContent=sum

        /*------Afficher le prix final avant modification-----*/

        let sumFinalPrice= 0

       for (let i=0; i < priceWatch.length; i++){

        sumFinalPrice += parseInt((priceWatch[i].lastChild).textContent)*parseInt(quantityWatch[i].value)
       }

       let totalPrice= document.getElementById('totalPrice')
       totalPrice.textContent=sumFinalPrice
       


        
    }   


    /*------------Fonction de modification quantité + impact sur prix/quantité + sauvergarde Local Storage-----------*/



    


     function  modif(){
        let modiQuant= document.querySelectorAll('.itemQuantity');

        for (let i=0; i < modiQuant.length; i++){

    
            modiQuant[i].addEventListener('change', function(){

                if(modiQuant[i].value == 0 || modiQuant[i].value > 100 ){
                    alert ('La Quantité doit être comprise entre 1 et 100')
                    location.reload()
                }else{
                addition()
                let findId=modiQuant[i].closest('article')
                let idBack=findId.dataset.id
                let colorsBack=findId.dataset.colors
                
                let replace = new kanape (idBack, colorsBack, modiQuant[i].value)

                for (i=0; i<commands.length;i++){
                    if (idBack == commands[i].id){
                        commands.splice(i,1,replace)
                        localStorage.setItem('commande',JSON.stringify(commands))
                    }else{
                        return
                    }
                }
                }
            })}}
                
               

            
     
/*----------------------------Suppresion de l'article: Sur Page+Local storage------------*/
    function supress(){

        let supressKanap= document.querySelectorAll('.deleteItem')

        for (let i=0; i < supressKanap.length; i++){

            supressKanap[i].addEventListener('click', event =>{
                let findKanape=supressKanap[i].closest('article')
                let idBack= findKanape.dataset.id
                let colorsBack= findKanape.dataset.colors
                for (i=0; i<commands.length;i++){
                    if (idBack == commands[i].id && colorsBack == commands[i].colors){
                        
                        findKanape.remove()
                        addition()
                        commands.splice(i,1)
                        localStorage.setItem('commande',JSON.stringify(commands))


                    }
                }
            })
        
      

    }}




/*------------------Validation des inputs clients -------------*/



let triLetters = /^([a-zA-Z ]+)$/
let triAdress = /([0-9a-zA-Z,\. ]*) / 
let emailSelect = /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/

let selectFirstName= document.querySelector('#firstName')
let selectLastName= document.querySelector('#lastName')
let selectAddress= document.querySelector('#address')
let selectCity= document.querySelector('#city')
let selectEmail= document.querySelector('#email')

let getFirstNameError=document.getElementById('firstNameErrorMsg')
let getLastNameError=document.getElementById('lastNameErrorMsg')
let getAddressError=document.getElementById('addressErrorMsg')
let getCityError=document.getElementById('cityErrorMsg')
let getEmailError=document.getElementById('emailErrorMsg')


let valeurFirstName=selectFirstName.value
let valeurLastName=selectLastName.value
let valeurAddress=selectAddress.value
let valeurCity=selectCity.value
let valeurEmail=selectEmail.value



selectFirstName.addEventListener('input',function (){
    let valeurFirstName=selectFirstName.value
    if (! valeurFirstName.match(triLetters)){
        
        getFirstNameError.textContent='Votre Prénom ne doit contenir uniquement que des lettres'
    }else if( (getFirstNameError.textContent) === "" ){

        return
    
    }else{
        
        getFirstNameError.textContent=''

    }
    
})

selectLastName.addEventListener('input',function (){
    let valeurLastName=selectLastName.value
    if (! valeurLastName.match(triLetters)){
        
        getLastNameError.textContent='Votre Nom ne doit contenir uniquement que des lettres'
    }else if( (getLastNameError.textContent) === "" ){

        return
    
    }else{
        
        getLastNameError.textContent=''
        
    }
    
})

selectAddress.addEventListener('input',function (){
   
    let valeurAddress=selectAddress.value
    if (! valeurAddress.match(triAdress)){
        
        getAddressError.textContent='Votre Adresse doit comporter un chiffre suivie de caractères. Exemple : 24 rue Tiers'
    }else if( (getAddressError.textContent) === "" ){

        return
    
    }else{
        
        getAddressError.textContent=''

    }
    
})


selectCity.addEventListener('input',function (){
    let valeurCity=selectCity.value
    if (! valeurCity.match(triLetters)){
        
        getCityError.textContent='Votre Ville ne doit contenir uniquement que des lettres'
    }else if( (getCityError.textContent) === "" ){

        return
    
    }else{
        
        getCityError.textContent=''

    }
    
})

selectEmail.addEventListener('input',function (){
    let valeurEmail=selectEmail.value
    if (! valeurEmail.match(emailSelect)){
       
        getEmailError.textContent='Votre Email doit être valide pour valider le formulaire'
    }else if( (getEmailError.textContent) === "" ){

        return
    
    }else{
        
        getEmailError.textContent=''

    }
    
})





/*------------------- Au click du formulaire----------------------- */


let form=document.querySelector('.cart__order__form')

form.addEventListener('submit',function(e){

    e.preventDefault()

    if (getFirstNameError.textContent != "" || getLastNameError.textContent != "" || getAddressError.textContent != "" || getCityError.textContent != "" || getEmailError.textContent != "" ){
        alert ('Corrigez vos informations')

    }else if (totalPrice.textContent == 0 || totalPrice.textContent == NaN){

        alert ('Commandez un produit ou ajoutez une quantité')


    }else{

    let product= []
    

    kanapeClients()

     
/*--------------------------------- Récupération des produits clients --------------------------*/
    function kanapeClients(){
        let modiQuant= document.querySelectorAll('.itemQuantity');
            for (let i=0; i < modiQuant.length; i++){
                if(modiQuant[i].value > 100){
                    alert('Choissisez une quantité comprise entre 1 et 100')
                    location.reload()

                }else {
                    
                let findId=modiQuant[i].closest('article')
                let idBack=findId.dataset.id
                

                product.push(idBack)
                }
    
                
      
    
            }}

/*------------------------------------ Récuperation des Elements à Stringify pour requete POST ----------------*/
     let order = {

                "contact" : {
                    "firstName" : selectFirstName.value,
                    "lastName" : selectLastName.value,
                    "address" : selectAddress.value,
                    "city" : selectCity.value,
                    "email" : selectEmail.value,
                },
        
                "products" : product,
        

            }




/*------------------Requete Post Commande clients------------------*/

    const request = {
        method: 'POST',
        headers: {"Content-Type" : 'application/json'},
        body: JSON.stringify(order)
        
    }

    


    fetch('http://localhost:3000/api/products/order', request)

    .then((res) => res.json())
    
    .then((quest) => {

       
        localStorage.clear();
        localStorage.setItem('order',quest.orderId)
        window.location.href=`/front/html/confirmation.html?orderid=${quest.orderId}`
        
      })
      .catch(function() {

      
    alert('erreur')
      
    
})

}

})
    




