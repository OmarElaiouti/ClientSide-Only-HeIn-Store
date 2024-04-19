addEventListener('load', function () {

        
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    
    if (!currentUser) {

        this.window.location.href = 'login.html'   
    }
    else{

        function renderCartProducts() {
            let tableBody = document.getElementsByTagName('tbody')[0];
            let firstRow = document.querySelector('tr');
            tableBody.innerHTML = '';
            tableBody.appendChild(firstRow);
        
            if (currentUser.cart.length === 0) {
                tableBody.innerHTML = '';
                let EmptyRow = tableBody.insertRow(-1);
                let EmptyCell = EmptyRow.insertCell(0);
                EmptyCell.colSpan = 5;
                EmptyCell.style.textAlign = 'center';
                EmptyCell.textContent = 'No Products in cart';
                return;
            }
        
            let groupedCart = {};
            currentUser.cart.forEach(product => {
                if (!groupedCart[product.id]) {
                    groupedCart[product.id] = {
                        product: product,
                        quantity: 0
                    };
                }
                groupedCart[product.id].quantity++;
            });
        
            let sum = 0;
            Object.values(groupedCart).forEach(cartItem => {
                let row = tableBody.insertRow(-1);
                let cellCheckbox = row.insertCell(0);
                let cellImage = row.insertCell(1);
                let cellBriefDescription = row.insertCell(2);
                let cellPrice = row.insertCell(3);
                let cellQuantity = row.insertCell(4);
        
                cellImage.innerHTML = `<a href='productInfo.html' class='linkToProduct'><img src='${cartItem.product.image}' class='lolo'></a>`;
                cellBriefDescription.textContent = cartItem.product.briefDescription;
                cellPrice.textContent = cartItem.product.price;

                let quantitySpan = document.createElement('span');
                quantitySpan.id = 'quantity';
                quantitySpan.textContent = cartItem.quantity;
                let productQuantity = Number(quantitySpan.textContent)
                

                let increaseButton = document.createElement('button');
                increaseButton.id = 'increaseButton';
                increaseButton.textContent = '+';

                increaseButton.addEventListener('click', function() {

                    let productArr = JSON.parse(localStorage.getItem('products')) || [];

                    let productToFetch = productArr.find(product => product.id == cartItem.product.id);
                    let max = productToFetch.amount;

                    let newProduct = currentUser.cart.find(product => product.id == cartItem.product.id)
                   
                        let newToPuch = newProduct
                        if (productQuantity < max){
                        currentUser.cart.push(newToPuch)
                        productQuantity++;
                        quantitySpan.textContent = productQuantity;   
                        renderCartProducts();


                        }
                        else{
                            productQuantity = max;
                            quantitySpan.textContent = productQuantity;   
                        }
                        localStorage.setItem('currentUser', JSON.stringify(currentUser)); 

                       
                    
                });


                let decreaseButton = document.createElement('button');
                decreaseButton.id = 'decreaseButton';
                decreaseButton.textContent = '-';
                decreaseButton.addEventListener('click', function() {
                    if (productQuantity > 0) {
                        

                        let removedProduct = currentUser.cart.find(product => product.id === cartItem.product.id)
                        if(removedProduct){
                            currentUser.cart.splice(currentUser.cart.indexOf(removedProduct), 1);
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));  
                            productQuantity--;
                            quantitySpan.textContent = productQuantity;  
                            renderCartProducts();

                        }                    

                    }
                });

                cellQuantity.appendChild(decreaseButton);
                cellQuantity.appendChild(quantitySpan);
                cellQuantity.appendChild(increaseButton);


                sum += Number(cartItem.product.price.slice(1))*cartItem.quantity;
        
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = cartItem.product.id;
                cellCheckbox.appendChild(checkbox);
            });
        
            let SumPriceRow = tableBody.insertRow(-1);
            let SumPriceRowLabel = SumPriceRow.insertCell(0);
            let SumPriceRowValue = SumPriceRow.insertCell(1);
            SumPriceRowLabel.colSpan = 3;
            SumPriceRowLabel.style.textAlign = 'center';
            SumPriceRowLabel.textContent = 'Total';
            SumPriceRowValue.textContent = '$' + sum.toFixed(2);
            SumPriceRowValue.colSpan = 2;
        }
        
    
        renderCartProducts();
    
    
        let DeleteButton = document.getElementById("delete-item-button");
        DeleteButton.addEventListener('click',function(){
    
            let checkboxes = document.querySelectorAll('#cart-table tbody input[type="checkbox"]:checked');
    
            let cartbox = currentUser.cart;

            if(cartbox.length == 0){
                return;
            }
    
            checkboxes.forEach(checkbox => {

            let itemIdToDelete = checkbox.value;

            for (let i = 0; i < cartbox.length; i++) {
                if (cartbox[i].id == itemIdToDelete) {
                    cartbox.splice(i, 1);
                    break;
                }
            }
            });
    
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
            renderCartProducts();
        });

        let DeleteAllButton = document.getElementById("empty-cart-button");
        DeleteAllButton.addEventListener('click',function(){
    
            if(currentUser.cart.length == 0){alert('The cart is Already empty');return;}

            if(confirm('Are you sure you want to empty the cart ?')){
            currentUser.cart = [];

            localStorage.setItem('currentUser', JSON.stringify(currentUser));        
            renderCartProducts();
        
            
        }
        });


        let linksToProduct = document.querySelectorAll('.linkToProduct');

        linksToProduct.forEach(link => {

            link.addEventListener('click', function () {

                console.log(link.firstChild.src);
                let productArr = JSON.parse(localStorage.getItem('products'));

                if (!productArr || productArr.length === 0) {
                    return;
                }
                const fullUrl = link.firstChild.src;
                const url = new URL(fullUrl);
                const path = url.pathname; 
                const cleanPath = path.substring(1); 

                let productToDisplay = productArr.find(product => product.image === cleanPath);

                console.log(productToDisplay);
                if (productToDisplay) {
                    localStorage.setItem("ProductToDisplay", JSON.stringify(productToDisplay));
                }
            });

        })

            let fullBody = document.getElementsByClassName("body-wrapper")[0];
            let cartTable = document.getElementById("cart-table");
            fullBody.style.paddingBottom = cartTable.offsetHeight - 300 + 'px';
        
    
            let button1 = document.getElementById('delete-item-button');
            let button2 = document.getElementById('empty-cart-button');

            button1.addEventListener('click',function(){
            let fullBody = document.getElementsByClassName("body-wrapper")[0];
            let cartTable = document.getElementById("cart-table");
            fullBody.style.paddingBottom = cartTable.offsetHeight + 'px';
    
            })

            button2.addEventListener('click',function(){
            let fullBody = document.getElementsByClassName("body-wrapper")[0];
            let cartTable = document.getElementById("cart-table");
            fullBody.style.paddingBottom = cartTable.offsetHeight + 'px';
    
            })
          

            document.getElementById('cardNumber').addEventListener('input', function() {
                let inputValue = document.getElementById('cardNumber').value;
              
                inputValue = inputValue.replace(/\D/g, '');
              
                inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');

                if (inputValue.length > 18) {
                    inputValue = inputValue.slice(0, 19);
                  }
              
                document.getElementById('cardNumber').value = inputValue;
            });


            document.getElementById('expiryDate').addEventListener('input', function(event) {
                let inputValue = document.getElementById('expiryDate').value;

                inputValue = inputValue.replace(/\D/g, '');
                
                if (inputValue.length > 1) {
                    inputValue = inputValue.slice(0, 2) + ' / ' + inputValue.slice(2, 4);
                }

                document.getElementById('expiryDate').value = inputValue;
            });

            document.getElementById('cvv').addEventListener('input', function(event) {
                let inputValue = document.getElementById('cvv').value;

                inputValue = inputValue.replace(/\D/g, '');
                
                if (inputValue.length > 3) {
                    inputValue = inputValue.slice(0, 3)
                }

                document.getElementById('cvv').value = inputValue;
            });

            document.getElementById('nameOnCard').addEventListener('input', function(event) {
                let name = document.getElementById('nameOnCard').value;

                name = name.replace(/[^a-zA-Z]/g, '');

                document.getElementById('nameOnCard').value = name;              
            });

            let warningDiv = document.getElementById("payment-warning");
            let warning = document.createElement('p');
            warning.style.fontStyle = 'italic';
            warning.style.color = 'red';
            warningDiv.appendChild(warning);

            document.getElementById('paymentForm').addEventListener('submit', function(e){

                e.preventDefault();

                if(currentUser.cart.length == 0){
                    alert("You Don't have any items in the cart!")
                    return;
                }

                let cardNumberField = document.getElementById('cardNumber');
                let cardNumber = cardNumberField.value;

                let correctCardNumber = /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber);

                if (!correctCardNumber) {
                    cardNumberField.style.borderColor = 'red';
                    warning.innerHTML = "Insert a correct data!*";
                    return;
                }

                let expiryDateField = document.getElementById('expiryDate');
                let expiryDate = expiryDateField.value;

                let correctExpiryDate = /^(0[1-9]|[12][0-9]|3[01]) \/ (0[1-9]|1[0-2])$/.test(expiryDate);

                if (!correctExpiryDate) {
                    expiryDateField.style.borderColor = 'red';
                    warning.innerHTML = "Insert a correct date!";
                    return;
                }
               
                let cvvField = document.getElementById('cvv');
                let cvv = cvvField.value;

                let correctCvv = /^\d{3}$/.test(cvv);

                if (!correctCvv) {
                    cvvField.style.borderColor = 'red';
                    warning.innerHTML = "Insert a correct data!*";
                    return;
                }
                
                
                let nameOnCardField = document.getElementById('nameOnCard');
                let nameOnCard = nameOnCardField.value;

                let correctName = /^[a-zA-Z\s]+$/.test(nameOnCard);

                if (!correctName) {
                    nameOnCardField.style.borderColor = 'red';
                    warning.innerHTML = "Insert a correct data!*";
                    return;
                }

                if (cardNumber.trim() == '' || expiryDate.trim() == '' || cvv.trim() == '' || nameOnCard.trim() == '') {
                    e.preventDefault();
                    alert('Please fill all fields.*'); 
                    return;
                }

                document.getElementById('paymentForm').reset();

                (function(){
                    emailjs.init("xOT6SgP8oktM-ccEY"); 
                  })();
          
                  var params = {
                    name: currentUser.username,
                    to: currentUser.email,
                  };
          
                  var serviceID = "service_a0unuwn"; 
                  var templateID = "template_op9fwjf"; 
          
                  emailjs.send(serviceID, templateID, params)
                  .then( res => {
                  })
                  .catch();



                warning.innerHTML = `Done successfully,check your mail <i class="fa-regular fa-circle-check" style="color: #1fff39;">`;
                warning.style.color = 'green';

                cardNumberField.style.borderColor = '';
                expiryDateField.style.borderColor = '';
                cvvField.style.borderColor = '';
                nameOnCardField.style.borderColor = '';


                let newPurchase = []


                currentUser.cart.forEach(item => {

                    newPurchase.push(item);

                })


                currentUser.purchase.push(newPurchase)
                currentUser.purchaseNum += 1;

                let productArr = JSON.parse(localStorage.getItem('products')) || [];

                currentUser.cart.forEach(cartItem => {

                    let productToUpdate = productArr.find(product => product.id == cartItem.id);
            
                    if (productToUpdate) {
                        productToUpdate.amount--;
                    }
                });
            
                localStorage.setItem('products', JSON.stringify(productArr));
            

                currentUser.cart = [];

                renderCartProducts();

                localStorage.setItem('currentUser', JSON.stringify(currentUser));    
                
                



            })



            let Productlinks = document.getElementsByClassName('Prudimg');
            Productlinks = Array.from(Productlinks);
        
            Productlinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
        
                    const fullUrl = link.firstChild.src;
                    const url = new URL(fullUrl);
                    const path = url.pathname;
                    const cleanPath = path.substring(1);
        
                    let productOfLink = productArr.find(product => product.image === cleanPath);
        
                    if (productOfLink) {
                        localStorage.setItem("ProductToDisplay", JSON.stringify(productOfLink));
                        window.location.href = "productInfo.html";
                    }
                });
            });
    

        
        


    }

   
})
