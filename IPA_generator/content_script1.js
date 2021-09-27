// var sourceText =
// document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
//
function getStateAtLargeWidth() {
  //first check for screen size
  var resultState = {};
  //fact recognized - for > 720px innerWidth, the three tab layout manifests

  //use window.innerWidth || document.documentElement || document.documentElement('body')[0].clientHeight
  var webPageWidth = (window.innerWidth || document.documentElement.clientWidth || document.documentElement('body')[0].clientHeight);
  console.log("content_script1.js webPageWidth " + webPageWidth); //web page width fetch successful

  if(webPageWidth>=720) {

    console.log("called when screen width >= 720 px");

  resultState["pageWidthFlag"] = "1"; //flag to identify current page width

  //      below object fields get information for left panel on Google Translate
  resultState["i8-aria-selected"] = document.getElementById("i8").getAttribute("aria-selected");
  resultState["i8-tabIndex"] = document.getElementById("i8").getAttribute("tabIndex");
  resultState["i8-data-language-code"] = document.getElementById("i8").getAttribute("data-language-code");

  resultState["i9-aria-selected"] = document.getElementById("i9").getAttribute("aria-selected");
  resultState["i9-tabIndex"] = document.getElementById("i9").getAttribute("tabIndex");
  resultState["i9-data-language-code"] = document.getElementById("i9").getAttribute("data-language-code");

  resultState["i10-aria-selected"] = document.getElementById("i10").getAttribute("aria-selected");
  resultState["i10-tabIndex"] = document.getElementById("i10").getAttribute("tabIndex");
  resultState["i10-data-language-code"] = document.getElementById("i10").getAttribute("data-language-code");

  resultState["i11-aria-selected"] = document.getElementById("i11").getAttribute("aria-selected");
  resultState["i11-tabIndex"] = document.getElementById("i11").getAttribute("tabIndex");
  resultState["i11-data-language-code"] = document.getElementById("i11").getAttribute("data-language-code");
//      below object fields get information for right panel on Google Translate

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

  return resultState;

}

// var sendSrcString =
browser.runtime.onMessage.addListener(request => {

  console.log("content_script1.js - Message received from popup_test.js script"); //successful log
  console.log("content_script1.js - " + request.messageContent); //log success

  var messageType;
  var sourceText = "-"
  var targetText = "-";
  if(request.messageContent == "Find IPA button clicked") {
    messageType = 1;
    //find current Google Translate state
    var sourceText =
    document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
    var targetText = document.querySelector('[lang="fr"]').childNodes[0].innerText;

    console.log("content_Script1.js - messageType = 1 if block executed");

    //call function to get current Google Translate state. Check window screen size. below state

    //'getting' works only for large width
    var getStateAtLargeWidthResult = getStateAtLargeWidth();

    //add source and target text details to the above object
    getStateAtLargeWidthResult["sourceText"] = document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
    getStateAtLargeWidthResult["targetText"] = document.querySelector('[lang="fr"]').childNodes[0].innerText;



    console.log("content_script1.js getStateAtLargeWidthResult " + JSON.stringify(getStateAtLargeWidthResult)); //to check the content of getStateAtLargeWidthResult variable

    //TODO: add for stateAtMediumWidth and stateAtSmallWidth



  } else {
    messageType = 0;
    sourceText = "invalid";
    targetText = "invalid";
    console.log("content_Script1.js - messageType = 0 else block executed");

  }

  return Promise.resolve({response: "From content script", messageType: messageType, sourceText: sourceText, targetText: targetText}); //successful resolution
});
