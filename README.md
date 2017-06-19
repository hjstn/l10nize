# l10nize
Localizer framework.

## Usage
```
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
