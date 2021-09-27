    // var sourceText =
    // document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
    //
    function getStateAtLargeWidth() {
      //first check for screen size

      //fact recognized - for > 720px innerWidth, the three tab layout manifests

      //use window.innerWidth || document.documentElement || document.documentElement('body')[0].clientHeight
      console.log("content_script1.js window screen innerWidth " + (window.innerWidth || document.documentElement.clientWidth || document.documentElement('body')[0].clientHeight)); //web page width fetch successful
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
        getStateAtLargeWidth();

        //add for stateAtMediumWidth and stateAtSmallWidth



      } else {
        messageType = 0;
        sourceText = "invalid";
        targetText = "invalid;"
        console.log("content_Script1.js - messageType = 0 else block executed");

      }

      return Promise.resolve({response: "From content script", messageType: messageType, sourceText: sourceText, targetText: targetText}); //successful resolution
    });
