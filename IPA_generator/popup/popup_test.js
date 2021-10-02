console.log('popup_test.js access successful'); //popup_test.js check

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

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

    document.getElementById("srcLang_IPA").innerHTML = "IPA: <span>Loading...</span>";
    document.getElementById("tgtLang_IPA").innerHTML = "IPA: <span>Loading...</span>";

    var resObj = response.responseObj;

    console.log("popup_test.js - Message received from the content script"); //successful log
    // console.log(response.response);
    if(response.messageType == 1) {
      // console.log("popup_test.js - in response.messageType == 1 block.");
      // console.log("popup_test.js - response object " + JSON.stringify(response.responseObj)); // successufully received message object
      console.log("popup_Test.js messageType==1 if block. \n Response obj:" + JSON.stringify(resObj));

      var srcText = response.responseObj.sourceText;
      var tgtText = response.responseObj.targetText;
      var selectedSrcLang;
      var selectedTgtLang;
      var srcTextWords;
      var tgtTextWords;
      var srcWordsIPA = {};
      var tgtWordsIPA = {};

      //to find source and target language, do if-else on responseObj to find aria-selected=true,
      if (resObj["i9-aria-selected"] == true) {
        selectedSrcLang = resObj["i9-data-language-code"];
      } else if (resObj["i10-aria-selected"] == true) {
        selectedSrcLang = resObj["i10-data-language-code"];
      } else if (resObj["i11-aria-selected"] == true) {
        selectedSrcLang = resObj["i1-data-language-code"];
      } else {
        selectedSrcLang = "notFoundSrcLang";
      }

      if (resObj["i12-aria-selected"] == true) {
        selectedTgtLang = resObj["i12-data-language-code"];
      } else if (resObj["i13-aria-selected"] == true) {
        selectedTgtLang = resObj["i13-data-language-code"];
      } else if (resObj["i14-aria-selected"] == true) {
        selectedTgtLang = resObj["i4-data-language-code"];
      } else {
        selectedTgtLang = "notFoundTgtLang";
      }

      if((selectedSrcLang != ("en" || "fr")) && (selectedTgtLang != ("en" || "fr"))) {
        document.getElementById("srcLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose english or french for the time being.</span>";
        document.getElementById("tgtLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose english or french for the time being.";
      } else {
        //implementt word level API calls for source and target data and display in extension.
        srcTextWords = srcText.match(/\b(\w+)\b/g);
        tgtTextWords = tgtText.match(/\b(\w+)\b/g);

        //iterate through words arrays and make api calls to the endpoint and store the result in a key:value type object
        // srcTextWords.forEach((item, i) => {
        //   httpGetAsync(`https://${selectedSrcLang}.wiktionary.org/wiki/${item}`, function(response){
        //     console.log(selectedSrcLang + " word IPA call test");
        //     console.log(response);
        //   });
        // });

        // tgtTextWords.forEach((item, i) => {
        //   httpGetAsync(`https://${selectedSrcLang}.wiktionary.org/wiki/${item}`, function(response){
        //     console.log(selectedSrcLang + " word IPA call test");
        //     console.log(response);
        //   });
        //   // httpGetAsync("https://fr.wiktionary.org/wiki/attendu", function(response){
        //   //   console.log("French word IPA call test");
        //   //   console.log(response);
        //   // });
        // });

      }

      ///function to split string into words: var a = srcText.match(/\b(\w+)\b/g)

      // httpGetAsync("https://fr.wiktionary.org/wiki/attendu", function(response){
      //   console.log("French word IPA call test");
      //   console.log(response);
      // });


      // console.log("popup_test.js - source text recieved: " + response.sourceText);
      // console.log("popup_test.js - target text recieved: " + response.targetText);
    } else if (response.messageType == 0) {
      console.log("popup_test.js - invalid message.");
      // console.log("popup_test.js - Invalid message type. Please send proper information. Left panel text: " + response.responseObj.sourceText);
      // console.log("popup_test.js - Invalid message type. Please send proper information. Right panel text: " + response.responseObj.targetText);
    } else {
      console.log("popup_test.js - Message type for Find IPA button clicked event invalid.");
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
