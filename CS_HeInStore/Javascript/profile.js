addEventListener('load', function () {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
        if (!currentUser || currentUser.isLoggedIn == false) {

            this.window.location.href = 'login.html'   
        }
        else{

    const profileInfoContainer = document.getElementById('profile-info');

    const purchaseInfoContainer = document.getElementById('purchase-info');

    const changePasswordForm = document.querySelector('.change-password-form');
    
    const oldPasswordInput = document.getElementById('old-password');
    
    const newPasswordInput = document.getElementById('new-password');
    
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');
    
    const logoutButton = document.getElementById('logout-button');



    const currentUser = JSON.parse(localStorage.getItem('currentUser'));



    const userInfoHTML = `<div class ='info'><p class='info-p label'><b>Username:</b> </p><p class='info-p'>${currentUser.username}</p></div>
                          <div class ='info'><p class='info-p label'><b>Email:</b></p><p class='info-p'>${currentUser.email}</p></div>`;
    profileInfoContainer.innerHTML = userInfoHTML;

    purchaseInfoContainer.innerHTML = `<div class ='info'><p class='info-p label'><b>number of parchase processes:</b> </p><p class='info-p'>${currentUser.purchaseNum}</p></div>`




    function renderCartProducts() {
        let tableBody = document.getElementsByTagName('tbody')[0];
        
        let firstRow = document.querySelector('tr');
        
        tableBody.innerHTML = '';

        tableBody.appendChild(firstRow);

        if(currentUser.purchase.length === 0){
            tableBody.innerHTML = '';
            let EmptyRow = tableBody.insertRow(-1);
            let EmptyCell = EmptyRow.insertCell(0);
            EmptyCell.colSpan = 4;
            EmptyCell.style.width = '500px';
            EmptyCell.style.textAlign = 'center';
            EmptyCell.innerHTML = 'No purchases yet'
            return;
        }
        

        for (let index = 0; index < currentUser.purchase.length; index++) {
            let items = currentUser.purchase[index]
            
            let row1 = tableBody.insertRow(-1);
            let infoCell = row1.insertCell(0);
            infoCell.colSpan = 4;
            infoCell.innerHTML = `<b>Parchase no. ${index + 1} </b>`
            let sum = 0;
            let uniqueProducts = {};
            items.forEach(product => {
                if (!uniqueProducts[product.id]) {
                    uniqueProducts[product.id] = { product, quantity: 0 };
                }
                uniqueProducts[product.id].quantity++;
            });

            Object.values(uniqueProducts).forEach(entry => {
                let product = entry.product;
                let quantity = entry.quantity;
        
                let row = tableBody.insertRow(-1);
                let cellImage = row.insertCell(0);
                let cellBriefDescription = row.insertCell(1);
                let cellPrice = row.insertCell(2);
                let cellQuantity = row.insertCell(3);


                cellImage.innerHTML = `<a href='productInfo.html' class='linkToProduct'><img src='${product.image}' class = 'lolo'></a>`;
                cellBriefDescription.innerHTML = product.briefDescription;
                cellPrice.innerHTML = product.price;
                sum += Number(product.price.slice(1))*quantity;
                cellBriefDescription.innerHTML = product.briefDescription;  
                cellQuantity.innerText = quantity;
            }

            
            );

            let SumPriceRow = tableBody.insertRow(-1);
            let SumPriceRowLabel = SumPriceRow.insertCell(0);
            let SumPriceRowValue = SumPriceRow.insertCell(1);
            SumPriceRowLabel.colSpan = 2;
            SumPriceRowLabel.style.textAlign = 'center';
            SumPriceRowLabel.innerHTML = '<b>Total Paid :</b>'
            SumPriceRowValue.innerHTML = `<b>$${sum}</b>`;
            SumPriceRowValue.colSpan = 2;
        }
        
        
    }

    renderCartProducts();

    function logout() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
    
        for (let index = 0; index < users.length; index++) {
            if (users[index].username === currentUser.username) {
                users.splice(index, 1);
                users.push(currentUser);
                break;
            }
        }
    
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('currentUser');
        localStorage.removeItem('ProductToDisplay');
    }


    changePasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const oldPassword = oldPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;
    
        let userFound = false;
    
        if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
    
    
        if (currentUser.password == oldPassword) {
                
                userFound = true;
    
    
        if (newPassword !== confirmNewPassword) {
            alert('New password and confirm new password do not match.');
            return;
        }

        currentUser.password = newPassword;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

       

        if(confirm('Password changed successfully!\n\nDo you want to logout?') == true){
            oldPasswordInput.style.borderColor = 'black';
            logout();
            window.location.href = 'HomePage.html';
            }
    }else{
        oldPasswordInput.style.borderColor = 'red';
        oldPasswordInput.focus();
    }
});
        

        logoutButton.addEventListener('click', function () {
            
            logout();
            window.location.href = 'HomePage.html';
        });

        let fullBody = document.getElementsByClassName("profile-wrapper")[0];
        let purchaseable = document.getElementById("purchase-table");
        fullBody.style.paddingBottom = purchaseable.offsetHeight - 300 +  'px';

    }
    });