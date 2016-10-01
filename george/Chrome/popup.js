window.onload = function(){
	console.log("asdf");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3000");
	xmlhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
	xmlhttp.send("asdf=ddd");


}