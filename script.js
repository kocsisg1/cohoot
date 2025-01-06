/*loginbutton.addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username!="" && password!="") {
        window.location.replace("./main.html")
    }
} );
*/
fetch("https://localhost:44331/api/Quiz")
.then(res=>{
    return res.json()
}).then(data=>{
    console.log(data)
    document.getElementById("kerdes").innerHTML=data[0].kerdes;
    document.getElementById("avalasz").innerHTML=data[0].valasz2;
    document.getElementById("bvalasz").innerHTML=data[0].helyesValasz;
    document.getElementById("cvalasz").innerHTML=data[0].valasz4;
    document.getElementById("dvalasz").innerHTML=data[0].valasz3;
})