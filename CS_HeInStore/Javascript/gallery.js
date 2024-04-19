window.addEventListener('load', function renderProducts() {

    
    
    let productArr = JSON.parse(localStorage.getItem('products')) || [];
       

     let obj1 = {
                id: 1,
                image:  'images/productImages/kid3.jpg',
                price: '$140.95',
                briefDescription: 'Cozy. Stylish. Versatile. Comfortable.',
                fullDescription: 'Indulsge in comfort with our premium cotton blend sweatshirt. A classic design for casual days or lounging at home, available in various colors. Elevate your wardrobe with this perfect blend of style and comfort.',
                amount: 1
            };

            const productExists1 = productArr.some(product => product.id === obj1.id);

            if(!productExists1){productArr.push(obj1);}
           
            
            let obj2 = {
                id: 2,
                image: 'images/productImages/suit.jpg',
                price: '$280.75',
                briefDescription: 'Cozy. Stylish. Versatile. Comfortable.',
                fullDescription: 'Elevate your style with our meticulously crafted button-down shirt. A timeless essential for formal or casual occasions. Experience sophistication and comfort with our premium cotton shirt.',
                amount: 1
            };

            const productExists2 = productArr.some(product => product.id === obj2.id);

            if(!productExists2){productArr.push(obj2);}

            let obj3 = {
                id: 3,
                image: 'images/productImages/old1.jpg',
                price: '$199',
                briefDescription: 'Cozy. Stylish. Versatile. Comfortable.',
                fullDescription: 'Embrace colder weather with our stylish and functional coat. Meticulously designed for warmth and fashion, featuring a sleek silhouette and thoughtful details. Elevate your outerwear collection with this reliable choice for changing seasons.',
                amount: 1
            };

            const productExists3 = productArr.some(product => product.id === obj3.id);

            if(!productExists3){productArr.push(obj3);}
        
        localStorage.setItem('products', JSON.stringify(productArr));

    
    let tableBody = document.getElementsByTagName('tbody')[0];



    let trd;
   
    for (let i = 0; i < productArr.length; i++) {
        
    let product = productArr[i];


        

        if (i%3===0) {
            trd = document.createElement('tr');
            tableBody.appendChild(trd);
        }

        

        let tdd = document.createElement('td');

        let productItem = document.createElement('div');
        productItem.className = 'product-item';

        let productImgHolder = document.createElement('div');
        productImgHolder.className = 'product-img-holder';

        let productImagelink = document.createElement('a');
        productImagelink.className = 'Prudimg';
        productImagelink.href = 'productInfo.html';
        productImagelink.title = 'See more';


        let img = document.createElement('img');
        img.src = product.image;
        img.alt = 'Product Image';
        productImagelink.appendChild(img);
        
        let productDescription = document.createElement('a');
        productDescription.href = 'productInfo.html';
        productDescription.className = 'PrudDesc';
        
        let pardesc = document.createElement('p');
        pardesc.innerText = product.briefDescription;
        pardesc.className = 'briefDescription';
        productDescription.appendChild(pardesc);
        let productPrice = document.createElement('p');
        productPrice.textContent = product.price;
        productPrice.className = 'price';

        let cartIcon = document.createElement('i');
        cartIcon.classList.add('fa-solid','fa-cart-plus','add-to-cart')
        cartIcon.title = 'Add to cart';
     

        productImgHolder.appendChild(productImagelink);
        productItem.appendChild(productImgHolder);
        productItem.appendChild(productDescription);
        productItem.appendChild(productPrice);
        productItem.appendChild(cartIcon);
       
        

        tdd.appendChild(productItem);
        trd.appendChild(tdd);

        cartIcon.addEventListener('click', function () {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(!currentUser){location.href='login.html';return;}
            
            let productToDisplay = productArr.find(p => p.id == product.id);
            if (productToDisplay) {
                currentUser.cart.push(productToDisplay);
                
                cartIcon.classList.remove('fa-cart-plus') 
                cartIcon.classList.add('fa-circle-check','checked')  
                  
                setTimeout(function () {
                    cartIcon.classList.remove('fa-circle-check','checked')              
                    cartIcon.classList.add('fa-cart-plus')              

                }, 1000);  
                 
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }     
                 
        });
    };

    localStorage.setItem('products', JSON.stringify(productArr));



    let Productlinks = document.getElementsByClassName('Prudimg');
    Productlinks = Array.from(Productlinks);

    Productlinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const fullUrl = link.firstChild.src;
            const url = new URL(fullUrl);
            const path = url.pathname;
            const cleanPath = path.substring(1);

            let productOfLink = productArr.find(product => product.image == cleanPath);
            console.log(cleanPath);
            if (productOfLink) {
                localStorage.setItem("ProductToDisplay", JSON.stringify(productOfLink));
                window.location.href = "productInfo.html";
            }
        });
    });

    let ProductDlinks = document.getElementsByClassName('PrudDesc');
    ProductDlinks = Array.from(ProductDlinks);

    ProductDlinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let productOfLink = productArr.find(product => product.briefDescription == link.firstChild.innerText);

            if (productOfLink) {
                localStorage.setItem("ProductToDisplay", JSON.stringify(productOfLink));
                window.location.href = "productInfo.html";
            }
        });
    });


    



      

    });

