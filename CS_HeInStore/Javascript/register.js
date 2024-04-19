addEventListener('load', function () {

    // function fillMonths() {
    //     const monthSelect = document.getElementById('month');
    //     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //     for (let i = 0; i < months.length; i++) {
    //         const option = document.createElement('option');
    //         option.value = i + 1; 
    //         option.textContent = months[i];
    //         monthSelect.appendChild(option);
    //     }
    // }

    // function fillDays() {
    //     const daySelect = document.getElementById('day');
    //     for (let day = 1; day <= 31; day++) {
    //         const option = document.createElement('option');
    //         option.value = day;
    //         option.textContent = day;
    //         daySelect.appendChild(option);
    //     }
    // }
    // function fillYears() {
    //     const yearSelect = document.getElementById('year');
    //     const currentYear = new Date().getFullYear();
    //     for (let year = currentYear; year >= currentYear - 100; year--) {
    //         const option = document.createElement('option');
    //         option.value = year;
    //         option.textContent = year;
    //         yearSelect.appendChild(option);
    //     }
    // }

    // fillDays();
    // fillMonths();
    // fillYears();

    let warningDiv = document.getElementById("register-warning");
    let warning = document.createElement('p');
    warning.style.fontStyle = 'italic';
    warning.style.color = 'red';
    warningDiv.appendChild(warning);

    

    const passwordField = document.getElementById('password');

    
    passwordField.addEventListener('blur', function(){

        const password = passwordField.value;
        let passHolder = document.getElementById('pass-holder');
    
        const minLength = 8;
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if(password.length >= minLength && hasLetter && hasNumber && hasSpecialChar)
    {
        passHolder.innerHTML = 'Password: <i class="fa-solid fa-circle-check" style="color: #1cca27;"></i>';
        document.getElementsByClassName('fa-circle-check')[0].title = 'Verified';
        return;
    }
    
        passHolder.innerHTML = 'Password: <i class="fa-solid fa-circle-exclamation" style="color: #a4a5a8;"></i>';
        document.getElementsByClassName('fa-circle-exclamation')[0].title = 'Please follow instructions';
    })

    

    const registerForm = document.querySelector('.register-form');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const usernameField = document.getElementById('username');
        const username = usernameField.value;
     

        const emailFiield = document.getElementById('email');
        const email = emailFiield.value;

        

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            warning.innerHTML = "Insert a correct Email !*";
            emailFiield.style.borderColor = 'red';
            return;
        }
        const passwordField = document.getElementById('password');
        const password = passwordField.value;
       
        const confirmPasswordField = document.getElementById('confirm-password');
        const confirmPassword = confirmPasswordField.value;

        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        const userExists = users.some(user => user.username == username || user.email == email);
        console.log(userExists);
        if(userExists){
            warning.innerHTML = 'username or email is already used.*';
            return;
        }

        const minLength = 8;
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
        
        if(!(password.length >= minLength && hasLetter && hasNumber && hasSpecialChar))
        {
            warning.innerHTML = 'Please insert a strong password.*';
            passwordField.style.borderColor = 'red';
            return;
        }


        if (password !== confirmPassword) {
            warning.innerHTML = 'Password and Confirm Password do not match.*';
            passwordField.style.borderColor = 'red';
            confirmPasswordField.style.borderColor = 'red';

            return;
        }



        
            
            
        
        
        

        const newUser = {
            username: username,
            email: email,
            password: password,
            isLoggedin: false,
            cart: [],
            purchase: [],
            purchaseNum : 0
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        window.location.href = 'login.html';
    });

    const loginLink = document.querySelector('.loginlink');
    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'login.html';
    });

    
});
