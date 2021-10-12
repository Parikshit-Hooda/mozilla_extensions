function getIPA_promise(lang, item) {
  return new Promise(function(resolve, reject){
    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
  .then(response => response.text())
  .then(text => {
 resolve(text);
});
});
}


getIPA_promise("en", "bonjour").then(response => {
console.log(response)
  })
  .catch((error) => {
    console.log("getIPA_promise error: lang: " + lang + " item: " + item);
  });

var promises = [];
  (["hello", "son"]).forEach((item, i) => {
      promises.push(
        getIPA_promise("en", item).then(response => {
          wordsIPAObj[item] = response;
        })
        .catch((error) => {
          console.log("getIPA_promise error: lang: " + "en" + " item: " + item);
        });
      ); //promises.push closing bracket
    });



    var promises = [];

array.forEach(function(element) {
    promises.push(
        developer.getResources(element)
            .then((data) = > {
                name = data.items[0];
                return developer.getResourceContent(element, file);
            })
            .then((response) = > {
                fileContent = atob(response.content);
                self.files.push({
                    fileName: fileName,
                    fileType: fileType,
                    content: fileContent
                });
            }).catch ((error) = > {
                console.log('Error: ', error);
            })
    );
});

Promise.all(promises).then(() =>
    self.resultingFunction(self.files)
);
