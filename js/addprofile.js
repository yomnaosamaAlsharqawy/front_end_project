// let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)
// db.transaction(function (tx) {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
// })

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

function basicdata() {
}

//load data in add profile (username and plan)
$(document).ready(function () {
    $("body").append(function () {
        plan = localStorage.getItem("plan")
        username = localStorage.getItem("username")
        var structure = '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"><div class="form-group"><label class="mr-2">Plane : </label><span>'
        structure += plan
        structure += '</span></div></div>'
        $(structure).insertAfter(".plan");

        var structure = '<h4 class="user-name mt-5" id="username">'
        structure += username
        structure += '</h4>'
        $(structure).insertAfter(".user");

    });
});


function addprofile() {
    let first_name = document.getElementById("firstname").value
    let last_name = document.getElementById("lastname").value
    let phone = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let plan = localStorage.getItem("plan")
    let username = localStorage.getItem("username")
    const image = getDataUrl(document.getElementById("test_image"));

    let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
        tx.executeSql(`INSERT into accounts(username, firstname, lastname, phone, email, plan, image) values('${username}', '${first_name}', '${last_name}', '${phone}', '${email}', '${plan}', '${image}')`)
        // tx.executeSql('DROP TABLE accounts');
    });
    window.location.href ="../index.html"
}

