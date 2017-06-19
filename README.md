# l10nize
Localizer framework.

## Usage
```js
const options = {
    languages: {
        en_US: {
           en_US: {
               TITLE: "Title"
           }
        }
    }
}

const Localizer = require("l10nize");
const localizer = new Localizer(options);
```

### Options

* `languagesFolder` (String) Folder path, relative to the running script, containing language files.
* `languagesFile` (String) File path, relative to the running script, containing languages.
* `languages` (Object) Object containing languages.
* `default` (String) Message shown when no localization could be found.
* `fallback` (Array, Language) Fallback language automatically used when no localization were found.

More information, and an example, are available in the `examples` folder.

## localize(name, languages, arguments)

* `name` (String) Name of string to be localized.
* `languages` (Array, Languages) Array of languages to localize, in order of which should be tried first.
* `arguments` (Object) Placeholder names and the values to replace them.

Localize a message.

## checkLanguage(language)


* `language` (Array) Array that may be a language.

Check if array provided is a language.

## setFallback(language)

* `language` (Array) Language to fallback to.

Set the message to automatically fallback to.

## setDefault(default)

* `default` (String) Message returned if no localization could be found.

Set the message returned if no localization could be found.

## addLanguage(name, language)

* `name` (String) Name of the language being added.
* `language` (Array, Language) Language being added.

Add a language to the languages.

## removeLanguage(name)

* `name` (String) Name of the language being removed.

Remove a language from the languages.

## addLanguages(languages)

* `languages` (Array, Languages) Array of languages to be added.

Add multiple languages to the languages.

## setLanguages(languages)

* `languages` (Array, Languages) Array of languages to replace current array.

Set languages in languages.