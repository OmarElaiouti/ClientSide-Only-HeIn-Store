addEventListener('load', function () {

    function Dashboard(){

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
        if (currentUser && currentUser.username === 'admin') {
            document.getElementById("user-button").innerHTML = 'Profile';
            let menu = this.document.getElementsByClassName('menu')[0];
            
            let dashboradButtondiv = document.createElement('div');
            dashboradButtondiv.className = 'menuItem';

            let dashboradButtonAnch = document.createElement('a');
            dashboradButtonAnch.href = 'dashboard.html';
            dashboradButtonAnch.title = 'Dashboard'
            
            let dashboradButton = document.createElement('i');
            dashboradButton.classList.add('fa-solid');
            dashboradButton.classList.add('fa-table-columns');
            
            dashboradButtonAnch.appendChild(dashboradButton);
            dashboradButtondiv.appendChild(dashboradButtonAnch);
            menu.appendChild(dashboradButtondiv);

        }
        else if(currentUser && currentUser.username !== 'admin'){
            document.getElementById("user-button").innerHTML = 'Profile';
        }
        else{
            return;
        }
    }

    Dashboard();


    
    })