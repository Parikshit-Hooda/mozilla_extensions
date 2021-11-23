# Objective

For https://translate.google.com, for English-French translations, generate IPA for English and French words.

## Demo
Demo of extension is in **demo/** directory in root of this GitHub repo in "main" branch. [See this in GitHub repo](https://github.com/Parikshit-Hooda/mozilla_extensions/blob/main/IPA_generator/demo/working%20demo%20ipa%20generator.mp4). Alternatively, check out this [YouTube video](https://www.youtube.com/watch?v=sSKlRdiXT44).

## Get Started
To start/set up the extension, first requirement is a Mozilla Firefox browser on your computer. Then, follow the below steps:
1. Copy the "main" branch in your test directory folder. [How?](https://stackoverflow.com/questions/600079/how-do-i-clone-a-subdirectory-only-of-a-git-repository#:~:text=Cloning%20only%20a%20subdirectory%20is,answer%20is%20two%20characters%3A%20No.)
2. Open `about:debugging` in your Mozilla Firefox.
3. Click on "This Firefox" on the left panel of your Firefox window, then click on "Load temporary Add-on". [See this](https://github.com/Parikshit-Hooda/mozilla_extensions/blob/main/IPA_generator/demo/firefox%20mount%20extension%20for%20dev.PNG).
4. Load the **manifest.json** file in the dialog box that appears consequentially from above step.
5. After the extension is loaded, open [Google Translate](https://translate.google.com) in another tab.
6. Select English and French language in the Translate website. Type some valid words in the left panel of the website.
7. Now, open the loaded extension in the same tab where your Google Translate website is loaded. Click on the **Find IPA** button.

## Prospective APIs for future development
- [DictionaryAPI](https://dictionaryapi.dev/)
- [Oxford Dictionaries API](https://developer.oxforddictionaries.com/)
- [Merriam-Webster](https://dictionaryapi.com/products/index)
- [Collins API](https://www.collinslanguage.com/collins-api/)


## What should the Extension do?

- [x] Match for the right address, i.e., https://translate.google.com .
- [x] Check that English and French are the two selected languages.
- [x] Present a button to user to generate IPA for all the eligible words in the English pane and the French pane.
- [ ] Deploy an intermediate server to memoize results over time and build a key:value data store. This memoization will help in reducing Fetch calls to wiktionary.org website.
- [ ] Implement feature for extension to work in medium or small size window.


## Contribute
Feel free to raise a PR or an issue.

