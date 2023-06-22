import { clearDataUser, setDataUser } from '../util.js';
import {get,post} from './api.js';




export async function login(email, password) {
    let data = await post('/users/login', { email, password });
    setDataUser(data);

}

export async function register(email, password) {
    let data =await  post('/users/register', { email, password });
    setDataUser(data);
}

export async function logout() {
     get('/users/logout');
     clearDataUser();
}
