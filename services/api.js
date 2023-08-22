import { api_key } from "../env.js";


async function getSearchMovieByName(title){
    const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&api_key=${api_key}&language=pt-BR&page=1`;
    try{
        const fetchResponse = await fetch(urlSearch);
        const { results } = await fetchResponse.json();
        return results;
    } catch(err){
        console.log(err)
    }
}


async function getPopularMovies(){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`;
    try{
        const fetchResponse = await fetch(url);
        const { results } = await fetchResponse.json()
        return results;
    } catch(err){
        console.log(err);
    }
}

export const API = {
    getSearchMovieByName,
    getPopularMovies
}