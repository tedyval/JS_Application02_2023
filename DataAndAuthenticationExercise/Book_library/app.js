function books() {
    let loadBtn = document.getElementById('loadBooks');
    let tbody = document.querySelector('tbody');
    let inputTitle = document.querySelector('[name="title"]');
    let inputAuthor = document.querySelector('[name="author"]');
    let form = document.querySelector('form');
    let h3 = document.querySelector('form h3');
    let submitBtn = document.querySelector('form button');


    loadBtn.addEventListener('click', loadBooks.bind(null, inputTitle, inputAuthor, h3, submitBtn, form, tbody));
    form.addEventListener('submit', createBook.bind(this,inputAuthor,inputTitle));



}

async function loadBooks(inputTitle, inputAuthor, h3, submitBtn, form, tbody) {
    tbody.innerHTML = "";

    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/books');
        if (response.ok == false) {
            throw new Error(response.statusText);
        }

        let data = await response.json();
        Object.entries(data).forEach(([id, book]) => createTableRow(id,book,inputTitle, inputAuthor, h3, submitBtn, form, tbody))

    } catch (error) {
        alert(error.message);
    }
}

async function createBook(ev,inputAuthor,inputTitle) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    try {
        if (formData.get("title") == "" || formData.get("author") == "") {
            throw new Error("All fields must be fullFilled");
        }

        let createdBook = {
            author: formData.get("author"),
            title: formData.get("title")
        }

        let resp = await fetch(`http://localhost:3030/jsonstore/collections/books`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdBook)
        });

        if (resp.ok == false) {
            throw new Error(resp.statusText);
        }

        inputAuthor.value = "";
        inputTitle.value = "";




    } catch (error) {
        alert(error.message);
    }
}

async function createTableRow(id,book,inputTitle, inputAuthor, h3, submitBtn, form, tbody){
    let tr = document.createElement('tr');
    let tdTitle = document.createElement('td');
    tdTitle.textContent = book.title;
    let tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.author;
    let tdAction = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = "Edit";

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete"
    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);

    deleteBtn.addEventListener('click', async (e) => {
        tr.remove();
        let resp = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: "delete"

        });

        if (resp.ok == false) {
            throw new Error(resp.statusText);
        }

    });

    editBtn.addEventListener('click', async () => {

        inputTitle.value = book.title;
        inputAuthor.value = book.author;

        h3.textContent = "EditFORM";
        submitBtn.textContent = "Save";

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            if (formData.get("title") == "" || formData.get("author") == "") {
                throw new Error("All fields must be fullFilled");
            }

            let updatedBook = {
                author: formData.get("author"),
                title: formData.get("title")
            }

            let resp = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook)
            });

            if (resp.ok == false) {
                throw new Error(resp.statusText);
            }

            h3.textContent = "FORM";
            submitBtn.textContent = "Submit";
            tdTitle.textContent = formData.get("author");
            tdAuthor.textContent = formData.get("title");
            inputTitle.value = "";
            inputAuthor.value = "";


        });

    });
}

books();
