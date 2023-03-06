async function solution() {
    let main = document.getElementById('main');
    let data;
    try {
        let response = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
        data = await response.json();
    } catch (error) {
        alert("Error")
    }

   

    data.forEach((element,index)=> {
        let divContainer = document.createElement('div');
        divContainer.className = "accordion";
        let div1 = document.createElement('div');
        div1.className = "head";
        div1.textContent = element.title;
        let span = document.createElement('span');
        let button = document.createElement('button');
        button.id = element._id;
        button.className = "button";
        button.textContent = "More";
        div1.appendChild(span);
        div1.appendChild(button);
        let div2 = document.createElement('div');
        div2.className = "extra";
        let p = document.createElement('p');
     

        

        div2.style.display = "";
        div2.appendChild(p);
        
        divContainer.appendChild(div1);
        divContainer.appendChild(div2);
        main.appendChild(divContainer);

        button.addEventListener('click',show);
        function show(){
            if(button.textContent == "More"){
                button.textContent = "Less";
                div2.style.display = "block";
            }else if(button.textContent == "Less"){
                button.textContent = "More";
                div2.style.display = "none";
            }
            
        }
        
    });

    let array =[];
    data.forEach(art=>array.push(fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${art._id}`)));
    Promise.all(array).then(resp=>Promise.all(resp.map(r=>r.json()))).then(values=>{
        values.forEach((obj,index)=> {
            let par = document.getElementsByTagName('p')[index];
            console.log(par)
            par.textContent = obj.content;
        })
        
    });




}

solution();

