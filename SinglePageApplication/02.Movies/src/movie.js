import { isLogedIn, navigation } from "./util.js";
import { createMovieInDOM, displayAllMovies } from "./home.js"

let sections = document.querySelectorAll('section');
let formAddMovie = document.querySelector('#add-movie-form');

let ulMovies = sections[2].querySelector('ul');
let movieExample = document.getElementById('movie-example');
let deleteBtn = movieExample.querySelector(".btn.btn-danger");
let editBtn = movieExample.querySelector(".btn.btn-warning");
let likeBtn = movieExample.querySelector(".btn.btn-primary");
let spanLiikes = movieExample.querySelector('span');
let formEdit = sections[5].querySelector('form');

formAddMovie.addEventListener('submit', (e) => addMovie(e));

let idMovie;

deleteBtn.addEventListener('click', (e) => deleteMovie(e));
editBtn.addEventListener('click', (e) => editMovieForm(e));
likeBtn.addEventListener('click', (e) => likeMovie(e));
formEdit.addEventListener('submit', (e) => editMovie(e,ulMovies,formEdit));


function addMovieFormDisplay(e) {
    e.preventDefault();
    navigation();
    sections[3].style.display = "block";
}

async function addMovie(e) {
    e.preventDefault();
    let dataForm = new FormData(formAddMovie);

    let title = dataForm.get("title");
    let description = dataForm.get("description");
    let img = dataForm.get("img");

    try {
        if (title == "" || description == "" || img == "") {
            throw new Error("All inputs should be fullfilled");
        }

        let response = await fetch('http://localhost:3030/data/movies ', {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ title, description, img })
        })

        if (response.ok == false) {
            throw new Error(response.statusText)
        }
        let data = await response.json();

        let liElem = createMovieInDOM(data);
        ulMovies.appendChild(liElem);
        formAddMovie.reset();
        displayAllMovies(e);

    } catch (error) {
        alert(error.message)
    }
}

async function showDetails(e) {
    e.preventDefault();
    if (e.target.tagName == "BUTTON") {
        idMovie = e.target.dataset.id;
        formEdit.dataset.id = idMovie;
        if (isLogedIn()) {
            navigation();
            sections[4].style.display = "block";
            detailsToFilm(idMovie);
        } else {
            alert("You are not allowed to see details");
            return;
        }
    }
}

async function detailsToFilm(idMovie) {
    try {
        let response = await fetch(`http://localhost:3030/data/movies/${idMovie}`, {
            method: "get",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken")
            }
        })

        if (response.ok == false) {
            throw new Error(response.statusText)
        }

        let data = await response.json();
        sections[4].querySelector("h1").textContent = data.title;
        sections[4].querySelector("img").src = data.img;
        sections[4].querySelector("p").src = data.description;
        if (localStorage.getItem('id') == data._ownerId) {
            deleteBtn.style.display = "block";
            editBtn.style.display = "block";
            likeBtn.style.display = "none";
            spanLiikes.style.display = "block";
            getLikes(idMovie);
        } else {
            deleteBtn.style.display = "none";
            editBtn.style.display = "none";
            likeBtn.style.display = "block";
            spanLiikes.style.display = "block";
        }



    } catch (error) {
        alert(error.message)
    }

}

async function getLikes(idMovie) {

    try {
        let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${idMovie}%22&distinct=_ownerId&count`, {
            method: "get",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken")
            }
        })

        if (response.ok == false) {
            throw new Error(response.statusText)
        }

        let likes = await response.json();
        spanLiikes.textContent = `Liked ${likes}`;


    } catch (error) {
        alert(error.message)
    }

}


async function likeMovie(e) {

    e.preventDefault();

    if (isLiked() == true) {

        likeBtn.removeEventListener('click', (e) => likeMovie(e));
        return
    } else {
        try {

            let response = await fetch(`http://localhost:3030/data/likes`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ "movieId": idMovie })
            })

            if (response.ok == false) {
                throw new Error(response.statusText)
            }

          
            likeBtn.removeEventListener('click', (e) => likeMovie(e));
            getLikes(idMovie);


        } catch (error) {
            alert(error.message)
        }
    }


}

async function isLiked() {
    let userId = localStorage.getItem("id");
    let resp = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${idMovie}%22%20and%20_ownerId%3D%22${userId}%22`, {
        method: "get",
        headers: {
            "X-Authorization": localStorage.getItem("accessToken")
        }
    })

    let data = await resp.json()

    if (data.length == 0) {
        return false;
    } else {
        return true;
    }

}

async function deleteMovie(e) {
    e.preventDefault();
    let idMovie = formEdit.dataset.id;
    try {
        let resp = await fetch(`http://localhost:3030/data/movies/${idMovie} `, {
            method: "delete",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken")
            }
        })

        if (resp.ok == false) {
            throw new Error(resp.statusText)
        }

        displayAllMovies();
    } catch (error) {
        alert(error.message)
    }
}

async function editMovieForm(e) {
    e.preventDefault();
   
    let idMovie = formEdit.dataset.id;
    try {
        let resp = await fetch(`http://localhost:3030/data/movies/${idMovie}`, {
            method: "get",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken")
            }
        })

        if (resp.ok == false) {
            throw new Error(resp.statusText)
        }

        let data = await resp.json();
        navigation();
        sections[5].style.display = "block";
        let title = document.getElementById('titleEdit');
        let description = sections[5].querySelector('textarea');
        let img = document.getElementById('imageUrlEdit');
        title.value = data.title;
        description.value = data.description;
        img.value = data.img;
        // formEdit.addEventListener('submit', (e) => editMovie(e, idMovie,ulMovies,formEdit));


    } catch (error) {
        alert(error.message)
    }
}


async function editMovie(e,ulMovies,formEdit) {
    e.preventDefault();
   
   
    let dataForm = new FormData(formEdit);
    let title = dataForm.get("title");
    let description = dataForm.get("description");
    let img = dataForm.get("img");

    try {
        if (title == "" || description == "" || img == "") {
            throw new Error("All inputs should be fullfilled");
        }

        let response = await fetch(`http://localhost:3030/data/movies/${idMovie}`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ title, description, img })
        })

        if (response.ok == false) {
            throw new Error(response.statusText)
        }
        let data = await response.json();

       
        formEdit.reset();
        ulMovies.replaceChildren();
        formEdit.removeEventListener('submit', (e) => editMovie(e, idMovie,ulMovies,formEdit));
        displayAllMovies(e);


    } catch (error) {
        alert(error.message)
    }

}


export { addMovieFormDisplay, showDetails }