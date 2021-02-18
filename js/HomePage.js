window.onscroll = function(){

   if(window.scrollY  < 250)
    $('.navbar').css({'background' :'transparent'})
    else
    $('.navbar').css({'background' :'#181818'})  
}
let i =0
let auto_slider_img = 
[
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQeswFYSQhT_EKhWh1GiRCmRMNpDeJ0YZScEG1ADRZFxht1kMwkCc_rmyYjhHgH_MqlPO44lB9Tcf-nm86Aj1IBoFvDm.webp?r=2fc',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeBagQdScNrqUO9WDR3E8g1R8mNbxVSnUCme_pbwjG5VNIDOWGmZ74wzxOmwWtxdc5lK6QddwqqzqL0dA6I0QBUI0UX1.webp?r=5d1',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYxf9wPTvH85qUFyru9EmKs4MCgfnt4nSUwwoWs4zL6Ke9s7gThZXdSCZXWoFlMebqgA7ENvYxWsmRG_7Qfml0kDP-Jd.webp?r=017',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABT57LyOsjWOnVvK_tEcoQGBv43xLpZ3u1YX7rpAeuTGKKqmQPCM9NQqU6-zAfjl3kfMPeCKeeYyJrTaq_0jDz613JFbu.webp?r=33d',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRkumeuYeu67Yjb_fL92Wmpqf8aHj59q-rwJCj5kd-LEfBcPc32FGi-DhushJJH4G1SvPsZlqKdoxmyqk4HuyS4kVKC6.webp?r=567',
    'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUYLolq_XZqb03iMpNaeYmPp5pErmI5bigSQlt7Yr7Kvfw6jT1AZYLpVGoHTUk6DuD38CMEOpjGhSqqeaE11t-4-EvSa.webp?r=359'
]

setInterval(change_image,3000)
function change_image(){
    if(i < auto_slider_img.length){
        $('.jumbotron').css('background-image', 'url(' + auto_slider_img[i] + ')');
        i++;
    }else{
        i =0 ;
    }
}


 var img =  'https://occ-0-4609-784.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSU7HE_H6w0phrVxvnprqrbb1zUbbt9n0DkF03F2j48zgNi2AunWZME4mEwTuvPSvZ4hVZ2MH4zQVAbw-bsXK023nv65PDcYZID8o6LgaJyZM9HO-CIdFNbm7z12.jpg?r=699'
 var title = "Ozark"
 
var arr =[]
 function generate_card(img,title){
    let item = '<div class="card col-sm-3" style="width: 18rem;">'
        item += '<img src="'
        item += img
        item += 'class="card-img-top" alt="Not Found">'
        item += '<div class="card-body" >'
        item += '<p class="card-text">'
        item += title
        item += '</p>'
        item += '</div>'
        item += '</div>'
    return item
}

 function get(){
    var myHeaders = new Headers();    
    myHeaders.append("token","4a1d8bf9-618a-4422-a6b8-dcfe749ffd61");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:{"content-type":"application/json"},
    headers:myHeaders,
  };
  fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/30/video/", requestOptions)
  .then(response => response.json())
  .then(result =>{     
    for (i=0 ;i<result.length;i++){
        $('.m-top').append(generate_card(result[i].url,result[i].title))
     }
})
}
get()