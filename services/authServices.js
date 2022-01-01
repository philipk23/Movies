const apiKey = 'AIzaSyDkjSVQ-BjuUsCSgbq1tyQC8DGjlSWixIQ';

const api = {
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
}

import { request } from "./requestServices.js";

export const register = async (email, password) => {
    let response = await request(api.register, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response));

    return response;
}

export const login = async (email, password) => {
    let response = await request(api.login, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response));

    return response;
}

export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem('auth'));

        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            email: '',
        };
    }
}

export const logout = async () => {
    try {
        //let resp = firebase.auth().signOut();
        localStorage.setItem('auth', '');
        // console.log(resp);
        //return resp;
    } catch (error) {
        throw error;
    }
};