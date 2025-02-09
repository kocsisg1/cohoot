registerbutton.addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    fetch(`https://localhost:44331/api/Registry`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ loginName: username, email: email, password: password }),
    }).then(res => {
        if(res.status == 200){
            window.location.replace("./main.html");
        }      
    });
});
