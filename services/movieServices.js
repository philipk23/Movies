import { request } from "./requestServices.js";

const databaseUrl = 'https://movies-150fa-default-rtdb.firebaseio.com';

const api = {
    movies: `${databaseUrl}/movies.json`,
}

export const getAllMovies = async (searchText) => {
    let res = await request(api.movies, 'GET');

    //console.log(Object.keys(res).map(key => ({key, ...res[key]})));

    //It works without the filter part

    return Object.keys(res).map(key => ({key, ...res[key]}))//.filter(x => !searchText || searchText == key.title);
}

export const getOneById = async (id) => {
    let res = await request(`${databaseUrl}/movies/${id}.json`, 'GET');

    return res;
}

export const addMovie = async (movieData) => {
    let res = await request(api.movies, 'POST', movieData);

    return res;
}

export const editMovie = async (id, movieData) => {
    let res = await request(`${databaseUrl}/movies/${id}.json`, 'PATCH', movieData);

    return res;
}

export const deleteMovie = async (id) => {
    let res = await request(`${databaseUrl}/movies/${id}.json`, 'DELETE');

    return res;
}

export const onLike = async(id, creator) => {
    let res = await request(`${databaseUrl}/movies/${id}/likes.json`, 'POST', {creator})
}