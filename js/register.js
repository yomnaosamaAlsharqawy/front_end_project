
function signup(){
    var username = document.getElementById("userName").value
    var password = document.getElementById("Password").value    
    var raw = JSON.stringify({"username":username,"password":password});
    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
      headers:{"content-type":"application/json"}  
    };
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/register", requestOptions)
      .then(response => response.json())
      .then(result =>  check_user(result))
      .catch(error => alert("register failed"));
}
function check_user(data){
  if (data.success == 'registered successfully'){
        localStorage.removeItem("token")
        localStorage.removeItem("username")  
        document.getElementById("userName").value = ""
        document.getElementById("Password").value = ""
        localStorage.setItem("plan",document.querySelector(".plan").value);
        window.location.href = "./addprofile.html"
  }
}