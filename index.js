const glob = require("glob");
const path = require("path");

class Localizer {
    constructor(config = {}) {
        this.setLanguages();

        if (config.fallback) this.setFallback(config.fallback);

        if (typeof config.languagesFolder === "string") glob.sync(path.join(process.cwd(), config.languagesFolder, "**", "*.json")).forEach((file) => {
            this.addLanguage(path.basename(file, path.extname(file)), require(file));
        });

        if (typeof config.languagesFile === "string") this.addLanguages(require(path.join(process.cwd(), config.languagesFile)));
        if (typeof config.languages === "object" && !Array.isArray(config.languages)) this.addLanguages(config.languages);

        this.default = typeof config.default === "string" ? config.default : "!%name%!";
    }

    localize(name, languages, args = {}) {
        if (typeof name !== "string") throw new Error("Name must be a string.");
        if (!Array.isArray(languages)) throw new Error("Languages must be an array.");
        if (typeof args !== "object" || Array.isArray(args)) throw new Error("Arguments must be an object.");

        if (this.fallback) languages = languages.concat([ this.fallback ]);

        languages.forEach((language) => {
            language = this.checkLanguage(language);
        });

        let localization;

        languages.some((languageKeys) => {
            if (!(languageKeys[0] in this.languages) || !(languageKeys[1] in this.languages[languageKeys[0]])) return false;

            const language = this.languages[languageKeys[0]][languageKeys[1]];

            if (!(name in language)) return false;

            localization = language[name];
            return true;
        });

        Object.keys(args).forEach((arg) => {
            if (!/^[a-zA-Z]+$/.test(arg)) throw new Error(`Argument must only be alphabetic (${arg})`);

            localization = localization.replace(new RegExp(`%${arg}%`, "g"), args[arg]);
        });

        return localization ? localization : this.default.replace(/%name%/g, name);
    }

    checkLanguage(language) {
        if (!Array.isArray(language)) throw new Error(`Language must be an array (${language.join(", ")}).`);
        if (language.length < 1 || language.length > 2) throw new Error(`Language must have one or two elements (${language.join(", ")}).`);

        if (!language[1]) language[1] = language[0];
        if (typeof language[0] !== "string" || typeof language[1] !== "string") throw new Error(`Elements of language must be strings (${language.join(", ")}).`);

        return language;
    }

    setFallback(language) {
        if (!language) throw new Error("Language must be provided.");

        this.fallback = this.checkLanguage(language);
    }

    setDefault(defaultMessage) {
        if (typeof defaultMessage !== "string") throw new Error("Default must be a string.");

        this.default = defaultMessage;
    }

    addLanguage(name, language) {
        if (typeof name !== "string") throw new Error("Name must be a string.");
        if (typeof language !== "object" || Array.isArray(language)) throw new Error(`Language must be an object (${name}).`);
        if (!(name in language)) throw new Error(`Language must have it's own name (${name}).`);

        this.languages[name] = language;
    }

    removeLanguage(name) {
        if (typeof name !== "string") throw new Error("Name must be a string.");
        if (name in this.languages) {
            delete this.languages[name];
            return true;
        }

        return false;
    }

    addLanguages(languages) {
        if (typeof languages !== "object" || Array.isArray(languages)) throw new Error("Languages must be an object.");

        Object.keys(languages).forEach((language) => {
            this.addLanguage(language, languages[language]);
        });
    }

    setLanguages(languages) {
        this.languages = {};
        if (languages) this.addLanguages(languages);
    }
}

module.exports = Localizer;