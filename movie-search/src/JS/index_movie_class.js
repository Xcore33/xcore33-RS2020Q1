import {fillResultText} from "./index_movie_search";

const sectionContainer = document.querySelector(".section-container");
const modalContainer = document.querySelector(".modal-container");
const sectionContentMyMovies = document.querySelector(".marked-results__my-movies");

const myMovies = new Array();

export function updateMyMoviesResult() {
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


export class Movie {
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
