import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import data from './data.json';

const resources = {};
const langs = data.languages[0].languages.split(', ');

langs.forEach((lang) => (resources[lang] = { translation: {} }));

// TODO: 타입스크립트로 수정하기
Object.entries(data).forEach(([key, value]) => {
  if (key !== 'languages') {
    langs.forEach((lng) => {
      value.forEach((t) => {
        if (!resources[lng].translation[key])
          resources[lng].translation[key] = {};
        resources[lng].translation[key][t['key']] = t[lng];
      });
    });
  }
});

i18n
  .use(initReactI18next) // NOTE: passes i18n down to react-i18next
  .init({
    resources,
    // lng: 'ko-KR',
    lng: 'en',
  });

export default i18n;
