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
// Select the image
// const img = document.querySelector('#test_image');
// img.addEventListener('load', function (event) {
//     const dataUrl = getDataUrl(event.currentTarget);
//     // console.log(dataUrl);
// });

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
async function videoadd() {
    let title = document.getElementById("title").value;
    let url = document.getElementById("url").value;
    const image = getDataUrl(document.getElementById("test_image"));

    var myHeaders = new Headers();
    //take data from session storage
    // var token = localStorage.getItem("token");
    // myHeaders.append("token", token);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify({
        "url": {
            "image": image,
            "video_url": url

        },
        "title": title,
        "type": "movie"

    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        // headers: { "content-type": "application/json" }
    };

    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}


function videoedit() {
    let arr;
    //read data from form
    // localStorage.setItem('id', 2);
    let video_id = sessionStorage.getItem("index");
    console.log(video_id);
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
        .then(result => {updatevideo(result.data.id, result.data.title, result.data.url.image, result.data.url.video_url)})
        .catch(error => console.log('error', error));
}



function updatevideo(id, oldtitle, oldimage, oldurl) {
    alert("update successfully");
    let title = document.getElementById("title").value;
    let url = document.getElementById("url").value;
    const image = getDataUrl(document.getElementById("test_image"));
    let obj = {
        "url": {
            "image": oldimage,
            "video_url": oldurl

        },
        "title": oldtitle,
        "type": "movie"
    }
    if (title != "") {
        obj.title = title
        console.log("title")
    }
    if (url != "") {
        obj.url.video_url = url
        console.log("url")
    }
    if (image != "data:,") {
        obj.url.image = image
        console.log("image")
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
