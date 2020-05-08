/* eslint-disable no-unused-vars */
import {swiper} from "./swiper_const";
import {Keybord} from "./keyboard_class";
import {KEYS, KEY_CODE, UPPERKEY} from "./keyboard_const";
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

export const sectionContentSearch = document.querySelector("#sectionContentSearch");
export const loadIcon = document.getElementById('loadIcon');
const divMistake = document.createElement('div');
const sectionContentMyMovies = document.querySelector(".marked-results__my-movies");

export const myMovies = new Array();

function updateMyMoviesResult() {
  myMoviesProxy.forEach(element => {
    sectionContentMyMovies.appendChild(element.getMovieItem());
  });}


export const myMoviesProxy = new Proxy(myMovies, {
  set(target, property, value) {
    const base = target;
    base[property] = value;
    if (property === "length") {
      localStorage.myMovies = JSON.stringify(myMoviesProxy);
      sectionContentMyMovies.innerHTML = "";
      updateMyMoviesResult();
    }
    return true;
  }
});

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


function fillResultText() {
  const currentSearch = 'Showing results for ';
  if (sectionContentSearch.value === "") {
    divMistake.innerHTML = 'Showing results from history';
  } else {
    divMistake.innerHTML = currentSearch + sectionContentSearch.value;
  }
  swiper.update();
}

class Movie {
  constructor(movie) {
    this.Title = movie.Title;
    this.Year = movie.Year;
    this.Director = movie.Director;
    this.Plot = movie.Plot;
    this.Poster = movie.Poster;
    this.Ratings = movie.Ratings;
    this.imdbID = movie.imdbID;
    this.Type = movie.Type;
    this.Response = movie.Response;
  }

   getMovieItem() {
    fillResultText()
    const movieItem = document.createElement("div");
    movieItem.classList = "movie-item swiper-slide";
    movieItem.innerHTML = `<div class="movie-item__poster" style="background-image:url(${
      this.Poster !== "N/A"
        ? this.Poster
        : "https://renderman.pixar.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
    })">
                <!--div class="movie-item__heart ${
                  myMoviesProxy.includes(this) ? "movie-item__heart_visible" : ""
                }"><i class="fa fa-heart" aria-hidden="true"></i></div-->
            </div>
            <div class="movie-item__title">${this.Title}</div>
            <div class="movie-item__year">${this.Year}</div>
            <div class="movie-modal__rating-item">
            <div class="movie-modal__rating-item_icon" style="background-image: url(https://cdn4.iconfinder.com/data/icons/socialmediaicons_v120/16/imdb.png);"></div>
            <div class="movie-modal__rating-item_score">${
              this.Ratings[0] != null
                ? this.Ratings[0].Value
                : "N/A"
            }</div>`;

            const infoButton = document.createElement("button");
            infoButton.classList.add("movie-item__info_push");
            movieItem.appendChild(infoButton);
            infoButton.innerText = "info";

    movieItem.addEventListener("click", (event) => {
      const ImdbAdress = "https://www.imdb.com/title/"
      const url = this.imdbID;
      const gallery = "/videogallery/"
      if (event.target.closest('.movie-item__info_push')) {
        sectionContainer.classList.add("section-container-blurred");
      modalContainer.appendChild(this.getMovieModal());
      }
      if (event.target.closest('.movie-item__poster')) {
        window.open(ImdbAdress + url + gallery);
      }
    });

    this.movieItem = movieItem;
    return movieItem;
  }

  getMovieModal() {
    const movieModal = document.createElement("div");
    movieModal.classList = "movie-modal__detail content-wrapper";
    movieModal.innerHTML = `<div class="movie-modal__poster" style="background-image:url(${
      this.Poster !== "N/A"
        ? this.Poster
        : "https://renderman.pixar.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
    })">
                <div class="movie-modal__close"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div class="movie-modal__heart"><i class="fa ${
                  myMoviesProxy.find(element => {
                    return element.imdbID === this.imdbID;
                  }) !== undefined
                    ? "fa-minus"
                    : "fa-plus"
                }" aria-hidden="true"></i></div>
            </div>
            <div class="movie-modal__body">
                <div class="movie-modal__title">${this.Title}</div>
                <div class="movie-modal__year">${this.Year}</div>
                <div class="movie-modal__director">${this.Director}</div>
                <div class="movie-modal__rating-container">
                    <div class="movie-modal__rating-item">
                        <div class="movie-modal__rating-item_icon" style="background-image: url(https://staticv2-4.rottentomatoes.com/static/images/icons/CF_16x16.png);"></div>
                        <div class="movie-modal__rating-item_score">${
                          this.Ratings[1] != null
                            ? this.Ratings[1].Value
                            : "N/A"
                        }</div>
                    </div>
                    <div class="movie-modal__rating-item">
                        <div class="movie-modal__rating-item_icon" style="background-image: url(https://cdn4.iconfinder.com/data/icons/socialmediaicons_v120/16/imdb.png);"></div>
                        <div class="movie-modal__rating-item_score">${
                          this.Ratings[0] != null
                            ? this.Ratings[0].Value
                            : "N/A"
                        }</div>
                    </div>
                </div>
                <div class="movie-modal__plot">${this.Plot}</div>
            </div>`;
    movieModal.querySelector(".movie-modal__close").addEventListener("click", () => {
        modalContainer.innerHTML = "";
        sectionContainer.classList.remove("section-container-blurred");
      });
    movieModal.querySelector(".movie-modal__heart").addEventListener("click", event => {
        this.changeMyMovieItem(event, this, this.movieItem);
      });
    return movieModal;
  }

