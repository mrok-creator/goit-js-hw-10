import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { inputRef } from './js/refs.js';
import { listMarkup, cardMarkup, clearViewPort } from './js/get-markup';

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input', debounce(getCountryByName, DEBOUNCE_DELAY));

function getCountryByName(e) {
  if (e.target.value.trim().length === 0) {
    clearViewPort();
    return;
  }
  fetchCountries(e.target.value.trim())
    .then(arr => {
      if (arr.length >= 10) {
        Notify.warning('А не перехочеш!!! Вводь далі');
      }
      return arr;
    })
    .then(arr => {
      if (arr.length > 1 && arr.length < 10) {
        Notify.success('Дай ще інфи');
        listMarkup(arr);
      }
      return arr;
    })
    .then(arr => {
      if (arr.length === 1) {
        Notify.success('Ура!!! В тебе вийшло!');
        cardMarkup(arr);
      }
    })
    .catch(error => {
      clearViewPort();
      Notify.warning('А зась тобі? Нормально запитай');
    });
}
