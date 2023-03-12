
let ulAnchors = document.querySelectorAll('.navbar-nav.ml-auto a');
let sections = document.querySelectorAll('section');

/* [section#home-page.view-section, section#add-movie-button.user,
     section#movie, section#add-movie.view-section, section#movie-example.view-section,
      section#edit-movie.view-section, section#form-login.view-section,
       section#form-sign-up.view-section] */


function isLogedIn() {
    if (localStorage.length > 0  || localStorage.getItem("accessToken") != null) {
        return true;
    } else {
        return false;
    }
}

function navigation() {
    
    [...sections].forEach(s=>s.style.display="none");
    if (isLogedIn()) {
        ulAnchors[0].style.display = "block";
        ulAnchors[1].style.display = "block";
        ulAnchors[2].style.display = "none";
        ulAnchors[3].style.display = "none";
    } else {
        ulAnchors[0].style.display = "none";
        ulAnchors[1].style.display = "none";
        ulAnchors[2].style.display = "block";
        ulAnchors[3].style.display = "block";
    }
}


export { isLogedIn, navigation }