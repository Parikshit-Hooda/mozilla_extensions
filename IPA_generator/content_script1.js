// var sourceText =
// document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
//
// function getStateAtLargeWidth() {
//   //first check for screen size
//   var resultState;
//   //fact recognized - for > 720px innerWidth, the three tab layout manifests
//
//   //use window.innerWidth || document.documentElement || document.documentElement('body')[0].clientHeight
//   var webPageWidth = (window.innerWidth || document.documentElement.clientWidth || document.documentElement('body')[0].clientHeight);
//   console.log("content_script1.js webPageWidth " + webPageWidth); //web page width fetch successful
//
//   if(webPageWidth>=720) {
//   resultState["pageWidthFlag"] = "1";
//   resultState["i8"]["aria-selected"] = document.getElementById("i8").getAttribute("aria-selected");
//   resultState["i8"]["tabIndex"] = document.getElementById("i8").getAttribute("tabIndex");
//   resultState["i8"]["data-language-code"] = document.getElementById("i8").getAttribute("data-language-code");/
//
//     //get state
//   }
//   else {
//     resultState["pageWidthFlag"] = "0";
//   }
//   return resultState;
//
// }

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
    // var getStateAtLargeWidthResult = getStateAtLargeWidth();
    // console.log("content_script1.js getStateAtLargeWidthResult " + getStateAtLargeWidthResult);
    //add for stateAtMediumWidth and stateAtSmallWidth



  } else {
    messageType = 0;
    sourceText = "invalid";
    targetText = "invalid";
    console.log("content_Script1.js - messageType = 0 else block executed");

  }

  return Promise.resolve({response: "From content script", messageType: messageType, sourceText: sourceText, targetText: targetText}); //successful resolution
});
