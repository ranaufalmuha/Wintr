// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './lang/ar.json'; // Arab
import bn from './lang/bn.json'; // Bengali
import en from './lang/en.json'; // Inggris
import es from './lang/es.json'; // Spanyol
import fr from './lang/fr.json'; // Prancis
import hi from './lang/hi.json'; // Hindi
import id from './lang/id.json'; // Bahasa Indonesia
import ja from './lang/ja.json'; // Jepang
import jv from './lang/jv.json'; // Jawa
import min from './lang/min.json'; // Minang
import pt from './lang/pt.json'; // Portugis
import ru from './lang/ru.json'; // Rusia
import tr from './lang/tr.json'; // Turki

const lang = localStorage.getItem('lang') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            bn: { translation: bn },
            en: { translation: en },
            es: { translation: es },
            fr: { translation: fr },
            hi: { translation: hi },
            id: { translation: id },
            ja: { translation: ja },
            jv: { translation: jv },
            min: { translation: min },
            pt: { translation: pt },
            ru: { translation: ru },
            tr: { translation: tr },
        },
        lng: lang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
