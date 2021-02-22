//add new div to add new episode
$(document).ready(function () {
    $(".add").click(function () {
        var structure = '<div class="form-group row"><label for="url" class="col-sm-2 col-form-label labelsize2">New Episode URL:</label><div class="col-sm-6"><input type="url" class="form-control urls" id="url" required></div></div>';
        $(structure).insertBefore(".divadd");
    });
});


function videoedit() {
    let arr;
    //read data from form
    sessionStorage.setItem('id', "2111");
    let video_id = sessionStorage.getItem("id");
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("content-type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    //retrive data from api
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/" + video_id, requestOptions)
        .then(response => response.json())
        .then(result => { updatevideo(result.data.id, result.data.title, result.data.url.image, result.data.url.video_url) })
        .catch(error => console.log('error', error));
}



function updatevideo(id, oldtitle, oldimage, oldurls) {
    let url_array = [];
    let urls = $(".urls");
    for (var i = 0; i < urls.length; i++) {
        oldurls.push($(urls[i]).val());
    }
    let obj = {
        "url": {
            "image": oldimage,
            "video_url": oldurls

        },
        "title": oldtitle,
        "type": "serial"
    }
    // connect api for new updates
    var myHeaders = new Headers();
    //take data from session storage
    // myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify(obj);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/" + id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));



}