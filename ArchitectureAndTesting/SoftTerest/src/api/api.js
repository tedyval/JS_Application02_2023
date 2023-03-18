

let host = "http://localhost:3030/"

async function request(method, url, data) {

    let options ={
        method,
        headers:{}
    }

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body= JSON.stringify(data);
    }

    let user = localStorage.getItem("user");

    if(user){
        let token = JSON.parse(localStorage.getItem("user")).accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        console.log(host + url);
        let response = await fetch(host + url, options);
        if (response.ok != true) {

            if(response.status == 403){
                localStorage.removeItem("user");
            }
            let error = response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){
            return response;
        }else{
            return response.json();
        }


    } catch (error) {
      alert(error.message);
      throw error;
    }
}

let get =request.bind(null,"get");
let post =request.bind(null,"post");
let put =request.bind(null,"put");
let del =request.bind(null,"delete");

export {
    get,
    post,
    put,
    del 
}