const button = document.querySelector('button');
const body = document.querySelector('body');
var colours = ['blue', 'green', 'red', 'yellow'];

body.style.backgroundColor = 'black';
button.addEventListener('click', handleFun);

function handleFun(){
    const colorIndex= parseInt(Math.random()*colours.length)
    body.style.backgroundColor = colours[colorIndex]   
};