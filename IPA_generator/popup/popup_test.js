
document.getElementById('findipabtn').addEventListener("click", function() {
  document.getElementById('tl_p').innerHTML = "Target Language: Fr";

  document.body.style.color = "5px solid red";

  browser.runtime.sendMessage()
