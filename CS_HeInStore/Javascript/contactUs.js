addEventListener('load',function(){

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.querySelector("#sendername").value = currentUser.username;
        document.querySelector("#email").value = currentUser.email;
        document.querySelector("#message").value
    }






    let sendBotton = document.getElementById('submit-botton');

    sendBotton.addEventListener('click',function(e){

        e.preventDefault();



        let emailFiield = document.getElementById('email');
        let email = emailFiield.value;


        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            emailFiield.style.borderColor = 'red';
            return;
        }












        (function(){
            emailjs.init("xOT6SgP8oktM-ccEY"); 
          })();
  
          var params = {
            sendername: document.querySelector("#sendername").value,
            from: document.querySelector("#email").value,
            subject: document.querySelector("#subject").value,
            message: document.querySelector("#message").value,
          };
  
          var serviceID = "service_a0unuwn"; 
          var templateID = "template_bk6486s"; 
  
          emailjs.send(serviceID, templateID, params)
          .then( res => {
              alert("Email sent successfully!!")
          })
          .catch();


          document.forms[0].reset();


        
    })






})