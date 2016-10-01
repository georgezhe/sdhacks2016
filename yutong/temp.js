document.domain="google.com";

document.getElementById("button").addEventListener("click", function(){
	console.log(document.getElementById('frame').src);
	var string = document.getElementById('textBox').value;
	document.getElementById('frame').src = string;
});