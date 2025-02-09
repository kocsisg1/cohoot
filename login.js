loginbutton.addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch(`https://localhost:44331/api/Login/GetSalt/${username}`, {
        method: "POST",
    }).then(res => {
        return res.text()
        
    }).then(data => {
        tryLogin(username, password, data)
    });

} );


async function tryLogin(username, password, salt){

    var hashedPw = await sha256(salt + password);

    fetch(`https://localhost:44331/api/Login`, {
        headers: {
            "Content-Type": "application/json",
          },
        method: "POST",
        body: JSON.stringify({ loginName: username, tmpHash: hashedPw }),
    }).then(res => {
        if(res.status == 200){
            window.location.replace("./main.html");
        }      
    });
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
