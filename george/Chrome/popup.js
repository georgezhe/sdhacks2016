
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
  document.getElementById('select_button').onclick = toggleSelection;
  document.getElementById('notify_button').onclick = startNotificaiton;

    var button = document.getElementById('select_button');
    function toggleSelection() {
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

function startNotificaiton() {
  var value = document.getElementById('selected_value_text_area').innerText;
  var url = document.getElementById('url_text_area').innerText;
  var xpath = document.getElementById('xpath_text_area').innerText;
  var email = document.getElementById('email_text_area').innerText;
  var upper_bound = document.getElementById('upper_bound_text_area').innerText;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:3000");
  xmlhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xmlhttp.send("email = " + value +
               ", url = " + url + 
               ", xpath = " + xpath + 
               ", value = " + value +
               "upper_bound = " + upper_bound);
}