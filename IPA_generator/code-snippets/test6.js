function getPronunciation(htmlDoc, lang){
  console.log(htmlDoc);
    console.log("popup_test.js getPronunciation fn - language:" + lang);
    // console.log("htmlDoc in getPronunciation function " + htmlDoc);
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

  return new Promise(function(resolve, reject){
    resolve(htmlDoc.substring(startIdx, endIdx));
  });
}

function getPronunciation_promise(lang, word) {
  // var htmlResponse =
  return new Promise(function(resolve, reject){
  fetch(`https://fr.wiktionary.org/wiki/bonjour`)
.then(response => response.text())
.then(text => {
  var x = text;
  // console.log("text: " + text);
  // console.log(item + " " + text);
  // console.log(text);
  return getPronunciation(x, "fr");  })
  .then(res => {
    // console.log("res: " + res);
    resolve(res);
  })
  .catch(err => {
    console.log("err: " + err);
  reject("word not found");
// resolve(text);
});

});

}

getPronunciation_promise("fr", "bonjour");
