import { isLogedIn, navigation } from "./util.js";
import { displayAllMovies } from "./home.js"; 



let ulAnchors = document.querySelectorAll('.navbar-nav.ml-auto a');
let sections = document.querySelectorAll('section');
let formRegister=sections[7].querySelector('form');
formRegister.addEventListener('submit',(e)=>registerUser(e));


function displayRegisterPage(e){
navigation();
sections[7].style.display = "block";
}


async function registerUser(e){
e.preventDefault();

let formData = new FormData(formRegister);

let email = formData.get("email");
let password = formData.get("password");
let repeatPassword = formData.get("repeatPassword");

try{
if(email == "" || password == "" || repeatPassword == ""){
    formRegister.reset();
    throw new Error("All inputs should be fullfilled");
}

if(password != repeatPassword){
    formRegister.reset();
    throw new Error("Passwords do not match");
}

if(password.length < 6){
    formRegister.reset();
    throw new Error("Password should be minimal 6 symbols")
}

let response = await fetch(`http://localhost:3030/users/register`,{
    method: 'post',
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({email,password})
});

if(response.ok == false){
    throw new Error(response.statusText)
}

let data = await response.json();
localStorage.setItem("accessToken",data.accessToken);
localStorage.setItem("email",data.email);
localStorage.setItem("id",data._id);
 formRegister.reset();
displayAllMovies();
navigation();
// document.getElementById('welcome-msg').text = `Welcome, ${localStorage.getItem("email")}`;

}catch(error){
   alert(error.message)
}

}

function displayEmailInNav(e){
e && e.preventDefault();
if(isLogedIn()){
    document.getElementById('welcome-msg').text = `Welcome, ${localStorage.getItem("email")}`;
}


}

export {displayRegisterPage,displayEmailInNav }