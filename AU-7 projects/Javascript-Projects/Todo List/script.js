function toDoList() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("listItem").appendChild(li);
    document.getElementById("listItem").appendChild(li).className = "single";
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("li");
  var txt = document.createTextNode("❌");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.id = "closeId";

  var span1 = document.createElement("li");
  var txt1 = document.createTextNode("✔️");
  span1.className = "add";
  span1.appendChild(txt1);
  li.appendChild(span1);
  span1.id = "addId";

  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }

  var done =  document.getElementsByClassName('add');
  var i;
  for (i = 0; i < done.length; i++) {
    done[i].onclick = function () {
      var div2 = this.parentElement;
      var toogleD = div2.style.textDecoration = "line-through";
    }
  }
}


function removeAll() {
  document.getElementById("listItem").innerHTML = "";
}





// function editItem(){
//   var itemedit = document.getElementsByClassName('single')
// }

// var editList = document.getElementsByClassName('single');
// for (var i = 0; i < editList.length; i++) {
//   editList[i].onclick = function () {
//     var p = prompt("Edit your entry");
//     li.innerText = p;
//    }
//   }
