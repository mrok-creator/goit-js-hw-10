import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { inputRef } from './js/refs.js';
import { listMarkup, cardMarkup, updateViewPort } from './js/get-markup';

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input', debounce(getCountryByName, DEBOUNCE_DELAY));

function getCountryByName(e) {
  updateViewPort();
  if (e.target.value.trim().length === 0) {
    return;
  }
  fetchCountries(e.target.value.trim())
    .then(arr => {
      if (arr.length >= 10) {
        return Notify.warning('А не перехочеш!!! Вводь далі');
      }
      if (arr.length > 1 && arr.length < 10) {
        Notify.success('Дай ще інфи');
        return listMarkup(arr);
      }
      if (arr.length === 1) {
        Notify.success('Ура!!! В тебе вийшло!');
        return cardMarkup(arr);
      }
    })
    .catch(error => {
      Notify.warning('А зась тобі? Нормально запитай');
    });
}
