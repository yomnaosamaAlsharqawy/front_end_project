// variable declaration
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

// retrieve all data from api and append it to parent 
get()

//set image every 3 seconds
setInterval(change_image, 3000)


// nav to video player and play video
function player() {
  for (let a of arr) {
    if (a.title == $(this).find('.card-text').text()) {
      sessionStorage.setItem("length", a.url.video_url.length)
      sessionStorage.removeItem("videoUrl", a.title)
      sessionStorage.setItem("img", a.url.image)
      for (let i = 0; i < a.url.video_url.length; i++) {
        sessionStorage.setItem(i, a.url.video_url[i])
      }
      window.location.href = "./Episodes.html"
    }
  }
}

// set image to new image every 3 seconds
function change_image() {
  if (i < auto_slider_img.length) {
    $('.jumbotron').css('background-image', 'url(' + auto_slider_img[i] + ')');
    i++;
  } else {
    i = 0;
  }
}

// retreive all data from api and append to parent
function get() {
  var myHeaders = new Headers();
  myHeaders.append("token", localStorage.getItem('token'));
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: { "content-type": "application/json" },
    headers: myHeaders,
  };
  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos", requestOptions)
    .then(response => response.json())
    .then(result => {
      arr = result
      console.log(arr)
      for (i = 0; i < result.length; i++) {
        if (result[i].type == "serial") {
          $('.m-top').append(generate_card(result[i].url.image, result[i].title))
          console.log(result[i].type)
        }
      }
      $('.card').click(player);
      if (localStorage.getItem('username') != 'admin') {
        $(".delete").css({
          "display": "none"
        })
        $(".edit").css({
          "display": "none"
        })
      }
      $(".delete").click((e) => {
        alert("this may take few seconds")
        e.stopPropagation();
        for (let a of arr) {
          if (a.title == $(e.target).parent().siblings().find('.card-text').text()) {
            remove_movie(a.id)
          }
        }
      })
      $(".edit").click((e) => {
        e.stopPropagation();
        for (let a of arr) {
          if (a.title == $(e.target).parent().siblings().find('.card-text').text()) {
            sessionStorage.setItem("index", a.id)
            window.location.href = "../nav/episode_option_choose.html"
          }
        }
      })
    })
}

//create card element 
function generate_card(img, title) {
  let item = '<div class="card col-sm-3"  style="width: 18rem;">'
  item += '<img src="'
  item += img
  item += '"'
  item += 'class="card-img-top" alt="Not Found">'
  item += '<div class="card-body" >'
  item += '<p class="card-text">'
  item += title
  item += '</p>'
  item += '</div>'
  item += '<div style = "width:100% ; display:flex;flex-direction:row">'
  item += '<button style="flex : 1" class=" bg-danger text-white delete">Delete</button><button style="flex : 1" class=" bg-info text-white edit">Edit</button>'
  item += '</div>'
  item += '</div>'
  return item
}

//remove series from api
function remove_movie(id) {
  var myHeaders = new Headers();
  myHeaders.append("token", localStorage.getItem("token"));

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/" + id, requestOptions)
    .then(response => response.text())
    .then(result => alert("succesfully deleted"))
    .catch(error => console.log('error', error));
}

// log out to home page
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
      window.location.href = "../index.html"
      localStorage.removeItem("username")
    })
    .catch(error => console.log('error', error));
}