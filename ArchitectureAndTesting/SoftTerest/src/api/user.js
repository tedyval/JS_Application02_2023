import { get, post } from "./api.js"


let endpoints = {
    login: 'users/login',
    register: 'users/register',
    logout: 'users/logout'
}

export async function login(email, password) {

    let user = await post(endpoints.login, { email, password });
    localStorage.setItem('user',JSON.stringify(user));
}

export async function register(email, password) {

    let user = await post(endpoints.register, { email, password });
    localStorage.setItem('user',JSON.stringify(user));
}

export async function logout() {

    let user = await get(endpoints.logout);
    localStorage.removeItem('user');
}