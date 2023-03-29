import { getDataUser, clearDataUser } from "./user.js";

let host = "http://localhost:3030";

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    let user = getDataUser();
    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        let response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        let result = await response.json();


        if (response.ok == false) {

            if (response.status == 403) {
                clearDataUser();
            }
            throw new Error(result.message);
        }

        return result;

    } catch (error) {
        alert(error.message);
        throw new Error(error)
    }
} 

export const get= request.bind(null,"get");
export const post= request.bind(null,"post");
export const put= request.bind(null,"put");
export const del= request.bind(null,"delete");