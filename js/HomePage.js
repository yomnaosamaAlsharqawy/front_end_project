let i = 0
var arr = []
let auto_slider_img =
  [
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQeswFYSQhT_EKhWh1GiRCmRMNpDeJ0YZScEG1ADRZFxht1kMwkCc_rmyYjhHgH_MqlPO44lB9Tcf-nm86Aj1IBoFvDm.webp?r=2fc',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeBagQdScNrqUO9WDR3E8g1R8mNbxVSnUCme_pbwjG5VNIDOWGmZ74wzxOmwWtxdc5lK6QddwqqzqL0dA6I0QBUI0UX1.webp?r=5d1',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYxf9wPTvH85qUFyru9EmKs4MCgfnt4nSUwwoWs4zL6Ke9s7gThZXdSCZXWoFlMebqgA7ENvYxWsmRG_7Qfml0kDP-Jd.webp?r=017',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABT57LyOsjWOnVvK_tEcoQGBv43xLpZ3u1YX7rpAeuTGKKqmQPCM9NQqU6-zAfjl3kfMPeCKeeYyJrTaq_0jDz613JFbu.webp?r=33d',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRkumeuYeu67Yjb_fL92Wmpqf8aHj59q-rwJCj5kd-LEfBcPc32FGi-DhushJJH4G1SvPsZlqKdoxmyqk4HuyS4kVKC6.webp?r=567',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUYLolq_XZqb03iMpNaeYmPp5pErmI5bigSQlt7Yr7Kvfw6jT1AZYLpVGoHTUk6DuD38CMEOpjGhSqqeaE11t-4-EvSa.webp?r=359'
  ]


//retrieve all data and append to parent
get()

// set image every 3 seconds
setInterval(change_image, 3000)

// check the login user or no login account
check_login()



function change_image() {
  if (i < auto_slider_img.length) {
    $('.jumbotron').css('background-image', 'url(' + auto_slider_img[i] + ')');
    i++;
  } else {
    i = 0;
  }
}

function generate_card(img, title) {
  let item = '<div class="card col-sm-3" style="width: 18rem;">'
  item += '<img src="'
  item += img
  item += '"'
  item += 'class="card-img-top" alt="Not Found">'
  item += '<div class="card-body" >'
  item += '<p class="card-text">'
  item += title
  item += '</p>'
  item += '</div>'
  item += '</div>'
  return item
}
function get() {
  var myHeaders = new Headers();
  myHeaders.append("token", localStorage.getItem("token"));
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: { "content-type": "application/json" },
    headers: myHeaders,
  };
  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/", requestOptions)
    .then(response => response.json())
    .then(result => {
      for (i = 0; i < result.length; i++) {
        $('.m-top').append(generate_card(result[i].url.image, result[i].title))
      }
    })
}

// logout to home page 
function logout() {
  var myHeaders = new Headers();
  myHeaders.append("token", localStorage.getItem("token"));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/logout", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result.success)
      window.location.href = "./index.html"
      localStorage.removeItem("username")
    })
    .catch(error => console.log('error', error));
}


function login(user, passw) {
  var raw = JSON.stringify({ "username": user, "password": passw });
  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow',
    headers: { "content-type": "application/json" }
  };
  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/login", requestOptions)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('token', result.token)
      get()
    })
    .catch(() => alert("login failed"))
}
$('.signin').click(function () {
  window.location.href = "./nav/signin.html"
})

function register() {
  $('.register').click(function () {
    window.location.href = "./nav/register.html"
  })
}

function check_login() {
  if (localStorage.getItem('username')) {
    $('.logout').css({
      'display': 'block'
    })

    $('.signin').css({

      'display': 'none',

    })

    $('.profile').css({

      'display': 'block'

    })

    $('.register').css({

      'display': 'none'

    })
  }

  else {
    $('.home').css({

      "display": "none"

    })
    $('.dashboard').css({

      "display": "none"

    })
    $('.signin').css({

      'display': 'block',

    })

    $('.logout').css({

      'display': 'none'

    })

    $('.profile').css({

      'display': 'none'

    })

    login("dummyuser", "123456789")

  }
}


if (localStorage.getItem("username") == "admin") {
  $('.admin').css({

    "display": "block",

  })

}

window.onscroll = function () {

  if (window.scrollY < 250)
    $('.navbar').css({ 'background': 'transparent' })
  else
    $('.navbar').css({ 'background': '#181818' })
}
window.addEventListener('DOMContentLoaded', function () {
  let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)

db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
            tx.executeSql(`select username from accounts where username='${localStorage.getItem("username")}'`, [], function (tx, result) {
              if(result != "admin"){
                db.transaction(function (tx) {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
                  tx.executeSql(`INSERT into accounts(username, firstname, lastname, phone, email, plan, image) values('admin', 'admin', 'admin', 'admin', 'admin@gmail.com', '30 EGP', '')`)
                });
              }
            })
})
  
});