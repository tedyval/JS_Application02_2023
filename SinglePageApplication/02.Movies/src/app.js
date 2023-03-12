import { isLogedIn, navigation } from "./util.js";
import {displayRegisterPage, displayEmailInNav} from "./register.js";
import {displayAllMovies} from "./home.js";
import { displayLoginPage } from "./login.js";
import { addMovieFormDisplay,showDetails } from "./movie.js";



let sections = document.querySelectorAll('section');
let ulAnchors = document.querySelectorAll('.navbar.navbar-expand-lg.navbar-dark.bg-dark a');
ulAnchors[0].addEventListener('click',(e)=>displayAllMovies(e));
ulAnchors[1].addEventListener('click',(e)=>displayEmailInNav(e));
ulAnchors[2].addEventListener('click',(e)=>logout(e));
ulAnchors[3].addEventListener('click',(e)=>displayLoginPage(e)); 
ulAnchors[4].addEventListener('click',(e)=>displayRegisterPage(e));

let addBtn = sections[1].querySelector('a');




let ulMovies = sections[2].querySelector('ul');
addBtn.addEventListener('click',(e)=>addMovieFormDisplay(e));
ulMovies.addEventListener('click',(e)=>showDetails(e));



 


displayAllMovies();


async function logout(e){
    e.preventDefault();
    
    try{
     let response = await fetch('http://localhost:3030/users/logout',{
        method: "get",
        headers:{
            "X-Authorization": localStorage.getItem("accessToken")
        }
     })

     if(response.ok == false){
        throw new Error(response.statusText)
     }

     localStorage.clear();
     displayLoginPage();


    }catch(error){
      alert(error.message)
    }
}










