import { isLogedIn, navigation } from "./util.js";

let sections = document.querySelectorAll('section');
let ulMovies = sections[2].querySelector('ul');




function displayAllMovies(e) {
   e && e.preventDefault();
   navigation();
    sections[0].style.display = "block";
    sections[2].style.display = "block";
    if(isLogedIn()){
        sections[1].style.display = "block";
    }else{
        sections[1].style.display = "none"; 
    }
    
   ulMovies.replaceChildren();
   getMovies();
    

}

async function getMovies(){
    try{
    let response = await fetch('http://localhost:3030/data/movies ');
    let data = await response.json();
    if(response.ok == false){
        throw new Error(response.statusText);
    }

    let arrElemMovies =Object.values(data).map(objMovie=>createMovieInDOM(objMovie));
    let fragment = new DocumentFragment();
    fragment.replaceChildren(...arrElemMovies);
    ulMovies.appendChild(fragment);

    }catch(error){
      alert(error.message)
    }
}

function createMovieInDOM(objMovie){
let li = document.createElement('li');
 li.className="card";
 li.style.maxWidth="25rem";
 
let img = document.createElement('img');
img.src=objMovie.img;

let header5 = document.createElement('h5');
header5.textContent =objMovie.title;
let btnDetails= document.createElement('button');
btnDetails.dataset.id= objMovie._id;
let span=document.createElement('span');
span.textContent="Details";
span.style.backgroundColor="green";
btnDetails.appendChild(span);



li.append(img,header5,btnDetails);

return li;

}

export { displayAllMovies ,createMovieInDOM} 