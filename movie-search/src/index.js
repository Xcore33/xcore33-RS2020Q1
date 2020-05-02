/* eslint-disable no-undef */
/* eslint-disable no-array-constructor */
/* eslint-disable no-use-before-define */
const searchAPIUrl = (apiKey, title) => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
};
const IDAPIUrl = (apiKey, id) => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
};
const apiKey = "31849743";


const bestFilms = {
  "Search": [
    {
      "Title": "The Shawshank Redemption",
      "Year": "1994",
      "imdbID": "tt0111161",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "The Godfather",
      "Year": "1972",
      "imdbID": "tt0068646",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
      "Title": "The Lord of the Rings: The Return of the King",
      "Year": "2003",
      "imdbID": "tt0167260",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
      "Title": "Fight Club",
      "Year": "1999",
      "imdbID": "tt0137523",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjJmYTNkNmItYjYyZC00MGUxLWJhNWMtZDY4Nzc1MDAwMzU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    }
  ],
  "totalResults": "4"
};




populateSearchResult(bestFilms)

const sectionContainer = document.querySelector(".section-container");
const content = document.querySelector(".content-box");
const sections = document.querySelectorAll(".section");
const sectionHeaderMenu = document.querySelectorAll(".header-menu");
const sectionHeaderSubtitles = document.querySelectorAll(".header__title_subtitle");
const sectionContentSearch = document.querySelector("#sectionContentSearch");
const sectionContentSearchButton = document.querySelector("#sectionContentSearchButton");
const sectionContentSearchIconContainer = document.querySelector(".search__engine_icon-container");
const sectionShowSearchHistoryButton = document.querySelector(".search-history__button");
const sectionSearchHistory = document.querySelector(".history-library__item");
const sectionContentMyMovies = document.querySelector(".marked-results__my-movies");
const modalContainer = document.querySelector(".modal-container");
const swiperSlide = document.querySelector('.swiper-wrapper');

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  init: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    842: {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesPerGroup: 3,
    },
    1030: {
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 4,
    },
  },
  keyboard: true,
});

let typeTimer;
const typeWaitMilliseconds = 2000;

const searchHistory = new Array();
const myMovies = new Array();

const myMoviesProxy = new Proxy(myMovies, {
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

sectionHeaderSubtitles.forEach((element) => {
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

sectionHeaderMenu.forEach(element => {
  element.addEventListener("click", () => {
    sectionContainer.classList.add("section-container-blurred");
  });
});

sectionContentSearch.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    startSearch()
  }
});

sectionContentSearchButton.addEventListener("click", () => {
  startSearch()
});

const divMistake = document.createElement('div');
divMistake.classList.add('alert');

function startSearch() {
  content.appendChild(divMistake);
  clearTimeout(typeTimer);
  typeTimer = setTimeout(() => {
    if (sectionContentSearch.value.trim() !== "") {
      addSearchHistoryItem(sectionContentSearch.value.trim());
      populateSearchResult(sectionContentSearch.value.trim());
    }
  }, typeWaitMilliseconds);
}

sectionContentSearchIconContainer.addEventListener("click", () => {
  sectionContentSearch.value = "";
});

sectionShowSearchHistoryButton.addEventListener("click", () => {
  if (sectionSearchHistory.classList.contains("history__visible"))
   {
    sectionSearchHistory.classList.remove("history__visible");
    document.querySelector('.search-history_open').style.display = "block";
    document.querySelector('.search-history_close').style.display = "none";
  } else {
    sectionSearchHistory.classList.add("history__visible");
    document.querySelector('.search-history_open').style.display = "none";
    document.querySelector('.search-history_close').style.display = "block";
  }
});

function populateSearchResult(search) {
const currentSearch = 'No results for ';
  searchMovie(search).then(result => {
      if (result.Search == null) {
      divMistake.innerHTML = currentSearch + sectionContentSearch.value;
      return;
    }
    if (result.Search !== null) {
      swiperSlide.innerHTML = "";
      modalContainer.innerHTML = "";
      result.Search.map((element) => {
      getMovieData(element.imdbID).then(data => {
        const movie = new Movie(data);
        swiperSlide.appendChild(movie.getMovieItem());
      });
      return true;
    });
  }
  });
}

function updateMyMoviesResult() {
  myMoviesProxy.forEach(element => {
    sectionContentMyMovies.appendChild(element.getMovieItem());
  });
}

function addSearchHistoryItem(item) {
  searchHistory.push(item);
  sectionSearchHistory.insertAdjacentHTML(
    "beforeend",
    `<div class="history__item" onclick="populateSearchResult('${item}')">${item}</div>`
  );
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
    this.Rated = movie.Rated;
    this.Released = movie.Released;
    this.Runtime = movie.Runtime;
    this.Genre = movie.Genre;
    this.Director = movie.Director;
    this.Writer = movie.Writer;
    this.Actors = movie.Actors;
    this.Plot = movie.Plot;
    this.Language = movie.Language;
    this.Country = movie.Country;
    this.Awards = movie.Awards;
    this.Poster = movie.Poster;
    this.Ratings = movie.Ratings;
    this.Metascore = movie.Metascore;
    this.imdbRating = movie.imdbRating;
    this.imdbVotes = movie.imdbVotes;
    this.imdbID = movie.imdbID;
    this.Type = movie.Type;
    this.DVD = movie.DVD;
    this.BoxOffice = movie.BoxOffice;
    this.Production = movie.Production;
    this.Website = movie.Website;
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
      if (event.target.closest('.movie-item__info_push')) {
        sectionContainer.classList.add("section-container-blurred");
      modalContainer.appendChild(this.getMovieModal());
      }
      if (event.target.closest('.movie-item__poster')) {
        window.open(ImdbAdress + url);
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

if (localStorage.myMovies !== undefined) {
  if (localStorage.myMovies.length > 0) {
    JSON.parse(localStorage.myMovies).forEach(element => {
      myMoviesProxy.push(new Movie(element));
      sectionContentMyMovies.innerHTML = "";
    });
    updateMyMoviesResult();
  }
}


