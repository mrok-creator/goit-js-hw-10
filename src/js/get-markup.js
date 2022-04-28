import { countriesListRef, countryInfoRef } from './refs.js';
function listMarkup(arr) {
  clearViewPort();
  const markup = arr
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
        <img src="${flags.svg}" alt="${name.official} flag" class="flag">
        <p><b>${name.official}</b></p>
      </li>`;
    })
    .join('');
  countriesListRef.innerHTML = markup;
}

function cardMarkup(arr) {
  clearViewPort();
  const markup = arr.map(({ name, capital, flags, languages, population }) => {
    return ` <div class="country">
        <img src="${flags.svg}" alt="${name.official} flag" class="flag card-flag">
        <h2 class="country__name">${name.official}</h2>
      </div>
      <ul class="country__card">
        <li class="country_item">Capital: ${capital}</li>
        <li class="country_item"> Language: ${Object.values(languages)}</li>
        <li class="country_item">Population: ${population}</li>
      </ul>
    </div>`;
  });
  countryInfoRef.innerHTML = markup;
}

function clearViewPort() {
  countriesListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

export { listMarkup, cardMarkup, clearViewPort };
