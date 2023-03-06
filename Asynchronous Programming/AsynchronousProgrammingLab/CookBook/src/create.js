
let form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    let dataform = new FormData(event.target);
    if (dataform.get("name") == "" || dataform.get("ingredients") == "" || dataform.get("steps") == "") {
        throw new Error("Required inputs");
    }

  
    let recipeForPost ={
      name:dataform.get("name"),
      img: dataform.get("img"),
      ingredients: dataform.get("ingredients").split('\n').map(r=>r.trim()).filter(r=> r != ''),
      steps: dataform.get("steps").split('\n').map(r=>r.trim()).filter(r=> r != '')
    }

    try {

        let resp = await fetch(`http://localhost:3030/data/recipes`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(recipeForPost)
        });

        if(resp.ok != true){
            throw new Error(resp.statusText);
        }

        window.location = "index.html";

 


    }catch(error){
      alert(error.message);
    }

    });