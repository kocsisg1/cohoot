var currentData = null;

getNextQuestion()

agomb.addEventListener('click', function (e) {
    e.preventDefault();
    onAnswer(1);
} );

bgomb.addEventListener('click', function (e) {
    e.preventDefault();
    onAnswer(2);
} );

cgomb.addEventListener('click', function (e) {
    e.preventDefault();
    onAnswer(3);
} );

dgomb.addEventListener('click', function (e) {
    e.preventDefault();
    onAnswer(4);
} );


function onAnswer(answer){

    if(currentData != null){
        if(answer == currentData.helyes){
            console.log("lyó");
            //pontokat megadni
        }
        getNextQuestion();            
    }
}

function getNextQuestion(){
    fetch("https://localhost:44331/api/Quiz")
.then(res=>{
    console.log(res);
    
    return res.json()
}).then(data=>{
    console.log(data)
    currentData = data;
    document.getElementById("kerdes").innerHTML=data.kerdes;
    document.getElementById("avalasz").innerHTML=data.valasz1;
    document.getElementById("bvalasz").innerHTML=data.valasz2;
    document.getElementById("cvalasz").innerHTML=data.valasz3;
    document.getElementById("dvalasz").innerHTML=data.valasz4;
})
}
