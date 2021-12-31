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
    let res = await request(`${databaseUrl}/movies/${id}.json`);

    return res;
}