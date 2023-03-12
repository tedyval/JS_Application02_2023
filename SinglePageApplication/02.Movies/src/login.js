import { navigation } from "./util.js";
import { displayAllMovies } from "./home.js";
import { displayEmailInNav } from "./register.js";

let anchorMessage = document.getElementById('welcome-msg');
let sections = document.querySelectorAll('section');
let formLogin = sections[6].querySelector('form');
formLogin.addEventListener('submit', (e) => loginUser(e));

function displayLoginPage(e) {
    navigation();
    sections[6].style.display = "block";
}

async function loginUser(e) {
    e.preventDefault();

    let formData = new FormData(formLogin);

    let email = formData.get("email");
    let password = formData.get("password");


    try {
        if (email == "" || password == "") {
            formRegister.reset();
            throw new Error("All inputs should be fullfilled");
        }

        if (password.length < 6) {
            formRegister.reset();
            throw new Error("Password should be minimal 6 symbols")
        }

        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok == false) {
            throw new Error(response.statusText)
        }

        let data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", data._id);
        formLogin.reset();
        navigation();
        displayAllMovies(e);
        displayEmailInNav(e);
        
    } catch (error) {
        alert(error.message)
    }

}


export { displayLoginPage }