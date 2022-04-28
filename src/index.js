import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { inputRef, countriesListRef, countryInfoRef } from './js/refs.js';

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input', debounce(getCountryByName, DEBOUNCE_DELAY));

function getCountryByName(e) {
  if (e.target.value.trim().length === 0) {
    return;
  }
  fetchCountries(e.target.value.trim())
    .then(arr => {
      if (arr.length >= 10) {
        Notify.warning('А перехочеш!!! Вводь далі');
        console.log(arr);
      } else if (arr.length > 1 && arr.length < 10) {
        Notify.success('Дай ще інфи');
        listMarkup(arr);
        console.log(arr);
      } else {
        Notify.success('Ура!!! В тебе вийшло!');
        cardMarkup(arr);
        console.log(arr);
      }
    })
    .catch(error => {
      Notify.warning('А *** тобі? Нормально введи');
    });
}

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
        <img src="${flags.svg}" alt="${name.official} flag" class="flag">
        <h2 class="country__name">${name.official}</h2>
      </div>
      <ul class="country__info">
        <li class="country_item">${capital}</li>
        <li class="country_item">${languages}</li>
        <li class="country_item">${population}</li>
      </ul>
    </div>`;
  });
  countryInfoRef.innerHTML = markup;
}

function clearViewPort() {
  countriesListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
