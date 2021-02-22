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
//add new div to add new episode
$(document).ready(function () {
    $(".add").click(function () {
        var structure = '<div class="form-group row"><label for="url" class="col-sm-2 col-form-label labelsize">Episode URL:</label><div class="col-sm-6"><input type="url" class="form-control urls" id="url" required></div></div>';
        $(structure).insertBefore(".divadd");
    });
});


async function videoadd() {
    let url_array = [];
    let title = document.getElementById("title").value;
    const image = getDataUrl(document.getElementById("test_image"));
    let urls = $(".urls");
    for(var i = 0; i < urls.length; i++){
        url_array.push($(urls[i]).val());
    }

    var myHeaders = new Headers();
    //take data from session storage
    // var token = localStorage.getItem("token");
    // myHeaders.append("token", token);
    myHeaders.append("token", "7b67c1ef-fc98-4c81-90e8-f6c65f97aef9");
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify({
        "url": {
            "image": image,
            "video_url": url_array

        },
        "title": title,
        "type": "serial"

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