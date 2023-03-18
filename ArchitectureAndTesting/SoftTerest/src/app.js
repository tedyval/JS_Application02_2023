import { showHomePage } from "./views/homePage.js";
import { showCreatePage } from "./views/createPage.js"; 
import { showDashboardPage } from "./views/dashboard.js"; 
import { showLoginPage } from "./views/loginPage.js";  
import { showRegisterPage } from "./views/register.js";  
import { showDetailsPage,deleteIdea } from "./views/details.js";
import { navbarView } from "./util/util.js";
import { logout } from "./api/user.js";

let divs = document.querySelectorAll('body>div');
// [...divs].forEach(div=>div.remove());
let divDashboard = document.getElementById('dashboard-holder');




let links= {
    '/': showHomePage,
   '/dashboard': showDashboardPage,
   '/create': showCreatePage,
   '/logout': logoutUser,
   '/login': showLoginPage,
   '/register': showRegisterPage,
   '/details': showDetailsPage,
   '/delete': deleteIdea
}

/* let nav = document.querySelector('nav');
nav.addEventListener('click',onNavigate);
divDashboard.addEventListener('click',onNavigate);
let divDetails = document.getElementById('detailsPage');
divDetails.addEventListener('click',onNavigate); */
let nav = document.querySelector('nav');
let body = document.querySelector('body');
body.addEventListener('click',onNavigate);

let context ={
    showSection,
    goTo
}

goTo('/');
navbarView();

function onNavigate(event){
   let target= event.target;
   if(target.tagName == "IMG"){
   target = target.parentElement;
   }

   if(target.tagName == "A" ){
    event.preventDefault();
    let url = new URL(target.href)
    let path = url.pathname;
   
    if(target.dataset.id){
        let id = target.dataset.id;
        let idOwner = target.dataset.owner;
        goTo(path,id,idOwner);
    }else{
        goTo(path);
    }
    
   }
}

function showSection(section){
    [...divs].forEach(div=>div.remove());
    nav.after(section);
}

function goTo(path,...param){
    let handler = links[path];
    if(typeof handler == 'function'){
        handler(context,...param);
    }
}

async function logoutUser(context){
   await logout();
   context.goTo('/');
   navbarView();
}