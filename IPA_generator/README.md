# Objective

For https://translate.google.com, for English-French translations, generate IPA for English and French components.

## Prospective APIs
- [DictionaryAPI](https://dictionaryapi.dev/)
- [Oxford Dictionaries API](https://developer.oxforddictionaries.com/)
- [Merriam-Webster](https://dictionaryapi.com/products/index)
- [Collins API](https://www.collinslanguage.com/collins-api/)


## What should the Extension do?

- Match for the right address, i.e., https://translate.google.com .
- Check that English and French are the two selected languages.
- Present a button to user to generate IPA for all the eligible words in the English pane and the French pane.


## Contribute
Feel free to raise a PR or an issue.

## Notes
- IPA is enclosed by forward brackets( / ). In case of fetching IPA for French words, Wiktionary returns IPA with backward bracket( \ ). Replace backward bracket with forward bracket by string manipulation.
