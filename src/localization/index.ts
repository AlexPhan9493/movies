import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources, { languages } from "./resources";

void i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: languages.en,
  fallbackLng: languages.en,
  fallbackNS: "common",
  resources,
  nsSeparator: ".",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  react: {
    useSuspense: false,
  },
});

export const t = i18n.t;

export default i18n;
