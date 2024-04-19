addEventListener('load', function () {




    let productToDisplay = JSON.parse(localStorage.getItem('ProductToDisplay'));
        
        let productImageContainer = document.getElementById('product-image');
        let image = document.createElement('img');
        image.src = productToDisplay.image;
        productImageContainer.appendChild(image);

        
        let productDescriptionBrief = document.getElementById('product-brief-description');
        let briefDescrip = document.createElement('p')
        briefDescrip.innerHTML = productToDisplay.briefDescription;
        briefDescrip.style.fontWeight = 'bold';
        productDescriptionBrief.appendChild(briefDescrip);
        
        let productDescriptionFull = document.getElementById('product-full-description');
        let fullDescrip = document.createElement('p')
        fullDescrip.innerHTML = productToDisplay.fullDescription;
        productDescriptionFull.appendChild(fullDescrip);
        

        let stars = document.getElementById('product-stars'); 
        for (let index = 0; index < 5; index++) {
            let onestar = document.createElement('i');
            onestar.classList.add('fa-solid', 'fa-star');
            onestar.style.color = '#ffcf24';
            stars.appendChild(onestar);
        }

        let productPriceContainer = document.getElementById('product-price');
        let price = document.createElement('p')
        price.innerHTML = productToDisplay.price;
        productPriceContainer.appendChild(price);


        let pushButton = this.document.getElementById('product-to-cart');
        let decrementButton = document.getElementById('decrement');
        let incrementButton = document.getElementById('increment');
        let quantitySpan = document.getElementById('quantity');
        let cartQuantity = Number(quantitySpan.textContent)
        if(productToDisplay.amount == 0){
            cartQuantity=0;
            quantitySpan.textContent = cartQuantity;

        }

        decrementButton.addEventListener('click', function () {
            if (cartQuantity > 0) {
                cartQuantity--;
                quantitySpan.style.color = 'black';
                pushButton.innerHTML = `Add to cart`;
                quantitySpan.textContent = cartQuantity;
            }
        });
    
        incrementButton.addEventListener('click', function () {
            let max = productToDisplay.amount;
            cartQuantity++;
            if(cartQuantity >= max){
                cartQuantity = max;
            }
            quantitySpan.style.color = 'black';
            pushButton.innerHTML = `Add to cart`;
            quantitySpan.textContent = cartQuantity;
        });

        pushButton.addEventListener('click', function(){


            let currentUser =  JSON.parse(localStorage.getItem('currentUser'));

            if(!currentUser){
                window.location.href ='login.html';
            }
            else{

                for (let index = 0; index < cartQuantity; index++) {
                    currentUser.cart.push(productToDisplay);
                }

                if(productToDisplay.amount == 0){
                    pushButton.innerHTML = `Out of Stock!`;
                }
                else if(cartQuantity == 0){
                    quantitySpan.style.color = 'red';
                    setInterval(() => {
                        quantitySpan.style.color = 'black';
                    }, 2000);
                }
                else{
                pushButton.innerHTML = `Added to cart  <i class="fa-regular fa-circle-check" style="color: #1fff39;">`;
                }

                localStorage.setItem('currentUser', JSON.stringify(currentUser));

 
            }

        })
  

   


});