
let userNavBars =document.querySelectorAll('nav li.user');
let guestNavBars =document.querySelectorAll('nav li.guest');

export function navbarView(){
    let isLoged= localStorage.getItem("user");
    if(isLoged == null){
    Array.from(userNavBars).forEach(b=>b.style.display ="none");
    Array.from(guestNavBars).forEach(b=>b.style.display ="list-item");
    }else{
        Array.from(userNavBars).forEach(b=>b.style.display ="list-item");
        Array.from(guestNavBars).forEach(b=>b.style.display ="none");

    }
}