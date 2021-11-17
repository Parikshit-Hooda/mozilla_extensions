fetch("https://en.wiktionary.org/wiki/a").then(res => res.text())
.then(htmlString = {
  let el = document.createElement( 'html' );
  el.innerHTML = htmlString;
});



fetch("https://en.wiktionary.org/wiki/a").then(res => res.text())
.then(htmlString => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(htmlString, 'text/html');
  var ele1 = htmlDoc.getElementsByClassname("IPA");
  console.log(ele1);
});


var html1 = `<b id="b1">hello</b><span id="span1">hi</span>`;
var parser = new DOMParser();
var htmlDoc = parser.parseFromString(html1, 'text/html');
var ele1 = htmlDoc.getElementById("b1");
console.log(ele1);


var a = fetch("https://en.wiktionary.org/wiki/sixteen").then(res => res.text())
.then(text =>function(){
  var el = document.createElement('html');
  el.innerHTML = text; var ele1 = document.getElementsByTagName("a"); console.log(ele1); return ele1;
//console.log(text);
});

var a= fetch("https://en.wiktionary.org/wiki/a").then(res => res.text())
.then(htmlString => {
  // console.log(htmlString);
  return htmlString.querySelector.innerHTML
  return htmlString;
 // var parser = new DOMParser();
  //var htmlDoc = parser.parseFromString(htmlString, 'text/html');
 // var ele1 = htmlDoc.getElementsByClassname("IPA");
 // console.log(ele1); return ;
});
var spans = a.getElementsByClassname("IPA");
console.log(spans);

var a;
a = fetch("https://en.wiktionary.org/wiki/sixteen").then(res => res.text());
var string = a;
var doc = new DOMParser().parseFromString(string, 'text/html');
console.log(doc.body.innerHTML); // or doc.querySelector('body').innerHTML
// ^ Returns "content"



// ------------------------
var a;
fetch("https://en.wiktionary.org/wiki/sixteen").then(res => res.text()).then(text => { a = text; return ;});
var string = a;
var doc = new DOMParser().parseFromString(string, 'text/html');
console.log(doc.body.innerHTML); // or doc.querySelector('body').innerHTML
// ^ Returns "content"
var doc = new DOMParser().parseFromString(a, 'text/html');
doc
console.log(doc.body.innerHTML);
var spans = document.getElementsByTagName("span");
spans //htmlcollection
var span1 = doc.getElementsByClassName("IPA")[0]
span1.innerHTML;
