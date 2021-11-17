function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}


httpGetAsync("https://fr.wiktionary.org/wiki/attendu", function(response){
  console.log("French word IPA call test");
  console.log(response);
});

httpGetAsync("https://en.wiktionary.org/wiki/hello", function(response){
  console.log("English word IPA call test");
  console.log(response);
});
