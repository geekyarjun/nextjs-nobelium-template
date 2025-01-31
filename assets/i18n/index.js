/**
 * Lazy-load lang data
 *
 * @param {string} section - The section of lang data to load
 * @param {string} lang    - The language name
 * @returns {Promise<object>} - The content of a lang JSON
 */
export default function loadLocale(section, lang) {
  console.log("section", section, "lang", lang);
  // return requireAsset(`./${section}/${lang}.json`);

  return import(`./${section}/${lang}.json`).then((mod) => {
    return mod.default;
  });
}
