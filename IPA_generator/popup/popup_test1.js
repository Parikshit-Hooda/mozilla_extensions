// function findipabtnclicked(){
//   document.getElementById('tl_p').innerHTML = "Target Language: Fr";
// }
//
//

// function onGot(tabinfo) {
//   console.log(tabinfo);
//
//   if (tabinfo.url != "https://translate.google.com") {
//     var popuphead = document.getElementById("popupHeading");
//     popuphead.appendchild("<span>POPUP ONLY WORKS ON GOOGLE TRANSLATE");
//
//     document.body.innerHTML = "";
//
//
//   } else {
//     var popuphead = document.getElementById("popupHeading");
//     popuphead.appendchild("<span>POPUP WORKS HERE");
//   }
//
// }
//
// function onError(error) {
//   console.log(`Error: ${error}`);
// }
//
// const gettingCurrent = browser.tabs.getCurrent();
// gettingCurrent.then(onGot, onError);

console.log('popup_test1.js successful')
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
