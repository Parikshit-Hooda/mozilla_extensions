function getPronunciation(htmlDoc, lang){
  console.log("popup_test.js getPronunciation fn - language:" + lang);
  console.log("htmlDoc in getPronunciation function " + htmlDoc);
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
  return htmlDoc.substring(startIdx, endIdx);
}


function getIPA_promise(lang, item) {
  return new Promise(function(resolve, reject){
    fetch(`https://${lang}.wiktionary.org/wiki/${item}`)
  .then(response => response.text())
  .then(text => {
 resolve(text);
})
.catch(err => {
  reject("word not found");
});
});
}

var wordsIPAObj = {};
function test(wordsIPAObj){
var promises = [];
  ["hello", "son"].forEach((item, i) => {
    var ex = getIPA_promise("en", item);

      promises.push(ex);

    }); //promises.push closing bracket

    Promise.all(promises)
    .then(res => {
      res.forEach((body, idx) => {
        var resIPAWord = getPronunciation(body, "en");
      });
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    }

    test(wordsIPAObj);
