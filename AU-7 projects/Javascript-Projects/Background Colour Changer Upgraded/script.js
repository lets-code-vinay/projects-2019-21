const button = document.querySelector('button');
const body = document.querySelector('body');

button.addEventListener('click', handleFun);

function handleFun(){
    body.style.backgroundColor = document.getElementById("myInput").value;
};