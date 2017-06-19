const Localizer = require("../");
const localizer = new Localizer({
    languagesFolder: "lang",
    languagesFile: "languages.json",
    languages: {
        en_AU: {
            en_AU: {
                TITLE_HELLO: "'Sup mate?"
            }
        }
    },
    default: "(Missing localization for %name%)",
    fallback: ["en_AU"]
});

// Should say "What's up?".
console.log(localizer.localize("TITLE_HELLO", [["en_US"], ["en_UK"]]));
// Should say "How's it going?" as zh_TW isn't available.
console.log(localizer.localize("TITLE_HELLO", [["zh_TW"], ["en_UK"]]));
// Should say "'Sup mate?" as that is the fallback when no languages provided are available.
console.log(localizer.localize("TITLE_HELLO", [["zh_TW"]]));
// Should say "(Missing localization for %name%)" as no localization could be found.
console.log(localizer.localize("TITLE_MISSING", [["en_US"]]));