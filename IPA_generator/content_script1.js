function handleResSrcString(message) {
  console.log('message from popup: ' ${message});
}

function handleErrSrcString(error) {
  console.log('message from popup:' ${error});
}

    var teststr =
    document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
    var sendSrcString = browser.runtime.sendMessage({
      srcString: teststr
    });

    console.log('teststr');

    sendSrcString.then(handleResSrcString, handleErrSrcString)



    // console.log(teststr);

    // document.getelementbyid('tesid').innertext = teststr;

// (function() {
//     if (window.hasRun) {
//         return;
//     }
//     window.hasRun = true;

    // document.body.style.border = "5px solid red";
// console.log('content script loaded')
    // browser.runtime.onMessage.addListener(notify);
    // function notify(message){
    //     alert(message.record);
    // }

//     function handleResponse(message) {
//   console.log(`Message from the background script:  ${message.response}`);
// }
//
// function handleError(error) {
//   console.log(`Error: ${error}`);
// }
//
//
// function send_2_popup() {
//     var sending = browser.runtime.sendMessage({
//     greeting: "Greeting from the content script"
//     });
//     sending.then(handleResponse, handleError);
// }
//
//
// var btn = document.getElementById("btn");
// btn.addEventListener("click", send_2_popup);
//
//     var teststr =
//     document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;

    // console.log(teststr);

    // document.getelementbyid('tesid').innertext = teststr;
// })();

//
