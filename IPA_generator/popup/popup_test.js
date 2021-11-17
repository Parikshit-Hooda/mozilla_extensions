console.log('popup_test.js access successful'); //popup_test.js check


function getIPAResultHTML(srcOrTgt, wordToIPAResObj) {

//populate html elements with id = srcLang_currSentence and srcLang_IPA. similarly for tgtLang_currSentence and tgtLang_IPA
  let result = {};
  console.log("in showIPAfunction: obj= " + JSON.stringify(wordToIPAResObj));
  let currSentenceHTML;
  let currIPAHTML;

  currSentenceHTML = "<span>Current sentence: ";
  currIPAHTML = "<span>IPA: ";
  for (let key in wordToIPAResObj) {
    if (wordToIPAResObj.hasOwnProperty(key))
        {
          currSentenceHTML = currSentenceHTML + "[ " + key + " ] ";
            // value = exampleObj[key];
            // console.log(key, value);
        }
  }
  for (let key in wordToIPAResObj) {
    if (wordToIPAResObj.hasOwnProperty(key))
        {
          currIPAHTML = currIPAHTML + "[ " + wordToIPAResObj[key] + " ] ";
            // value = exampleObj[key];
            // console.log(key, value);
        }
  }

  currSentenceHTML = currSentenceHTML + "</span>";
  console.log("currSentenceHTML = " + currSentenceHTML);

  currIPAHTML = currIPAHTML + "</span>";
  console.log("currIPAHTML = " + currIPAHTML);
  result.currentSentence = currSentenceHTML;
  result.currentIPA = currIPAHTML;

  console.log("result obj: " + JSON.stringify(result));
  // console.log("result object: " + result[currentSentence]);
  // console.log("result object: " + result[currentIPA]);
  return result;
}

function getPronunciation(htmlDoc, lang){
  let doc = new DOMParser().parseFromString(htmlDoc, 'text/html');
  let IPAElement;

  if(lang === "en") {
    IPAElement = doc.getElementsByClassName("IPA")[0];
  } else {
    IPAElement = doc.getElementsByClassName("API")[0];
  }
  console.log("IPAELEMENT: " + IPAElement.innerHTML);
  resultIPA = IPAElement.innerHTML;

  return new Promise(function(resolve, reject){
    resolve(resultIPA);

  });
}

function getPronunciation_promise(lang, item) {
  return new Promise(function(resolve, reject){
    let lcaseItem = item.toLowerCase();
    console.log("item: " + item);
    fetch(`https://${lang}.wiktionary.org/wiki/${lcaseItem}`)
      .then(response => response.text())
      .then(text => {
        let temp = text;
        return getPronunciation(temp, lang);
      })
      .then(res => {
        console.log("res: " + res); //result ok
        let editedResult;
        editedResult = res;

        console.log("editedResult: "+ editedResult);
        resolve(editedResult);
      })
      .catch(err => {
        console.log("getPronunciation_promise - err: " + err);
        reject("word not found");
// resolve(text);
      });
    });
}


function getAllIPA_promise(lang, wordArr, wordsIPAObj) {
  // console.log("getAllIPA_promise: " + typeof wordArr);
  // console.log("getAllIPA_promise: " + wordArr);
  let resolvedObj = {};
  console.log(lang);
  let promises = [];
  if(lang == "en" || lang == "fr") {
    wordArr.forEach((item, i) => {
      // console.log("getAllIPA_Promise: word - " + item);
      let currPromise = getPronunciation_promise(lang, item);
      promises.push(currPromise);
    });
  } else {
    let notSupportedLangPromise = new Promise(function(resolve, reject){
      reject({status:0, message: "languageNotSupported"});
    });
    promises.push(notSupportedLangPromise);
  // );
  }
  console.log(lang + ": promises arr: " + JSON.stringify(promises));
   return new Promise(function(resolve, reject){
      Promise.all(promises).then(response => {
        // console.log("response: " + typeof response); //object
        console.log("all promises resolved: " + JSON.stringify(response));
          // resolve(wordArr + response); //resolving this ways returns a string

//create a new object and resolve to it. key = word, value = IPA
          wordArr.forEach((item, i) => {
            resolvedObj[item] = response[i];
          });

          console.log("resolvedObj: " + resolvedObj);
          console.log("resolvedObj: " + JSON.stringify(resolvedObj));
            resolve(resolvedObj);
      })
      .catch(err => {
        console.log("error: " + err);
        reject(err);
      });
   });

}

