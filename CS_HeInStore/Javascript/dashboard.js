addEventListener('load',function(){

  

    let addButton = document.getElementById("addproductbutton");
    addButton.addEventListener('click',function(e){

        e.preventDefault();
    
        let productArr = JSON.parse(localStorage.getItem('products')) || [];


        let productIdfield = document.getElementById('productId');
        let productId = productIdfield.value;
        
        if(!(/^[0-9]+$/.test(productId))){
            productIdfield.style.borderColor = 'red';
            e.preventDefault();
            return;
        }

        const isProductIdUnunique = productArr.find(product => product.id == productId);
        if (isProductIdUnunique) {
            alert('Product ID must be unique.');
            productIdfield.style.borderColor = 'red';
            e.preventDefault();
            return;
        }

        let productImageinput = document.getElementById('productImage');
        let productImage = productImageinput.value;
        

        let productPricefield = document.getElementById('productPrice');
        let productPrice = productPricefield.value;
        if(!(/^[0-9]+(\.[0-9]+)?$/.test(productPrice))){
            productPricefield.style.borderColor = 'red';
            e.preventDefault();
            return;
        }

        let productAmountfield = document.getElementById('productAmount');
        let productAmount = productAmountfield.value;
        if (!(/^[0-9]+$/.test(productAmount))) {
            productAmountfield.style.borderColor = 'red';
            e.preventDefault();
            return;
        }

        let briefDescriptionfield = document.getElementById('briefDescription');
        let briefDescription = briefDescriptionfield.value;
        if(briefDescription.trim() == ''){
            briefDescriptionfield.style.borderColor = 'red';
            e.preventDefault();
            return;

        }

        let fullDescriptionfield = document.getElementById('fullDescription');
        let fullDescription = fullDescriptionfield.value;
        if(fullDescription.trim() == ''){
            fullDescriptionfield.style.borderColor = 'red';
            e.preventDefault();
            return;

        }

        let productObj = {
            id: Number(productId),
            image: productImage,
            price: '$' + productPrice,
            briefDescription: briefDescription,
            fullDescription: fullDescription,
            amount: productAmount
        };
        


        productArr.push(productObj);

        UpdatedproductArr = JSON.stringify(productArr)

        localStorage.setItem('products', UpdatedproductArr);
        
        renderProducts();

        document.getElementById('crudProductForm').reset();


    })


    let removeButton = this.document.getElementById("removeproductbutton");
    removeButton.addEventListener('click',function(e){

        e.preventDefault();

        let productIdToRemoveField = document.getElementById('productIdToRemove');
        let productIdToRemove = productIdToRemoveField.value;

        if(!(/^[0-9]+$/.test(productIdToRemove))){
            productIdToRemoveField.style.borderColor = 'red';
            e.preventDefault();
            return;
        }

        let productArr = JSON.parse(localStorage.getItem('products')) || [];

        for (let index = 0; index < productArr.length; index++) {
           
            if (productArr[index].id == productIdToRemove) {

                productArr.splice(index, 1);
                
                localStorage.setItem('products', JSON.stringify(productArr));

                renderProducts();

                document.getElementById('removeProductForm').reset();

                return;
            }

            
            
        }

        alert("Product with the specified ID not found.");
        
        localStorage.setItem('products', JSON.stringify(productArr));

       
       
    })

    let updateButton = this.document.getElementById("adjustproductbutton");
    updateButton.addEventListener('click',function(e){
        e.preventDefault();

        let productArr = JSON.parse(localStorage.getItem('products')) || [];


        let productIdToUpdatefield = document.getElementById('productId')
        
        let productIdToUpdate= productIdToUpdatefield.value;

        const productToUpdate = productArr.find(product => product.id == productIdToUpdate);

        if (productToUpdate) {

            productToUpdate.image = document.getElementById('productImage').value || productToUpdate.image;

            productToUpdate.price = document.getElementById('productPrice').value || productToUpdate.price.slice(1);
                       
            if(!(/^[0-9]+(\.[0-9]+)?$/.test(productToUpdate.price))){
                
                document.getElementById('productPrice').style.borderColor = 'red';
                e.preventDefault();
                return;
            }
            productToUpdate.price = '$' + productToUpdate.price;


            productToUpdate.briefDescription = document.getElementById('briefDescription').value.trim() !== '' ?
                document.getElementById('briefDescription').value :
                productToUpdate.briefDescription;
                productToUpdate.fullDescription = document.getElementById('fullDescription').value.trim() !== '' ?
                document.getElementById('fullDescription').value :
                productToUpdate.fullDescription;
        } else {
            alert("Product with the specified ID not found.");
        }


        localStorage.setItem('products', JSON.stringify(productArr));

        renderProducts();

        document.getElementById('crudProductForm').reset();
        

    })


    function renderProducts() {
        let productArr = JSON.parse(localStorage.getItem('products')) || [];
        let tableBody = document.getElementsByTagName('tbody')[0];
        
        let firstRow = document.querySelector('tr');

        tableBody.innerHTML = '';

        tableBody.appendChild(firstRow);

        if(productArr.length === 0){
            let EmptyRow = tableBody.insertRow(-1);
            let EmptyCell = EmptyRow.insertCell(0);
            EmptyCell.colSpan = 6;
            EmptyCell.style.textAlign = 'center';
            EmptyCell.innerHTML = 'No Products in Gallery'
            return;
        }

        productArr.sort((a, b) => a.id - b.id);

        productArr.forEach(product => {
            
            let row = tableBody.insertRow(-1);
            let cellCheckbox = row.insertCell(0);
            let cellId = row.insertCell(1);
            let cellImage = row.insertCell(2);
            let cellPrice = row.insertCell(3);
            let cellBriefDescription = row.insertCell(4);
            let cellFullDescription = row.insertCell(5);
            let cellAmount = row.insertCell(6);

            cellId.innerHTML = product.id; 
            cellImage.innerHTML = `<a href='${product.image}'><img src='${product.image}' class = 'lolo'></a>`;
            cellPrice.innerHTML = product.price;
            cellBriefDescription.innerHTML = product.briefDescription;
            cellFullDescription.innerHTML = product.fullDescription;
            let counter = document.createElement('input');
            counter.type = 'number';
            counter.className = 'counter';
            counter.min = '0';
            counter.value = product.amount;

            cellAmount.append(counter);

            counter.addEventListener('input', function(){
               
                    product.amount = Number(counter.value);
    
                    localStorage.setItem('products', JSON.stringify(productArr));

                })
          
            
            

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = product.id;
            cellCheckbox.appendChild(checkbox);



        });
    }

    renderProducts();


    let DeleteSelectedButton = document.getElementById("deleteSelected");
    DeleteSelectedButton.addEventListener('click',function(e){

        let checkboxes = document.querySelectorAll('#productTable tbody input[type="checkbox"]:checked');
        let productArr = JSON.parse(localStorage.getItem('products')) || [];

        if(productArr.length == 0){
            e.preventDefault()
            return;
        }

        checkboxes.forEach(checkbox => {
            let productIdToDelete = checkbox.value;
           
            for (let i = 0; i < productArr.length; i++) {
                if (productArr[i].id == productIdToDelete) {
                    productArr.splice(i, 1);
                    break;
                }
            }
        });

        localStorage.setItem('products', JSON.stringify(productArr));

        renderProducts();
    });







        


});