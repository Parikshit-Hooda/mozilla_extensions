    // var teststr =
    // document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
    //
    // // var sendSrcString =
    // browser.runtime.sendMessage({
    //   srcString: teststr
    // }, {msgSender: "from content_Scritp1.js"}, {sr: "not needed"});
    //
    // console.log('teststr');

console.log('content script loaded'); //sucessfully loaded

document.getElementById("findipabtn").addEventListener("click", function(){
  var sourceData = document.querySelector('[aria-label="Source text"]').nextElementSibling.innerHTML;
  var targetData = document.querySelector('[lang="fr"]').childNodes[0].innerText;
  console.log('source data ' + sourceData);
  console.log('target data ' + targetData);
})
