function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log("httpGetAsync if block");
            // var resPronunciation = getPronunciation(String(xmlHttp.responseText));
            // console.log("Content_script1.js calling from httGetAsync function " + resPronunciation);
            var htmlDoc = xmlHttp.responseText;
            var startIdx;
            var endIdx;
            startIdx = htmlDoc.indexOf("Prononciation API");

            startIdx = startIdx + 19;
            endIdx = htmlDoc.indexOf("<", startIdx);
            // endIdx = startIdx + 3;
            console.log(startIdx + " " + endIdx);
            console.log(htmlDoc.substring(startIdx, endIdx)); // success!!
            console.log("xmlHttp.responseText" + xmlHttp.responseText);
            console.log(xmlHttp.responseType);
            var resText = xmlHttp.responseText;
            // console.log(xmlHttp.responseText);
            callback("xmlHttp.responseText");

            // var startIdx;
            // var endIdx;
            // startIdx = htmlDoc.indexOf("Prononciation API");
            // startIdx = startIdx + 3;
            // endIdx = htmlDoc.indexOf("\\", startIdx + 1);
            // // for example, \zhe\ <- startIdx gets index of first '\' and endIdx gets index of second '\';
            // var getProunciationResult = htmlDoc.substring(startIdx, endIdx-startIdx);
            // console.log(xy["*"]);
            // console.log("xy " + xy);
            // console.log("xy.type " + xy.type);
            // console.log("xmlHttp.type " + xmlHttp.type);
            // console.log("xmlHttp.responseText.type" + xmlHttp.responseText.type);
            //var yz = xy.querySelector('[title="Pronociation API"]')
          } else {
            console.log("Content_script1.js calling from httGetAsync function notFound");

            callback("notFound");
          }

    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    // xmlHttp.setRequestHeader("Origin", "about:devtools-toolbox");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET");

    xmlHttp.send(null);
}


// https://fr.wiktionary.org/wiki/<word>
//http://fr.wiktionary.org/wiki/<word>
// https://en.wiktionary.org/wiki/<word>
//http://en.wiktionary.org/wiki/<word>
//https://fr.wiktionary.org/w/api.php?action=query&titles=attendu&prop=revisions&rvprop=content&rvgeneratexml=&format=json
 httpGetAsync("https://fr.wiktionary.org/wiki/bonjour", function(response){
   console.log("French word IPA call test");
   //console.log(response);
 });
