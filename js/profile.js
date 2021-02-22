function basicdata() {
    let username = localStorage.getItem("username")
        let db = openDatabase("netflix", "1.1", "my store databse", 10 * 1024 * 1024)

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (id int primary key, username varchar(50),firstname varchar(100), lastname varchar(100), phone varchar(100), email varchar(150), plan varchar(50), image varchar(500))');
            tx.executeSql(`select * from accounts where username='${username}'`, [], function (tx, result) {
                console.log(result)
                for (let i = 0; i < result.rows.length; i++) {
                    console.log(result.rows[i].firstname)
                    var img = document.querySelector('img');
                    img.src = result.rows[i].image
                    var structure = '<h2 style="color:white;">'
                    structure += result.rows[i].firstname
                    structure += '</h2>'
                    $(structure).insertAfter("#firstname");
                    var structure = '<h2 style="color:white;">'
                    structure += result.rows[i].lastname
                    structure += '</h2>'
                    $(structure).insertAfter("#lastname");
                    //phone number****************
                    var structure = '<h2 style="color:white;">'
                    structure += result.rows[i].phone
                    structure += '</h2>'
                    $(structure).insertAfter("#phone");
                    //email*******************
                    var structure = '<h2 style="color:white;">'
                    structure += result.rows[i].email
                    structure += '</h2>'
                    $(structure).insertAfter("#email");
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
        var structure = '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"><div class="form-group"><label class="mr-2">Plane : </label><br><h2 style="color:white;">'
        structure += plan
        structure += '</h2></div></div>'
        $(structure).insertAfter(".plan");

        var structure = '<h1 class="user-name mt-5" id="username">'
        structure += username
        structure += '</h1>'
        $(structure).insertAfter(".user");

    });
});