let main = document.getElementsByTagName("main")[0];

async function getRecipes() {

    try {

        let response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
        if (response.ok != true) {
            throw new Error(response.message);
        }

        data = await response.json();
        
        main.innerHTML="";
        Object.values(data).forEach(obj => createCard(obj));

    } catch (error) {
        alert(error.message);
    }

    function createCard(recipe){
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
        img.src= recipe.img;
        article1.appendChild(divTitle);
        article1.appendChild(divImg);
        main.appendChild(article1);

       /*  let article2 = document.createElement('article');
        let h2Art2 = document.createElement('h2');
        h2.textContent = recipe.name;
        let divBand = document.createElement('div');
        divBand.className= "band";
        let divThumb = document.createElement('div');
        divThumb.className = "thumb";
        let img1 = document.createElement('img');
        img1.src= recipe.img; 
        divThumb.appendChild(img1);
        let divIngredients = document.createElement('div');
        divIngredients.className = "ingredients";
        let h3 = document.createElement('h3');
        h3.textContent = "Ingredients:";
        let ul = document.createElement('ul');
        ul
 */
    }

   

}

getRecipes();
