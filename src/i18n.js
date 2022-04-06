import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import trEsCommon from "./locales/es/common.json";
import trEnCommon from "./locales/en/common.json";

const resources = {
  en: {
    common: trEnCommon,
  },
  es: {
    common: trEsCommon,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ["common"],
    defaultNS: "common",
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.log(`Missing key: [${lng}] ${ns} :: "${key}": "",`);
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
