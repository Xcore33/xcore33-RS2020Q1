import {swiper} from "./swiper_const";
import {Movie} from "./index_movie_class";
import {translate} from "./translate";

const searchAPIUrl = (apiKey, title) => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}=${pageSearch}${nextPageSearch}`;
};
const IDAPIUrl = (apiKey, id) => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
};
const apiKey = "31849743";
const pageSearch = "&page=";
let nextPageSearch = 1;


const sectionContentSearch = document.querySelector("#sectionContentSearch");
const loadIcon = document.getElementById('loadIcon');
const divMistake = document.createElement('div');
const nextSlide = document.querySelector('.swiper-button-next');
const SearchHistory = document.querySelector(".history-library__item");
const modalContainer = document.querySelector(".modal-container");
const content = document.querySelector(".content-box");
const swiperSlide = document.querySelector('.swiper-wrapper');

function startLook() {
  nextSlide.addEventListener('transitionend', () => {
  if (nextSlide.classList.contains("swiper-button-disabled") && sectionContentSearch.value !== "" ) {
    loadIcon.classList.remove('invisible');
    ReStartSearch()
  }
})
}


let typeTimer;
const typeWaitMilliseconds = 2000;
export function startSearch() {
  translate();
  nextPageSearch = 1;
  content.appendChild(divMistake);
  divMistake.classList.add('alert');
  clearTimeout(typeTimer);
  typeTimer = setTimeout(() => {
    if (sectionContentSearch.value.trim() !== "") {
      startLook()
      addSearchHistoryItem(sectionContentSearch.value.trim());
      populateSearchResult(sectionContentSearch.value.trim());
    }
  }, typeWaitMilliseconds);
}

export function fillResultText() {
  const currentSearch = 'Showing results for ';
   if (sectionContentSearch.value === "") {
     divMistake.innerHTML = 'Showing results from history';
   } else {
     divMistake.innerHTML = currentSearch + sectionContentSearch.value;
   }
   swiper.update();
 }


export function populateSearchResult(search) {
    searchMovie(search).then(result => {
      const currentSearch = 'No results were found for ';
      const errorValue = ` API: ${Object.values(result)[1]}`;
        if (result.Search == null) {
        divMistake.innerHTML = currentSearch + sectionContentSearch.value + errorValue;
        loadIcon.classList.add('invisible');
        return;
      }
      if (result.Search !== null) {
        swiperSlide.innerHTML = "";
        modalContainer.innerHTML = "";
        result.Search.map((element) => {
        getMovieData(element.imdbID).then(data => {
          const movie = new Movie(data);
          swiperSlide.appendChild(movie.getMovieItem());
          loadIcon.classList.add('invisible');
        });
        return true;
      });
    }
    });
}


function searchMovie(title) {
  return new Promise((resolve, reject) => {
    fetch(searchAPIUrl(apiKey, title))
      .then(result => {
        result.json().then(json => {
          resolve(json);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}


function getMovieData(imdbID) {
  return new Promise((resolve, reject) => {
    fetch(IDAPIUrl(apiKey, imdbID))
      .then(result => {
        result.json().then(json => {
          resolve(json);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}


function ReStartSearch() {
  translate();
  nextPageSearch+=1;
  content.appendChild(divMistake);
  clearTimeout(typeTimer);
  typeTimer = setTimeout(() => {
    if (sectionContentSearch.value.trim() !== "") {
      RePopulateSearchResult(sectionContentSearch.value.trim());
    }
  }, typeWaitMilliseconds);
}


function RePopulateSearchResult(search) {
  const currentSearch = 'No more results for ';
    searchMovie(search).then(result => {
      const errorValue = ` API: ${Object.values(result)[1]}`;
        if (result.Search == null) {
        divMistake.innerHTML = currentSearch + sectionContentSearch.value + errorValue;
        loadIcon.classList.add('invisible');
        return;
      }
      if (result.Search !== null) {
        modalContainer.innerHTML = "";
        result.Search.map((element) => {
        getMovieData(element.imdbID).then(data => {
          const movie = new Movie(data);
          swiperSlide.appendChild(movie.getMovieItem());
          loadIcon.classList.add('invisible');
        });
        return true;
      });
    }
    });
}


const searchHistory = new Array();
function addSearchHistoryItem(item) {
  searchHistory.push(item);
  SearchHistory.insertAdjacentHTML("beforeend",
  `<div class="history__item" onClick="populateSearchResult('${item}')">${item}</div>`);
}
