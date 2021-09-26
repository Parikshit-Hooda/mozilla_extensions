    var teststr =
    document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;

    // var sendSrcString =
    browser.runtime.onMessage.addListener(request => {
      console.log("Message recieved from popup_test.js script");
      console.log(request.messageContent);
      return Promise.resolve({response: "Hi from content script"});
    });
