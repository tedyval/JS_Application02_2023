function proofUserSession() { 
    
    window.addEventListener('load', () => {
        
        let loadBtn = document.querySelector('.load');
        let addForm = document.getElementById('addForm');
        let addBtn = document.querySelector('.add');

        let divCatches = document.getElementById('catches');
        divCatches.innerHTML = "";
        let legendCatches = document.querySelector('#main legend');
        legendCatches.style.display = "none";
        let fieldset = document.getElementById('main');
        fieldset.style.border = "none";

        if (sessionStorage.getItem("accessToken") == null) {
            let divUser = document.getElementById('user');
            divUser.style.display = "none";



        } else {
            let spanNameUser = document.querySelector('nav p span');
            spanNameUser.textContent = sessionStorage.getItem('email');
            let divGuest = document.getElementById('guest');
            divGuest.style.display = "none";
            addBtn.disabled = false;
            addForm.addEventListener('submit', (ev) => {
                let url = `http://localhost:3030/data/catches`;
                let methodReq = "post";
                addCatch(ev, divCatches, url, methodReq);
                
            });
        }

        loadBtn.addEventListener('click', loadInfos.bind(null, divCatches, legendCatches, fieldset));
        let logoutAnker = document.getElementById('logout');
        logoutAnker.addEventListener('click',async ()=>{
          let response = await fetch('http://localhost:3030/users/logout',{
            method:"get",
            headers:{
                "X-Authorization": sessionStorage.getItem("accessToken")
            }
          })

          if(response.ok == false){
            throw new Error(response.statusText)
          }

          sessionStorage.clear();
          window.location= "index.html";
        })




    })

} 

async function loadInfos(divCatches, legendCatches, fieldset) {
    divCatches.innerHTML = "";
    try {
        let response = await fetch('http://localhost:3030/data/catches');
        if (response.ok == false) {
            throw new Error(response.statusText);
        }

        let data = await response.json();
        legendCatches.style.display = "";
        fieldset.style.border = "";

        data.forEach(objUser => createDivCatch(divCatches, objUser));
    } catch (error) {
        alert(error.message)
    }

}

async function addCatch(ev, divCatches, url, methodReq) {
    ev.preventDefault();
    let anglerData;
    let weightData;
    let speciesData;
    let locationData;
    let baitData;
    let captureTimeData;
    
    
    if (ev.target.nodeName == "FORM") {
        let formData = new FormData(ev.target);
        anglerData = formData.get("angler");
        weightData = formData.get("weight");
        speciesData = formData.get("species");
        locationData = formData.get("location");
        baitData = formData.get("bait");
        captureTimeData = formData.get("captureTime");
        let inputs = ev.target.querySelectorAll('input');
        Array.from(inputs).forEach(input=> input.value ="");
    } else if (ev.target.nodeName == "BUTTON") {
       let inputs = ev.target.parentElement.querySelectorAll('input');
        anglerData = inputs[0].value;
        weightData = inputs[1].value;
        speciesData = inputs[2].value;
        locationData = inputs[3].value;
        baitData = inputs[4].value;
        captureTimeData = inputs[5].value;
        
    }



    try {
        if (anglerData == "" || typeof anglerData != 'string') {
            throw new Error('Angler is required and must be string');

        }


        if (weightData == "" || typeof Number(weightData) != 'number') {
            throw new Error('Weigt is required and must be number');

        }

        if (speciesData == "" || typeof speciesData != 'string') {
            throw new Error('species is required and must be string');

        }


        if (locationData == "" || typeof locationData != 'string') {
            throw new Error('Location is required and must be string');

        }

        if (baitData == "" || typeof baitData != 'string') {
            throw new Error('Bait is required and must be string');

        }

        if (captureTimeData == "" || typeof Number(captureTimeData) != 'number' || !Number.isInteger(Number(captureTimeData))) {
            throw new Error('captureTime is required and must be integer number');

        }

        let recordToBeCreated = {
            angler: anglerData,
            weight: weightData,
            species: speciesData,
            location: locationData,
            bait: baitData,
            captureTime: captureTimeData
        };

         let resp;
        if (methodReq == "post") {
            resp = await fetch(`${url}`, {
                method: `${methodReq}`,
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": sessionStorage.getItem("accessToken")
                },
                body: JSON.stringify(recordToBeCreated)
            });

            
        } else if (methodReq == "put") {
            let idCatchHtml = ev.target.dataset.id
            resp = await fetch(`${url}/` + idCatchHtml , {
                method: `${methodReq}`,
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": sessionStorage.getItem("accessToken")
                },
                body: JSON.stringify(recordToBeCreated)
            });
        }



        if (resp.ok == false) {
            throw new Error(resp.statusText)
        }

        let objUser = await resp.json();
    
        if (ev.target.nodeName == "FORM") {
            sessionStorage.setItem("userId",objUser._ownerId);
            createDivCatch(divCatches, objUser);
            
        } else if (ev.target.nodeName == "BUTTON") {
            ev.target.parentElement.remove();
            createDivCatch(divCatches, objUser);
        }

        

    } catch (error) {
        alert(error.message);
    }

}


function createDivCatch(divCatches, objUser) {
   
    let divCatch = document.createElement('div');
    divCatch.className = "catch";
    let idCatch = objUser._id;
    console.log(idCatch);
    divCatch.innerHTML = ` <label>Angler</label>
    <input type="text" class="angler" value=${objUser.angler}>
    <label>Weight</label>
    <input type="text" class="weight" value=${objUser.weight}>
    <label>Species</label>
    <input type="text" class="species" value=${objUser.species}>
    <label>Location</label>
    <input type="text" class="location" value=${objUser.location}>
    <label>Bait</label>
    <input type="text" class="bait" value=${objUser.bait}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value=${objUser.captureTime}>
    <button class="update" data-id=${idCatch}>Update</button>
    <button class="delete" data-id=${idCatch}>Delete</button>`;




    if (sessionStorage.getItem("userId") == objUser._ownerId) {
        divCatch.querySelector('.update').disabled = false;
        divCatch.querySelector('.delete').disabled = false;
        

        divCatch.querySelector('.update').addEventListener('click', (e) => {

            updateCatch(e,divCatches);
        });

        divCatch.querySelector('.delete').addEventListener('click', (e) => {

            deleteCatch(e,divCatches);
        });
        divCatches.appendChild(divCatch);

    } else {

        divCatch.querySelector('.update').disabled = true;
        divCatch.querySelector('.delete').disabled = true;
        divCatches.appendChild(divCatch);
    }





}

async function updateCatch(e, divCatches) {
    let url = `http://localhost:3030/data/catches`;

    let methodReq = "put";

    addCatch(e, divCatches, url, methodReq);


}

async function deleteCatch(e, divCatches) {
    
    let idToBeDeleted = e.target.dataset.id;
    e.target.parentElement.remove();

    let response = await fetch(`http://localhost:3030/data/catches/${idToBeDeleted}`,{
        method: 'delete',
        headers:{
            "X-Authorization": sessionStorage.getItem("accessToken")
        }
    })

    if(response.ok == false){
        throw new Error(response.statusText)
    }
    
    

}

proofUserSession(); 