loginbutton.addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username!="" && password!="") {
        window.location.replace("./main.html")
    }
} );