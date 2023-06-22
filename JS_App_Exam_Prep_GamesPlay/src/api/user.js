import { clearDataUser, setDataUser } from "./sessionData.js";
import { post,get} from "./api.js";


export async function register({ email, password }) {
    let data = await post('/users/register', { email, password });
    setDataUser(data);
}

export async function login({ email, password }) {
    let data = await post('/users/login', { email, password });
    setDataUser(data);
}

export async function logout() {
    get('/users/logout');
    clearDataUser();
}

