addEventListener('load', function(){

  let productArr = JSON.parse(localStorage.getItem('products')) || [];
       

    let obj1 = {
      id: 4,
      image:  'images/productImages/thied.jpg',
      price: '$140',
      briefDescription: 'Cozy. Stylish. Versatile. Comfortable.',
      fullDescription: 'Indulge in comfort with our premium cotton blend sweatshirt. A classic design for casual days or lounging at home, available in various colors. Elevate your wardrobe with this perfect blend of style and comfort.',
      amount: 1
  };

    const productExists1 = productArr.some(product => product.id === obj1.id);

    if(!productExists1){productArr.push(obj1);}


    let obj2 = {
      id: 5,
      image: 'images/productImages/second.jpg',
      price: '$120',
      briefDescription: 'Timeless. Versatile. Elegant. Classic.',
      fullDescription: 'Elevate your style with our meticulously crafted button-down shirt. A timeless essential for formal or casual occasions. Experience sophistication and comfort with our premium cotton shirt.',
      amount: 1
  };


   const productExists2 = productArr.some(product => product.id === obj2.id);

    if(!productExists2){productArr.push(obj2);}

    let obj3 = {
      id: 6,
      image: 'images/productImages/first.jpg',
      price: '$130',
      briefDescription: 'Stylish. Warm. Versatile. Functional.',
      fullDescription: 'Embrace colder weather with our stylish and functional coat. Meticulously designed for warmth and fashion, featuring a sleek silhouette and thoughtful details. Elevate your outerwear collection with this reliable choice for changing seasons.',
      amount: 1
  };

    const productExists3 = productArr.some(product => product.id === obj3.id);

    if(!productExists3){productArr.push(obj3);}
     
    localStorage.setItem('products', JSON.stringify(productArr));

    
    function shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, 6);
      }

      

      let shuffled = shuffleArray(productArr);

      let productWrapper = document.getElementById('random-products-wrapper');

      shuffled.forEach(product => {
        
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

        productWrapper.appendChild(productItem);

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
    });


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

    



})