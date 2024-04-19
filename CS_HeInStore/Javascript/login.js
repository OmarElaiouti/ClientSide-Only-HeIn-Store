addEventListener('load', function () {

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const newadmin = {
        username: 'admin',
        email: 'admi5hamada@gmail.com',
        password: '123##',
        isLoggedin: false,
        cart: [],
        purchase: [],
        purchaseNum : 0
    };

    const adminExists = users.some(user => user.username === newadmin.username);

    if(!adminExists){users.push(newadmin);}

    localStorage.setItem('users', JSON.stringify(users));

    const loginForm = document.querySelector('.login-form');

    let warningDiv = document.getElementById("login-warning");
    let warning = document.createElement('p');
    warning.style.fontStyle = 'italic';
    warning.style.color = 'red';
    warningDiv.appendChild(warning);

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
       
        


        if (username.trim() === '' || password.trim() === '') {
            warning.innerHTML = 'Please fill in all fields.*';
            
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        
        for (let index = 0; index < users.length; index++) {
            
            if(users[index].username === username && users[index].password === password){
                users[index].isLoggedin = true;
                localStorage.setItem('currentUser', JSON.stringify(users[index]));
                localStorage.setItem('users', JSON.stringify(users));

                location.replace('HomePage.html');
                
                return;
            }
            
                          
            
        }
        
        warning.innerHTML = 'Invalid username or password.*';


        
    });

    const registerLink = document.querySelector('.registerlink');
    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'register.html';
    });
});
