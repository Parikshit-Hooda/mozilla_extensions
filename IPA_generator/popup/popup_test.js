console.log('popup_test.js access successful'); //popup_test.js check

// function resultIPAObjLogger(testString){
//   console.log("getAllIPA callback function result logger function");
// }

function getPronunciation(htmlDoc, lang){
  console.log("popup_test.js getPronunciation fn - language:" + lang);
  console.log("htmlDoc in getPronunciation function " + htmlDoc);
  var startIdx;
  var endIdx;
  var resIPA;
  var testvar;
  if (lang == "fr")
  {
        startIdx = htmlDoc.indexOf("Prononciation API");
        startIdx = startIdx + 19; //success
        endIdx = htmlDoc.indexOf("<", startIdx); //success
      }
  else if (lang == "en")
  {
      startIdx = htmlDoc.indexOf("Appendix:English pronunciation");
      startIdx = startIdx + 70; //success
      endIdx = htmlDoc.indexOf("<", startIdx); //success

      }
  else
  {
    startIdx = 0;
    endIdx = 0;
    console.log("invalid language");
  }
  // endIdx = startIdx + 3;
  console.log(startIdx + " " + endIdx);
  console.log(htmlDoc.substring(startIdx, endIdx)); // success!!
  // resIpa = htmlDoc.substring(startIdx, endIdx);
  console.log("getpronunciation function: " + htmlDoc.substring(startIdx, endIdx));
  // for example, \zhe\ <- startIdx gets index of first '\' and endIdx gets index of second '\';
  // var getProunciationResult = htmlDoc.substring(startIdx, endIdx-startIdx);
  return htmlDoc.substring(startIdx, endIdx);
}

function httpGetAsync(theUrl, lang, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log("httpGetAsync if block");
            // var resPronunciation = getPronunciation(String(xmlHttp.responseText));
            // console.log("Content_script1.js calling from if of httGetAsync function");
            console.log(xmlHttp.responseText);
            // console.log("response type: " + xmlHttp.responseType);
            var htmlDoc = xmlHttp.responseText;
            console.log("htmlDoc console log " + htmlDoc);
            var resIPAWord = getPronunciation(htmlDoc, lang);;
            // console.log(resIPAWord);
            callback(resIPAWord);
          } else {
            console.log("Content_script1.js calling from else of httGetAsync function notFound");

            callback("notFound");
          }

    }
    xmlHttp.open("GET", theUrl, true);

    xmlHttp.send(null);
}

function getAllIPA(lang, wordArr, wordsIPAObj, callbackFn) {
  // console.log(wordArr.join());
  if (lang == "en") {
    // console.log("in lang: " + lang); //correct
    wordArr.forEach((item, i) => {
    // console.log("popup_test1.js: getAllIPA fn log - english language");
      httpGetAsync(`https://${lang}.wiktionary.org/wiki/${item}`, lang, function(response){
        // console.log("rcTextWords.forEach loop " + response); //success!
        wordsIPAObj[item] = response;
        console.log(lang + " word IPA call test.");
        // console.log(response);
      });
  });
  } else if (lang == "fr") {
    // console.log("in lang: " + lang); //correct
    wordArr.forEach((item, i) => {
    // console.log("popup_test1.js: getAllIPA fn log - french language");
    httpGetAsync(`https://${lang}.wiktionary.org/wiki/${item}`, lang, function(response){
      // console.log("rcTextWords.forEach loop " + response); //success!
      wordsIPAObj[item] = response;
      // console.log(lang + " word IPA call test.");
      // console.log(response);
  });
  });
  } else {
    wordArr.forEach((item, i) => {
      wordsIPAObj[item] = "";
  });
    console.log("popup_test1.js: getAllIPA fn log - invalid language");
  }

  callbackFn();

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


document.getElementById('showipabtn').addEventListener("click", function() {
  //show IPA
  // console.log("show ipa button clicked");
  console.log("show IPA Button clicked:" + srcTextWords);
});


document.getElementById('findipabtn').addEventListener("click", function() {
  //find IPA
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
      if (resObj["i9-aria-selected"] == "true") {
        selectedSrcLang = resObj["i9-data-language-code"];
      } else if (resObj["i10-aria-selected"] == "true") {
        selectedSrcLang = resObj["i10-data-language-code"];
      } else if (resObj["i11-aria-selected"] == "true") {
        selectedSrcLang = resObj["i11-data-language-code"];
      } else {
        selectedSrcLang = "notFoundSrcLang";
      }

      if (resObj["i12-aria-selected"] == "true") {
        selectedTgtLang = resObj["i12-data-language-code"];
      } else if (resObj["i13-aria-selected"] == "true") {
        selectedTgtLang = resObj["i13-data-language-code"];
      } else if (resObj["i14-aria-selected"] == "true") {
        selectedTgtLang = resObj["i14-data-language-code"];
      } else {
        selectedTgtLang = "notFoundTgtLang";
      }

      console.log("Content_Scritp1.js srcText = " + srcText);
      console.log("Content_Scritp1.js tgtText = " + tgtText);

      console.log("Content_Scritp1.js selectedSrcLang = " + selectedSrcLang);
      console.log("Content_Scritp1.js selectedTgtLang = " + selectedTgtLang);

      if((selectedSrcLang != ("en" || "fr")) && (selectedTgtLang != ("en" || "fr"))) {
        document.getElementById("srcLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose english or french for the time being.</span>";
        document.getElementById("tgtLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose en or fr.";
      } else {

        srcText.toLowerCase();
        tgtText.toLowerCase();

        //implement word level API calls for source and target data and display in extension.
        srcTextWords = srcText.match(/\b(\w+)\b/g);
        tgtTextWords = tgtText.match(/\b(\w+)\b/g);

        console.log("srcTextWords " + srcTextWords);
        console.log("tgtTextWords " + tgtTextWords);

        // console.log("selectedSrcLang: " + selectedSrcLang); //correct
        // console.log("selectedTgtLang: " + selectedTgtLang); //correct

        // increase modularity: make a function to get all IPAs. Declaration: getAllIPA(selectedSrcLang, srcTextWords, srcWordsIPA) <- for source textContent
        // getAllIPA(selectedTgtLang, tgtTextWords, tgtWordsIPA) <- for target

        getAllIPA(selectedSrcLang, srcTextWords, srcWordsIPA);
        getAllIPA(selectedTgtLang, tgtTextWords, tgtWordsIPA);



        //Here,call another function that puts the above IPA details in the popup_test.html.
        //Run the function after IPA objects are populated fully.


        // console.log("srcWordsIPA object length" + Object.keys(srcWordsIPA).length);
        // console.log("srcWordsIPA object: " + JSON.stringify({srcWordsIPA}));


      //function getAllIPA(lang, wordArr, wordsIPAObj)


      }
      // console.log("srcWordsIPA object : " + JSON.stringify(srcWordsIPA));
      ///function to split string into words: var a = srcText.match(/\b(\w+)\b/g)
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
