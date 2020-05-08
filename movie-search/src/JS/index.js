import {Movie, myMoviesProxy, updateMyMoviesResult} from "./index_movie_class";
import {startSearch, populateSearchResult} from "./index_movie_search";
import {Keybord} from "./keyboard_class";
import {KEYS, KEY_CODE, UPPERKEY} from "./keyboard_const";

const sectionContentSearch = document.querySelector("#sectionContentSearch");
const loadIcon = document.getElementById('loadIcon');
const sectionContentMyMovies = document.querySelector(".marked-results__my-movies");
const sectionContainer = document.querySelector(".section-container");
const sections = document.querySelectorAll(".section");
const HeaderMenu = document.querySelectorAll(".header-menu");
const HeaderSubtitles = document.querySelectorAll(".header__title_subtitle");
const ContentSearchButton = document.querySelector("#sectionContentSearchButton");
const ContentSearchIconContainer = document.querySelector(".search__engine_icon-container");
const ShowSearchHistoryButton = document.querySelector(".search-history__button");
const SearchHistory = document.querySelector(".history-library__item");
const modalContainer = document.querySelector(".modal-container");


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

if (localStorage.myMovies !== undefined) {
  if (localStorage.myMovies.length > 0) {
    JSON.parse(localStorage.myMovies).forEach(element => {
      myMoviesProxy.push(new Movie(element));
      sectionContentMyMovies.innerHTML = "";
    });
    updateMyMoviesResult();
  }
}

const bestFilms = "akito";
loadIcon.classList.remove('invisible');
populateSearchResult(bestFilms);
Keybord.checkLocalstorage();
const capsLock = localStorage.capsLock === '1';
const keybord = new Keybord(localStorage.lang, capsLock, KEYS, KEY_CODE, UPPERKEY);
keybord.renderKeybord();
keybord.addListenersOnKeys();

window.populateSearchResult = populateSearchResult;