// to inject -content_Script1 and only inject in targetted website.
browser.tabs.query({currentWindow: true, active: true}, tabs => {
    const url = tabs[0].url;
    const googleTranslateRegex = new RegExp('htt(p|ps):\/\/translate\.google\.[a-z]+');

    console.log(url);


    if(googleTranslateRegex.test(url)) { //is block works

      function onExecuted(result) {
        console.log(`content_script1 injected`); //successfully loaded
      }

      function onError(error) {
        console.log(`Error: ${error}`);
      }

      let executing = browser.tabs.executeScript({
        file: "/content_script1.js"
      });
      executing.then(onExecuted, onError); //successfuly resolution


    } else { //this else block works
      document.body.innerHTML = '';
      // document.body.innerHTML("<span>This extension works on Google Translate website on Mozilla Firefox(currently).</span>")
      console.log("url not appropriate. please use google translate.")
      let divEle = document.createElement('div');
      divEle.innerHTML = "<span>This extension works on Google Translate website on Mozilla Firefox(currently).</span>";
      document.body.append(divEle);
    }
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

    let resObj = response.responseObj;

    console.log("popup_test.js - Message received from the content script"); //successful log
    // console.log(response.response);
    if(response.messageType == 1) {
      // console.log("popup_test.js - in response.messageType == 1 block.");
      // console.log("popup_test.js - response object " + JSON.stringify(response.responseObj)); // successufully received message object
      console.log("popup_Test.s messageType==1 if block. \n Response obj:" + JSON.stringify(resObj));

      let srcText = response.responseObj.sourceText;
      let tgtText = response.responseObj.targetText;
      let selectedSrcLang;
      let selectedTgtLang;
      let srcTextWords;
      let tgtTextWords;
      let srcWordsIPA = {};
      let tgtWordsIPA = {};

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

      console.log("Content_Script1.js srcText = " + srcText);
      console.log("Content_Script1.js tgtText = " + tgtText);

      console.log("Content_Script1.js selectedSrcLang = " + selectedSrcLang);
      console.log("Content_Script1.js selectedTgtLang = " + selectedTgtLang);

      if((selectedSrcLang != ("en" || "fr")) && (selectedTgtLang != ("en" || "fr"))) {
        document.getElementById("srcLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose english or french for the time being.</span>";
        document.getElementById("tgtLang_IPA").innerHTML = "IPA: <span>Sorry. Language not recognized. Choose english or french for the time being.</span>";
      } else {

        srcText.toLowerCase();
        tgtText.toLowerCase();

        //implement word level API calls for source and target data and display in extension.
        // srcTextWords = srcText.match(/\b(\w+)\b/g);
        // tgtTextWords = tgtText.match(/\b(\w+)\b/g);
        // ^[a-zàâçéèêëîïôûùüÿñæœ ]*$
        // srcTextWords = srcText.match(/\b([a-zA-ZÀ-ÿ]+)\b/g);
        // tgtTextWords = tgtText.match(/\b([a-zA-ZÀ-ÿ]+)\b/g);
        // /\b([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)\b/g
        srcTextWords = srcText.match(/([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)/g);
        tgtTextWords = tgtText.match(/([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)/g);
        // console.log(typeof srcTextWords); //object
        console.log("srcTextWords " + srcTextWords); //ok
        console.log("tgtTextWords " + tgtTextWords); //ok

        // console.log("selectedSrcLang: " + selectedSrcLang); //correct
        // console.log("selectedTgtLang: " + selectedTgtLang); //correct

        // increase modularity: make a function to get all IPAs. Declaration: getAllIPA(selectedSrcLang, srcTextWords, srcWordsIPA) <- for source textContent
        // getAllIPA(selectedTgtLang, tgtTextWords, tgtWordsIPA) <- for target

        // getAllIPA(selectedSrcLang, srcTextWords, srcWordsIPA);
        // getAllIPA(selectedTgtLang, tgtTextWords, tgtWordsIPA);
        getAllIPA_promise(selectedSrcLang, srcTextWords, srcWordsIPA)
        .then(response => {
          console.log("json stringify: " + JSON.stringify(response));

          // console.log("getAllIPA_promise fn call - response: " + typeof response);
          // console.log("getAllIPA_promise for src .then: obj size - " + typeof Object.keys(response).length);
          //call function to populate results in popup_test.html
          let IPAResultHTML = getIPAResultHTML("src", response);
          // document.getElementById("srcLang_IPA").innerHTML = IPAResultHTML;
          document.getElementById("srcLang_currSentence").innerHTML = IPAResultHTML["currentSentence"];
          document.getElementById("srcLang_IPA").innerHTML = IPAResultHTML["currentIPA"];
          document.getElementById("srcLang_SubHead").innerHTML = `Source Language: ${selectedSrcLang}`;
        })
        .catch(err => {
          console.log("error for src in getAllIPA_promise function call: " + JSON.stringify(err));
          //populate popup_test.html with results
          //call function to populate results in popup_test.html
          document.getElementById("srcLang_IPA").innerHTML = "IPA: Some error occured. Try again with proper words in either English or French";
        });

        getAllIPA_promise(selectedTgtLang, tgtTextWords, tgtWordsIPA)
        .then(response => {
          console.log("json stringify: " + JSON.stringify(response));
          console.log("getAllIPA_promise fn call - response: " + typeof response);
          // console.log("getAllIPA_promise for tgt .then: obj size - " + typeof Object.keys(response).length);
          //call function to populate results in popup_test.html
          let IPAResultHTML = getIPAResultHTML("tgt", response);

          document.getElementById("tgtLang_currSentence").innerHTML = IPAResultHTML["currentSentence"];
          document.getElementById("tgtLang_IPA").innerHTML = IPAResultHTML["currentIPA"];
          document.getElementById("tgtLang_SubHead").innerHTML = `Target Language: ${selectedTgtLang}`;

        })
        .catch(err => {
          console.log("error for tgt in getAllIPA_promise function call: " + JSON.stringify(err));
          //populate popup_test.html with results
          //call function to populate results in popup_test.html
          document.getElementById("tgtLang_IPA").innerHTML = "IPA: Some error occured. Try again with proper words in either English or French";

        });


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
