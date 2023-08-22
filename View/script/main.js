import {API} from "../../services/api.js";
import { LocalStorage } from "../../services/localStorage.js";

const $listMovies = document.querySelector(".list-movies");
const $form = document.querySelector("#movie_form");
const $input = document.querySelector("#movie-name");
const $checkBox = document.querySelector(".checkbox");

$checkBox.addEventListener("change", checkBoxStatus);


function checkBoxStatus() {
    const isChecked = $checkBox.checked;
    if(!isChecked){
        clearAllMovies();
        getAllPopularMovies();
    } else{
        clearAllMovies()
        const movies = LocalStorage.getFavoriteMovies();
        movies.forEach(movie => renderMovie(movie));
        if(movies.length === 0){
            $listMovies.innerHTML = "Você não curtiu nenhum filme ainda :(";
        } 
    }
}


$form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovie();
});

function clearAllMovies(){
    $listMovies.innerHTML = "";
}

async function searchMovie(){
    const inputValue = $input.value;
    if (inputValue != '') {
        const movies = await API.getSearchMovieByName(inputValue);
        clearAllMovies();
        if(movies != ""){
            movies.forEach(movie => renderMovie(movie));
        } else{
            $listMovies.innerHTML = "Filme não encontrado";
        }
    }
}


function favoriteButtonPressed(event, movie) {
    const favoriteState = {
      favorited: 'images/heart-fill.svg',
      notFavorited: 'images/heart.svg'
    }
    if(event.target.src.includes(favoriteState.notFavorited)){
        
        event.target.src = `../${favoriteState.favorited}`;
        LocalStorage.saveToLocalStorage(movie);
    }
    else{
        event.target.src = `../${favoriteState.notFavorited}`;
        LocalStorage.removeFromLocalStorage(movie.id);
    }
}


async function getAllPopularMovies() {
    const movies = await API.getPopularMovies();
    movies.forEach(movie => renderMovie(movie))
}

window.onload = function() {
    getAllPopularMovies()
}

function renderMovie(movie){
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = LocalStorage.checkMovieIsFavorited(id);
    const $divMovie = document.createElement("div");
    $divMovie.classList.add("movie");
    $listMovies.appendChild($divMovie);
    
    const $divMovieInformations = document.createElement("div");
    $divMovieInformations.classList.add("movie-informations");
    $divMovie.appendChild($divMovieInformations);
        
            const $maskCircle = document.createElement("div");
            $maskCircle.classList.add("mask-circle");
            $divMovieInformations.appendChild($maskCircle);

                const $movieImage = document.createElement("img");
                $movieImage.classList.add("movie-image");
                $movieImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`
                $movieImage.alt = title;
                $maskCircle.appendChild($movieImage);
                

            const $divMovieText = document.createElement("div");
            $divMovieText.classList.add("movie-text");
            $divMovieInformations.appendChild($divMovieText);

                const $h4TitleMovie = document.createElement("h4");
                $h4TitleMovie.classList.add("title-movie");
                $h4TitleMovie.innerText = `${title} ${new Date(release_date).getFullYear()}`;
                $divMovieText.appendChild($h4TitleMovie);
                

                const $divRatingFavorites = document.createElement("div");
                $divRatingFavorites.classList.add("rating-favorites");
                $divMovieText.appendChild($divRatingFavorites);
                
                    const $divRating = document.createElement("div");
                    $divRating.classList.add("rating");
                    $divRating.insertAdjacentHTML('beforeend', `
                        <svg class="svg-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" />
                        </svg>
                        <span>${vote_average}</span>
                    `);
                    $divRatingFavorites.appendChild($divRating);
                    
                    
                    const $divFavorite = document.createElement("div");
                    $divFavorite.classList.add("favorite");
                    $divRatingFavorites.appendChild($divFavorite);
                    
                    const $heartImage = document.createElement("img");
                    $heartImage.src = isFavorited  ? "../images/heart-fill.svg" : "../images/heart.svg";
                    $heartImage.alt = "Heart";
                    $heartImage.onclick = (event) => {
                        favoriteButtonPressed(event, movie)
                    };
                    $divFavorite.append($heartImage);
                    $divFavorite.insertAdjacentHTML("beforeend", `
                        <span>Favoritar</span>
                    `);

    const $movieDescription = document.createElement("div");
    $movieDescription.classList.add("movie-description");
    $divMovie.appendChild($movieDescription);
    $movieDescription.insertAdjacentHTML("afterbegin", `
        <p class="description">${overview}</p>
    `);
    

        
}



