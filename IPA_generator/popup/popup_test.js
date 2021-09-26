console.log('popup_test.js access successful'); //popup_test.js check


// to inject -content_Script1 and only inject in targetted website.
browser.tabs.query({currentWindow: true, active: true}, tabs => {
    var url = tabs[0].url;
    var googleTranslateRegex = new RegExp('htt(p|ps):\/\/translate\.google\.[a-z]+');

    console.log(url);
    if(googleTranslateRegex.test(url)) { //is block works

      function onExecuted(result) {
        console.log(`content_script1 injected`); //successfully loaded
      }

      function onError(error) {
        console.log(`Error: ${error}`);
      }

      const executing = browser.tabs.executeScript({
        file: "/content_script1.js"
      });
      executing.then(onExecuted, onError); //successfuly resolution


    } else { //this else block works
      document.body.innerHTML = '';
      // document.body.innerHTML("<span>This extension works on Google Translate website on Mozilla Firefox(currently).</span>")
      console.log("url not appropriate. please use google translate.")
      let div = document.createElement('div');
      div.innerHTML = "<span>This extension works on Google Translate website on Mozilla Firefox(currently).</span>";
      document.body.append(div);
    }
});

document.getElementById('findipabtn').addEventListener("click", function() {
  // document.getElementById('tl_p').innerHTML = "Target Language: Fr"; // successful - changes element innerHTML as simple test of event catching


  //1. send message to content script
  function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
for (let tab of tabs) {
  browser.tabs.sendMessage(
    tab.id,
    {messageContent: "Find IPA button clicked"} //successfully received by content_script1.js
  ).then(response => {
    console.log("popup_test.js - Message received from the content script"); //successful log
    // console.log(response.response);
    if(response.messageType == 1) {
      console.log("popup_test.js - source text recieved: " + response.sourceText);
      console.log("popup_test.js - target text recieved: " + response.targetText);
    } else if (response.messageType == 0) {
      console.log("popup_test.js - Invalid message type. Please send proper information.");
    } else {
      console.log("popup_test.js - Message type for Find IPA button clicked event invalid");
    }
  }).catch(onError);
}
}

  browser.tabs.query({
  currentWindow: true,
  active: true
}).then(sendMessageToTabs).catch(onError);



  //2. accept response contatining information about present state of Google Translate website. i.e., current source and target language,
  // current text in source and target panel
  //3. process response

});
  // document.body.style.color = "5px solid red";

  // browser.runtime.sendMessage()