  changeMyMovieItem(event, movie, movieItem) {
    this.movieItemHeart = movieItem.querySelector(".movie-item__heart");
    if (!myMoviesProxy.includes(movie)) {
      myMoviesProxy.push(movie);
      event.target.classList.remove("fa-plus");
      event.target.classList.add("fa-minus");
    } else {
      myMoviesProxy.splice(myMovies.indexOf(movie), 1);
      event.target.classList.add("fa-plus");
      event.target.classList.remove("fa-minus");
    }
  }
}

function populateSearchResult(search) {
  const currentSearch = 'No results were found for ';
    searchMovie(search).then(result => {
        if (result.Search == null) {
        divMistake.innerHTML = currentSearch + sectionContentSearch.value;
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


const nextSlide = document.querySelector('.swiper-button-next');
const sectionContainer = document.querySelector(".section-container");
const sections = document.querySelectorAll(".section");
const HeaderMenu = document.querySelectorAll(".header-menu");
const HeaderSubtitles = document.querySelectorAll(".header__title_subtitle");
const ContentSearchButton = document.querySelector("#sectionContentSearchButton");
const ContentSearchIconContainer = document.querySelector(".search__engine_icon-container");
const ShowSearchHistoryButton = document.querySelector(".search-history__button");
const SearchHistory = document.querySelector(".history-library__item");
const modalContainer = document.querySelector(".modal-container");
const content = document.querySelector(".content-box");
const swiperSlide = document.querySelector('.swiper-wrapper');

let typeTimer;
const typeWaitMilliseconds = 2000;

HeaderSubtitles.forEach((element) => {
  element.addEventListener("click", () => {
    sections.forEach(el => {
      el.classList.remove("section-visible");
    });
    document
      .querySelector(`#${element.dataset.sectionTarget}`)
      .classList.add("section-visible");
    modalContainer.innerHTML = "";
  });
});

HeaderMenu.forEach(element => {
  element.addEventListener("click", () => {
    sectionContainer.classList.add("section-container-blurred");
  });
});

function startLook() {
  nextSlide.addEventListener('transitionend', () => {
  if (nextSlide.classList.contains("swiper-button-disabled") && sectionContentSearch.value !== "" ) {
    loadIcon.classList.remove('invisible');
    ReStartSearch()
  }
})
}

export function startSearch() {
  translate();
  nextPageSearch = 1;
  content.appendChild(divMistake);
  clearTimeout(typeTimer);
  typeTimer = setTimeout(() => {
    if (sectionContentSearch.value.trim() !== "") {
      startLook()
      addSearchHistoryItem(sectionContentSearch.value.trim());
      populateSearchResult(sectionContentSearch.value.trim());
    }
  }, typeWaitMilliseconds);
}

sectionContentSearch.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && sectionContentSearch.value !== "") {
    loadIcon.classList.remove('invisible');
    startSearch()
  }
});

ContentSearchButton.addEventListener("click", () => {
  if (sectionContentSearch.value !== "") {
    loadIcon.classList.remove('invisible');
    startSearch()
  }
});


divMistake.classList.add('alert');


ContentSearchIconContainer.addEventListener("click", () => {
  sectionContentSearch.value = "";
});

ShowSearchHistoryButton.addEventListener("click", () => {
  if (SearchHistory.classList.contains("history__visible"))
   {
    SearchHistory.classList.remove("history__visible");
    document.querySelector('.search-history_open').style.display = "block";
    document.querySelector('.search-history_close').style.display = "none";
  } else {
    SearchHistory.classList.add("history__visible");
    document.querySelector('.search-history_open').style.display = "none";
    document.querySelector('.search-history_close').style.display = "block";
  }
});


export function RePopulateSearchResult(search) {
  const currentSearch = 'No more results for ';
    searchMovie(search).then(result => {
        if (result.Search == null) {
        divMistake.innerHTML = currentSearch + sectionContentSearch.value;
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


const searchHistory = new Array();
function addSearchHistoryItem(item) {
  searchHistory.push(item);
  SearchHistory.insertAdjacentHTML(
    "beforeend",
    `<div class="history__item" onclick="populateSearchResult('${item}')">${item}</div>`
  );
}

if (localStorage.myMovies !== undefined) {
  if (localStorage.myMovies.length > 0) {
    JSON.parse(localStorage.myMovies).forEach(element => {
      myMoviesProxy.push(new Movie(element));
      sectionContentMyMovies.innerHTML = "";
    });
    updateMyMoviesResult();
  }
}

// window.onload = () => {
  const bestFilms = "akito";
 loadIcon.classList.remove('invisible');
 populateSearchResult(bestFilms);
 Keybord.checkLocalstorage();
 const capsLock = localStorage.capsLock === '1';
 const keybord = new Keybord(localStorage.lang, capsLock, KEYS, KEY_CODE, UPPERKEY);
 keybord.renderKeybord();
 keybord.addListenersOnKeys();
// };
