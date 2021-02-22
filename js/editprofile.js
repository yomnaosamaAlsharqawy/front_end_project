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
    let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
            tx.executeSql(`select * from accounts where username='${username}'`, [], function (tx, result) {
                console.log(result)
                for (let i = 0; i < result.rows.length; i++) {
                    console.log(result.rows[i].firstname)
                    var img = document.querySelector('img');
                    img.src = result.rows[i].image
                }
            }, function (tx, error) {
                console.log(error)
            })
        });
}

//load data in add profile (username and plan)
$(document).ready(function () {
    $("body").append(function () {
        plan = localStorage.getItem("plan")
        username = localStorage.getItem("username")

        var structure = '<h4 class="user-name mt-5" id="username">'
        structure += username
        structure += '</h4>'
        $(structure).insertAfter(".user");

    });
});



function editprofile() {
    let first_name = document.getElementById("firstname").value
    let last_name = document.getElementById("lastname").value
    let phone = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let plan = $(".plan").val();
    console.log(plan,first_name,last_name,phone,email)
    let username = localStorage.getItem("username")
    const image = getDataUrl(document.getElementById("test_image"));

    let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
        if(first_name != ""){
            db.transaction(function(tx){
                tx.executeSql("update accounts set firstname = ? where username = ? ",[first_name,username])
            })
        }
        if(last_name != ""){
            db.transaction(function(tx){
                tx.executeSql("update accounts set lastname = ? where username = ? ",[last_name,username])
            })
        }
        if(phone != ""){
            db.transaction(function(tx){
                tx.executeSql("update accounts set phone = ? where username = ? ",[phone,username])
            })
        }

        if(email != ""){
            db.transaction(function(tx){
                tx.executeSql("update accounts set email = ? where username = ? ",[email,username])
            })
        }

        if(image != "data:,"){
            db.transaction(function(tx){
                tx.executeSql("update accounts set image = ? where username = ? ",[image,username])
            })
        }
        if(plan != ""){
            db.transaction(function(tx){
                tx.executeSql("update accounts set plan = ? where username = ? ",[plan,username])
            })
        }
    });
    // alert("please reload the page to see changes")
    // window.location.href ="profile.html"
}

