function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log("httpGetAsync if block");
            // var resPronunciation = getPronunciation(String(xmlHttp.responseText));
            // console.log("Content_script1.js calling from httGetAsync function " + resPronunciation);
            // console.log("xmlHttp.responseText" + xmlHttp.responseText);
            var xy = xmlHttp.responseText;
            console.log("responsetype: " + xmlHttp.responseType);
//             console.log(xy);
//             xy.getElementByTagName('span');
//             console.log(xy["*"]);
            // console.log("xy " + xy);
            // console.log("xy.type " + xy.type);
            // console.log("xmlHttp.type " + xmlHttp.type);
            // console.log("xmlHttp.responseText.type" + xmlHttp.responseText.type);
            //var yz = xy.querySelector('[title="Pronociation API"]')
            callback(xy);
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

 httpGetAsync("https://fr.wiktionary.org/wiki/bonjour", function(response){
   var abc = response;
   console.log(response.type);
   console.log("reponse " + response)
   console.log("French word IPA call test");
   //console.log(response);
 });
