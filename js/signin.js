document.onload =  check_logged_in()
function login(){
            var user = document.getElementById("InputEmail1").value;
            var passw = document.getElementById("InputPassword").value;
            var raw = JSON.stringify({ "username": user, "password": passw });
            var requestOptions = {
              method: 'POST',
              body: raw,
              redirect: 'follow',
              headers:{"content-type":"application/json"}
            };
            fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/login", requestOptions)
              .then(response => response.json())
              .then(result =>  check_user(result))
              .catch(() => alert("login failed"))
        }

        function check_user(data){
                  localStorage.setItem("token",data.token)
                  localStorage.setItem("username",data.data.username)
                 if (data.success == "logined successfully"){
                  document.getElementById("InputEmail1").value = "";
                  document.getElementById("InputPassword").value = "";
                  window.location.href = "../index.html"
                }
        }
       function check_logged_in(){
         if(localStorage.getItem("username")){
          window.location.href = "./HomePage.html"
         }
       } 