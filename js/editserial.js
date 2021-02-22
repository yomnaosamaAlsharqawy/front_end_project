function getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.1);
}
window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            var img1 = document.querySelector('#test_image');
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }
            img1.onload = () => {
                URL.revokeObjectURL(img.src);
            }

            img.src = URL.createObjectURL(this.files[0]);
            img1.src = URL.createObjectURL(this.files[0]);
        }
    });
});
//add new div to add new episode
$(document).ready(function () {
    $(".add").click(function () {
        // sessionStorage.setItem('id', "2111");
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
            .then(result => {
                var structure = '<div class="form-group row"><label for="url" class="col-sm-2 col-form-label labelsize2">Episode New URL:</label><div class="col-sm-6"><input type="url" class="form-control urls" id="url"></div><label for="url" class="col-sm-2 col-form-label labelsize2">Episode number:</label><div class="col-sm-2" style="margin-left: -3%;"><select class="form-control select">';
                var options = result.data.url.video_url;
                for (var i = 0; i < options.length; i++) {
                    var opt = i + 1;
                    structure += '<option value="​'
                    structure += opt
                    structure += '">'
                    structure += opt
                    structure += '</option>​'
                }
                structure += '</select></div></div>';
                $(structure).insertBefore(".divadd");
            })
            .catch(error => console.log('error', error));
    });
});
// load first selector 
function episodes() {
    let arr;
    //read data from form
    // sessionStorage.setItem('id', "2111");
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
        .then(result => {
            var select = document.getElementsByClassName("select")[0];
            var options = result.data.url.video_url;
            for (var i = 0; i < options.length; i++) {
                var opt = i + 1;
                var el = document.createElement("option");
                // console.log(el)
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        })
        .catch(error => console.log('error', error));
}
//******************************************************************************************************** */
//get data of this serial from api 
function videoedit() {
    //read data from form
    // sessionStorage.setItem('id', "2111");
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
//---------------------++++++++++++++++++++++++///////////////////////////
//update serial in api 
function updatevideo(id, oldtitle, oldimage, oldurl) {
    //get episodes number from drop down menue
    let episodes_number = [];
    let ep_num = $(".select");
    for (var i = 0; i < ep_num.length; i++) {
        if (i == 0) { episodes_number.push(parseInt($(ep_num[i]).val())); }
        else {
            str = $(ep_num[i]).val().charAt(1);
            episodes_number.push(parseInt(str));
        }
    }
    //get all new urls 
    let url_array = [];
    let urls = $(".urls");
    for (var i = 0; i < urls.length; i++) {
        url_array.push($(urls[i]).val());
    }
    let title = document.getElementById("title").value;
    const image = getDataUrl(document.getElementById("test_image"));

    let obj = {
        "url": {
            "image": oldimage,
            "video_url": oldurl

        },
        "title": oldtitle,
        "type": "serial"
    }
    if (title != "") {
        obj.title = title
    }
    if (image != "data:,") {
        obj.url.image = image
    }
    for (var i = 0; i < episodes_number.length; i++) {
        oldurl[episodes_number[i] - 1] = url_array[i]
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