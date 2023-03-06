let main = document.getElementsByTagName("main")[0];
let divUser = document.getElementById('user');
let divGuest = document.getElementById('guest');
let logoutBtn = document.getElementById('logoutBtn');

async function getRecipes() {
    if(sessionStorage.getItem("accessToken") == null){
      divUser.style.display="none";
    }else{
        divGuest.style.display="none";  
    }
    
    logoutBtn.addEventListener('click',logout);

    try {

        let response = await fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg');
        if (response.ok != true) {
            throw new Error(response.message);
        }

        data = await response.json();

        main.innerHTML = '';
        Object.values(data).forEach(obj => createCard(obj));

    } catch (error) {
        alert(error.message);
    }

   /*  function createCard(recipe) {
        let article1 = document.createElement('article');
        article1.className = "preview";
        let divTitle = document.createElement('div');
        divTitle.className = "title";
        let h2 = document.createElement('h2');
        h2.textContent = recipe.name;
        divTitle.appendChild(h2);
        let divImg = document.createElement('div');
        divTitle.className = "small";
        let img = document.createElement('img');
        img.src = recipe.img;
        img.style.display = "inline-block";
        divImg.appendChild(img);
        article1.appendChild(divTitle);
        article1.appendChild(divImg);
        main.appendChild(article1);
    
        article1.addEventListener('click',loadInfo);

        async function loadInfo() {
            let resp = await fetch('http://localhost:3030/data/recipes/' + recipe._id);
            let details = await resp.json();

            let article2 = document.createElement('article');
            let h2Art2 = document.createElement('h2');
            h2Art2.textContent = details.name;
            let divBand = document.createElement('div');
            divBand.className = "band";
            let divThumb = document.createElement('div');
            divThumb.className = "thumb";
            let img1 = document.createElement('img');
            img1.src = details.img;
            divThumb.appendChild(img1);
            let divIngredients = document.createElement('div');
            divIngredients.className = "ingredients";
            let h3 = document.createElement('h3');
            h3.textContent = "Ingredients:";
            let ul = document.createElement('ul');
            Object.values(details.ingredients).forEach(ingr=> {
                let li = document.createElement('li');
                li.textContent= ingr;
                ul.appendChild(li);
            });

            divIngredients.append(h3,ul);
            divBand.append(divThumb,divIngredients);

            let divDescription = document.createElement('div');
            divDescription.className= "description";
            let h3Preparetion = document.createElement('h3');
            divDescription.appendChild(h3Preparetion);
            h3Preparetion.textContent="Preparation:";
            details.steps.forEach(step=>{
                let p = document.createElement('p');
                p.textContent = step;
                divDescription.appendChild(p);
            });

            article2.append(h2Art2,divBand,divDescription);
            article1.replaceWith(article2);

            article2.addEventListener('click',hideInfo);

           function hideInfo(){
            article2.replaceWith(article1);
           }



        }

    } */



}

function createCard(recipe) {
    let article1 = document.createElement('article');
    article1.className = "preview";
    let divTitle = document.createElement('div');
    divTitle.className = "title";
    let h2 = document.createElement('h2');
    h2.textContent = recipe.name;
    divTitle.appendChild(h2);
    let divImg = document.createElement('div');
    divTitle.className = "small";
    let img = document.createElement('img');
    img.src = recipe.img;
    img.style.display = "inline-block";
    divImg.appendChild(img);
    article1.appendChild(divTitle);
    article1.appendChild(divImg);
    main.appendChild(article1);

    article1.addEventListener('click',loadInfo);

    async function loadInfo() {
        let resp = await fetch('http://localhost:3030/data/recipes/' + recipe._id);
        let details = await resp.json();

        let article2 = document.createElement('article');
        let h2Art2 = document.createElement('h2');
        h2Art2.textContent = details.name;
        let divBand = document.createElement('div');
        divBand.className = "band";
        let divThumb = document.createElement('div');
        divThumb.className = "thumb";
        let img1 = document.createElement('img');
        img1.src = details.img;
        divThumb.appendChild(img1);
        let divIngredients = document.createElement('div');
        divIngredients.className = "ingredients";
        let h3 = document.createElement('h3');
        h3.textContent = "Ingredients:";
        let ul = document.createElement('ul');
        Object.values(details.ingredients).forEach(ingr=> {
            let li = document.createElement('li');
            li.textContent= ingr;
            ul.appendChild(li);
        });

        divIngredients.append(h3,ul);
        divBand.append(divThumb,divIngredients);

        let divDescription = document.createElement('div');
        divDescription.className= "description";
        let h3Preparetion = document.createElement('h3');
        divDescription.appendChild(h3Preparetion);
        h3Preparetion.textContent="Preparation:";
        details.steps.forEach(step=>{
            let p = document.createElement('p');
            p.textContent = step;
            divDescription.appendChild(p);
        });

        article2.append(h2Art2,divBand,divDescription);
        article1.replaceWith(article2);

        article2.addEventListener('click',hideInfo);

       function hideInfo(){
        article2.replaceWith(article1);
       }



    }

}

async function logout(){
    await fetch('http://localhost:3030/users/logout',{
       method: "get",
       headers:{
        "X-Authorization": sessionStorage.getItem('accessToken')
       } 
    });

    sessionStorage.removeItem('accessToken');
    window.location="index.html";
}



getRecipes();


