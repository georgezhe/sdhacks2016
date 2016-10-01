window.onload = function(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:8080");
  xmlhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xmlhttp.send("asdf=ddd");
}