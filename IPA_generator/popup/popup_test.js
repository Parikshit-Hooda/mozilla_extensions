// browser.browserAction.onClicked.addListener(handleClick);

//find current tab url address

function injectContentScript(decisionCS){
  if(decisionCS === "injectCS"){
    //////////////////////////////
            function onExecuted(result) {
          console.log(`content_script1 injected`);
        }

        function onError(error) {
          console.log('content_script1 not injected');
        }

        const executing = browser.tabs.executeScript({
          file: "/content_script1.js"
        });
        executing.then(onExecuted, onError);

    /////////////////////////////
  } else if (decisionCS === "dontInjectCS") {

  }
}

function onSuccess(tabs)) {
  console.log('manifest_version popup.js - success current tab is Google Translate');
  document.getElementById('tl_p').innerHTML = "Target Language: Fr";
  injectContentScript("injectCS");
}

function onError(error) {
  // console.log(`Error: ${error}`);
  injectContentScript("dontInjectCS");
}

// function handleClick(){

  let querying = browser.tabs.query({currentWindow: true, active: true, url: "*://translate.google.com/*"});
  querying.then(onSuccess, onError);

  // const windowhref = browser.tabs.getCurrent;
  // var gTranslateRegex = new Regex('*://translate.google.com/*');
  // if(gTranslateRegex.test(windowhref)){
  //     document.getElementById('tl_p').innerHTML = "Target Language: Fr";
  // } else {
  //   console.log('invalid url')
// };
// };
//
// function onExecuted(result) {
//   console.log(`content_script1 inserted`);
// }
//
// function onError(error) {
//   console.log(`Error: ${error}`);
// }
//
// const executing = browser.tabs.executeScript({
//   file: "/content-script1.js"
// });
// executing.then(onExecuted, onError);
//
// document.getElementById('findipabtn').addEventListener("click", function(e){
//   var ipadiv = document.getElementById("findipadiv");
//   ipadiv.appendchild("<span>button clicked</span>");
// })

// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
// });

//
// document.getElementById('findipabtn').addEventListener("click", function() {
//   document.getElementById('tl_p').innerHTML = "Target Language: Fr";
//
//   document.body.style.color = "5px solid red";
//
//   browser.runtime.sendMessage()
