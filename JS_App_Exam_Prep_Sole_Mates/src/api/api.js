import { getUserData, clearDataUser } from "./sessionData.js";

const host = 'http://localhost:3030';

async function request(method,url, data) {
    let options = {
        method,
        headers: {}
    }

    let user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    if (data !== undefined) {
        options.headers["Content-Type"] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        let response = await fetch(host + url, options);

        
        if (response.status == 204) {
            return response;
        }

        if (response.ok == false) {
            if (response.status == 403) {
                clearDataUser();
            }


            throw new Error(response.status);
        }

        return response.json();

    } catch (error) {
      alert(error.message);
      throw new Error(error.message)
    }

}

export const get = request.bind(null,"get");
export const post = request.bind(null,"post");
export const put = request.bind(null,"put");
export const del = request.bind(null,"delete");