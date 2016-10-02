var backgroundPage;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.runtime.getBackgroundPage(function(bg){
	backgroundPage = bg;
});
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log("entered!");
    console.log(backgroundPage.sessionDataHTML);
    var newDoc = document.implementation.createHTMLDocument("temp");
    newDoc.body.innerHTML = backgroundPage.sessionDataHTML;
    console.log(newDoc);
    newDoc.getElementById("selected_value_text_area").innerText = request.selected_value;
    newDoc.getElementById("url_text_area").innerText = sender.tab.url;
    newDoc.getElementById("xpath_text_area").innerText = request.selected_xpath.replace("crx_mouse_visited", "");
    console.log(request.selected_xpath);
    backgroundPage.sessionDataHTML = newDoc.body.innerHTML;
    //backgroundPage.document.getElementById("selected_value_text_area").innerText = request.selected_value;
});