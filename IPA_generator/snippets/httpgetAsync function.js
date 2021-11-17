// function httpGetAsync(theUrl, lang)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//           console.log("httpGetAsync if block");
//             // var resPronunciation = getPronunciation(String(xmlHttp.responseText));
//             // console.log("Content_script1.js calling from if of httGetAsync function");
//             console.log(xmlHttp.responseText);
//             // console.log("response type: " + xmlHttp.responseType);
//             var htmlDoc = xmlHttp.responseText;
//             console.log("htmlDoc console log " + htmlDoc);
//             var resIPAWord = getPronunciation(htmlDoc, lang);
//             // console.log(resIPAWord);
//             // callback(resIPAWord);
//           } else {
//             console.log("Content_script1.js calling from else of httGetAsync function notFound");
//
//             // callback("notFound");
//           }
//
//     }
//     xmlHttp.open("GET", theUrl, true);
//
//     xmlHttp.send(null);
// }
