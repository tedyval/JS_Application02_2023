function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let ul = document.getElementById('phonebook');

    loadBtn.addEventListener('click', loadPhonebook.bind(null,ul));
    createBtn.addEventListener('click', createPhonebookRecord);



    async function createPhonebookRecord() {

        try {

            let inputPerson = document.getElementById('person');
            let inputPhone = document.getElementById('phone');


            if (inputPerson.value == '' || inputPhone.value == "") {
                throw new Error("Inputs requered!");
            }

            let recordInfo = {
                person: inputPerson.value,
                phone: inputPhone.value
            }


            let resp = await fetch('http://localhost:3030/jsonstore/phonebook', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recordInfo)
            })

            if (resp.ok != true) {
                throw new Error(resp.statusText);
            }

            inputPerson.value = "";
            inputPhone.value = "";

            loadPhonebook(ul);




        } catch (error) {
            alert(error.message)
        }
    }


}

async function loadPhonebook(ul) {
    ul.innerHTML="";
    try {
        let response = await fetch('http://localhost:3030/jsonstore/phonebook');
        if (response.ok != true) {
            throw new Error(response.statusText);

        }

        let data = await response.json();

        Object.values(data).forEach(obj => {
            let li = document.createElement('li');
            li.textContent = `${obj.person}: ${obj.phone}`;
            let btnDelete = document.createElement('button');
            btnDelete.textContent = "Delete";
            let id = obj._id;
            btnDelete.addEventListener('click', async function (e, id) {
                e.target.parentElement.remove();

                try {
                    let resp = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
                        method: "delete"
                    });

                    if (resp.ok != true) {
                        throw new Error(resp.statusText);
                    }

                } catch (error) {
                    alert(error.message);
                }

            });

            li.appendChild(btnDelete);
            ul.appendChild(li);
        });

       
       



    } catch (error) {
        alert(error.message);
    }
}

attachEvents();