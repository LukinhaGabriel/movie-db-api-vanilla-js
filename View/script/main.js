import api_key from "../../env.js"


const $listMovies = document.querySelector(".list-movies");

async function getTheMovieDB(){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`;
    try{
        const fetchResponse = await fetch(url);
        const { results } = await fetchResponse.json()
        return results;
    } catch(err){
        console.log(err);
    }
}


window.onload = async function(){
    const movies = await getTheMovieDB();
    movies.forEach(movie => renderMovie(movie));
}

function renderMovie(movie){
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = false;

    $listMovies.insertAdjacentHTML("beforeend", `
        <div class="movie" />
            <div class="movie-informations" />
                <div class="mask-circle">
                    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
                </div>
                <div class="movie-text">
                    <h4 class="title-movie">${title} ${new Date(release_date).getFullYear()}</h4>
                    <div class="rating-favorites" />
                        
                        <div class="rating">
                            <svg class="svg-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" />
                            </svg>
                            <span>${vote_average}</span>
                        </div>
    
                        <div class="favorite" onclick="changeLike()">
                            <img src="${isFavorited ? '../images/heart-fill.svg' : '../images/heart.svg'}" alt="Heart"/>
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="movie-description">
                <p class="description">${overview}</p>
            </div>
        </div>
    `)
}

