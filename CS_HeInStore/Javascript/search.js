addEventListener('load', function(){

         
    let productArr = JSON.parse(localStorage.getItem('products')) || [];
    
    document.getElementById('search-link').addEventListener('click', function(e){


        e.preventDefault();

        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
        console.log(searchTerm);
        if (searchTerm.trim() !== '') {

            const searchResults = productArr.filter(product => product.briefDescription.toLowerCase().includes(searchTerm) || product.fullDescription.toLowerCase().includes(searchTerm));
    
            if (searchResults.length > 0) {

                let firstResult = searchResults[0];

                localStorage.setItem("ProductToDisplay", JSON.stringify(firstResult));

                window.location.href = "productInfo.html";

            } else {
                return;
            }
        } else {

            document.getElementById('searchInput').style.borderColor = 'red';
        }
    





    })




});