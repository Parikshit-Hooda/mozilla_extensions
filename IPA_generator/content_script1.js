
function getSentence(lenSentenceNodes, nodeId) {
  let numNodes = lenSentenceNodes - 1;
  let resText = "";

  for(let i = 0 ; i < numNodes; i = i+1) {
    resText = resText + document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult[nodeId + "-data-language-code"] + "] > div > span > span > span")[i].textContent;
  }

  return resText;
  // document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i12-data-language-code"] + "] > div > span > span > span")[0].textContent;

  /*
  var tgtTextListLength = document.querySelectorAll("[data-language=fr] > div > span > span > span").length
  var tgtText = "";
  console.log(tgtTextListLength);
  for(var i = 0 ; i < tgtTextListLength; i = i+1) {
    tgtText = tgtText + document.querySelectorAll("[data-language=fr] > div > span > span > span")[i].textContent
  */
}

let getStateAtLargeWidthResult = {};

function getStateAtLargeWidth() {
  //first check for screen size
  let resultState = {};
  //fact recognized - for > 720px innerWidth, the three tab layout manifests

  //consider using window.innerWidth || document.documentElement || document.documentElement('body')[0].clientHeight
  const webPageWidth = (window.innerWidth || document.documentElement.clientWidth || document.documentElement('body')[0].clientHeight);
  console.log("content_script1.js webPageWidth " + webPageWidth); //web page width fetch successful

  if(webPageWidth>=720) {

    console.log("called when screen width >= 720 px");

    resultState["pageWidthFlag"] = "1"; //flag to identify current page width

    //      below object fields get information for left panel on Google Translate

    //-TODO : enhancement: for source language= "detect language" tab, use [data-language-code] = auto to find the correct button id first, then find values of attributes

    // resultState["i8-aria-selected"] = document.getElementById("i8").getAttribute("aria-selected");
    // resultState["i8-tabIndex"] = document.getElementById("i8").getAttribute("tabIndex");
    // resultState["i8-data-language-code"] = document.getElementById("i8").getAttribute("data-language-code");

    resultState["i9-aria-selected"] = document.getElementById("i9").getAttribute("aria-selected");
    resultState["i9-tabIndex"] = document.getElementById("i9").getAttribute("tabIndex");
    resultState["i9-data-language-code"] = document.getElementById("i9").getAttribute("data-language-code");

    resultState["i10-aria-selected"] = document.getElementById("i10").getAttribute("aria-selected");
    resultState["i10-tabIndex"] = document.getElementById("i10").getAttribute("tabIndex");
    resultState["i10-data-language-code"] = document.getElementById("i10").getAttribute("data-language-code");

    resultState["i11-aria-selected"] = document.getElementById("i11").getAttribute("aria-selected");
    resultState["i11-tabIndex"] = document.getElementById("i11").getAttribute("tabIndex");
    resultState["i11-data-language-code"] = document.getElementById("i11").getAttribute("data-language-code");

    //below object fields get information for right panel on Google Translate
    resultState["i12-aria-selected"] = document.getElementById("i12").getAttribute("aria-selected");
    resultState["i12-tabIndex"] = document.getElementById("i12").getAttribute("tabIndex");
    resultState["i12-data-language-code"] = document.getElementById("i12").getAttribute("data-language-code");

    resultState["i13-aria-selected"] = document.getElementById("i13").getAttribute("aria-selected");
    resultState["i13-tabIndex"] = document.getElementById("i13").getAttribute("tabIndex");
    resultState["i13-data-language-code"] = document.getElementById("i13").getAttribute("data-language-code");

    resultState["i14-aria-selected"] = document.getElementById("i14").getAttribute("aria-selected");
    resultState["i14-tabIndex"] = document.getElementById("i14").getAttribute("tabIndex");
    resultState["i14-data-language-code"] = document.getElementById("i14").getAttribute("data-language-code");

  }
  else {
    console.log("called when screen width < 720 px");
    resultState["pageWidthFlag"] = "0";
  }

  console.log("from getStateAtLargeWidth");
  console.log("logging resultState object" + JSON.stringify(resultState));

  return resultState;

}

browser.runtime.onMessage.addListener(request => {

  console.log("content_script1.js - Message received from popup_test.js script"); //successful log
  console.log("content_script1.js - " + request.messageContent); //log success

  let messageType;
  let sourceText = "";
  let targetText = "";

  if(request.messageContent == "Find IPA button clicked") {
    messageType = 1;
    //find current Google Translate site state

    console.log("content_Script1.js - messageType = 1 if block executed");

    //'getting' works only for large width as of now
    getStateAtLargeWidthResult = getStateAtLargeWidth();

    //var currentTarget;
    sourceText = document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML ;

    if (sourceText == "") { // if no source text, set empty strings
      getStateAtLargeWidthResult["sourceText"] = "";
      getStateAtLargeWidthResult["targetText"] = "";
      // console.log("Content_Script1.js calling from sourcetext == empty if block. source and target text string are empty.");
    } else {
    // console.log("sourceText variable populated.");
    getStateAtLargeWidthResult["sourceText"] = document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;

    if (getStateAtLargeWidthResult["i12-aria-selected"] == "true") {
      let sentenceElementsSize = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i12-data-language-code"] + "] > div > span > span > span").length;
      // targetText = getSentence(size, i12);
      // targetText = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i12-data-language-code"] + "] > div > span > span > span")[0].textContent;
      targetText = getSentence(sentenceElementsSize, "i12");
      // console.log(targetText);
    } else if (getStateAtLargeWidthResult["i13-aria-selected"] == "true") {

      let sentenceElementsSize = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i13-data-language-code"] + "] > div > span > span > span").length;
      // targetText = getSentence(size, i12);
      // targetText = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i12-data-language-code"] + "] > div > span > span > span")[0].textContent;
      targetText = getSentence(sentenceElementsSize, "i13");

      // targetText = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i13-data-language-code"] + "] > div > span > span > span")[0].textContent;
    } else if (getStateAtLargeWidthResult["i14-aria-selected"] == "true") {

      let sentenceElementsSize = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i14-data-language-code"] + "] > div > span > span > span").length;
      // targetText = getSentence(size, i12);
      // targetText = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i12-data-language-code"] + "] > div > span > span > span")[0].textContent;
      targetText = getSentence(sentenceElementsSize, "i14");

      // targetText = document.querySelectorAll("[data-language=" + getStateAtLargeWidthResult["i14-data-language-code"] + "] > div > span > span > span")[0].textContent;
    } else {
      targetText = "";
    }

    getStateAtLargeWidthResult["targetText"] = targetText;

    console.log("content_Script1.js source text " + sourceText);
    console.log("content_Script1.js target text " + targetText);

    console.log("content_script1.js getStateAtLargeWidthResult " + JSON.stringify(getStateAtLargeWidthResult)); //to check the content of getStateAtLargeWidthResult variable

    //TODO: add for stateAtMediumWidth and stateAtSmallWidth

  }


} else {
    messageType = 0;
    getStateAtLargeWidthResult["sourceText"] = "invalid";
    getStateAtLargeWidthResult["targetText"] = "invalid";
    console.log("content_Script1.js - messageType = 0 else block executed");

  }

  return Promise.resolve({response: "From content script", messageType: messageType, responseObj: getStateAtLargeWidthResult}); //successful resolution
});
