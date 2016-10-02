<<<<<<< HEAD
window.onload = function(){
	console.log("asdf");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3000");
	xmlhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
	xmlhttp.send("asdf=ddd");
=======
// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
  //console.log("running");


chrome.runtime.getBackgroundPage(function(bg){
  var isSelecting = false;
  if(bg.sessionDataHTML){
    document.body.innerHTML = bg.sessionDataHTML;
    console.log(document); 
    if (document.getElementById('select_button').innerText == "Start Selecting!")
    {
      isSelecting = false;
    }
    else
    {
      isSelecting = true;
    }

  }
  setInterval(function(){
    bg.sessionDataHTML = document.body.innerHTML;
  },1000);    
  document.getElementById('select_button').onclick = doSomething;

    var button = document.getElementById('select_button');
    function doSomething() {
      console.log("hello world");
      if (isSelecting == true)
      {
        isSelecting = false;
        console.log(isSelecting);
        button.value = "Start Selecting!";
        button.innerText = "Start Selecting!";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {isSelecting: false}, function(response) {
          });});
      }
      else
      {
        isSelecting = true;
        console.log(isSelecting);
        button.value = "Stop Selecting.";
        button.innerText = "Stop Selecting.";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {isSelecting: true}, function(response) {
          });});
      }
    }
      });

>>>>>>> master


}