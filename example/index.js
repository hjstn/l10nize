const Localizer = require("../");
const localizer = new Localizer({
    languagesFolder: "lang",
    languagesFile: "languages.json",
    languages: {
        en_AU: {
            en_AU: {
                TITLE_HELLO: "'Sup %name%?"
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
// Should say "'Sup %name%?" as that is the fallback when no languages provided are available.
console.log(localizer.localize("TITLE_HELLO", [["zh_TW"]]));
// Should say "'Sup guest?" as "guest" is set as the value for the placeholder "name".
console.log(localizer.localize("TITLE_HELLO", [["en_AU"]], { name: "guest" }));
// Should say "(Missing localization for %name%)" as no localization could be found.
console.log(localizer.localize("TITLE_MISSING", [["en_US"]]));