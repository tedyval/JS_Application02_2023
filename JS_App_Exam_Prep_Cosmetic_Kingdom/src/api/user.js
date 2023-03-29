import {get,post} from './api.js';

export function setDataUser(data) {
    localStorage.setItem("user", JSON.stringify(data));

}

export function getDataUser() {
    let data = localStorage.getItem("user");
    return JSON.parse(data);

}

export function clearDataUser() {
    localStorage.removeItem("user");
}

export async function login(email, password) {
    let data = await post('/users/login', { email, password });
    setDataUser(data);
}

export async function register(email, password) {
    let data = await post('/users/register', { email, password });
    setDataUser(data);
}

export async function logout(){
    get('/users/logout');
    clearDataUser();
  }