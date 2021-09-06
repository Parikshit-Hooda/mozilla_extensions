
document.getElementById('findipabtn').addEventListener("click", function() {
  document.getElementById('tl_p').innerHTML = "Target Language: Fr";
  // browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // //       // query the active tab, which will be only one tab
  // //       //and inject the script in it
  browser.tabs.executeScript({
  file: "../content_script1.js"})
  .then(function () {
    console.log('popup_test.js findipabtn clicked');
    //
     // browser.tabs.sendMessage(current_tab, {button: "clicked"})

   });
  // .catch(console.error.bind(console));

});


function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
  request.greeting);
  // sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);
