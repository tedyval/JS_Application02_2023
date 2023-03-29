import { html, render } from './node_modules/lit-html/lit-html.js'

let body = document.querySelector('body');
let edit=false;
let id=null;
let page = (edit,updateBook,id,title,author) => html`
<button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
<table >
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody  >
        
    </tbody>
</table>
${edit ? editForm(updateBook,id,title,author) : addForm(addBook)}
`;

let addForm = (addBook) => html`
<form id="add-form" @submit=${addBook}>
<h3>Add book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Submit" >
</form>
`;

let editForm = (updateBook,id,title,author) => html`
<form id="edit-form" @submit=${updateBook}>
        <input type="hidden" name="id">
        <h3 id=${id}>Edit book</h3>
        <label>TITLE</label>
        <input type="text" .value=${title} name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" .value=${author}  name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;



// defineAction = defineAction.bind(null,page,body)

async function loadBooks() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/books')
    let output = await response.json();
    let data = Object.entries(output);
    render(data.map(([key, book]) => tableRow(book, key)), document.querySelector('table'));
}


async function addBook(e) {

    e.preventDefault();
    let formData = new FormData(e.target);
    let titleF = formData.get("title");
    let authorF = formData.get("author");

    try {
        if (titleF == "" || authorF == "") {
            alert("All inputs should be fulfilled")
            new Error("All inputs should be fulfilled")
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: titleF, author: authorF })
        });

        if (response.ok != true) {
            throw new Error(response.statusText);
        } else {
            loadBooks();

        }
        e.target.reset();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
addBook = addBook.bind(loadBooks);

let tableRow = (info, key) => html`
<tr>
    <td>${info.title}</td>
    <td>${info.author}</td>
    <td id=${key} @click=${defineAction} >
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>
`

render(page(), body);
let tbody = document.querySelector('tbody');

async function defineAction(e){
    alert('Hi')
    id = e.target.parentElement.id;
    if (e.target.textContent == "Delete") {
        
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok != true) {
            throw new Error(response.statusText);
        } else {
            render(page(false), body);
            loadBooks();
        }
    } else if (e.target.textContent == "Edit") {
      let tr =  e.target.parentElement.parentElement;
     let tds= tr.querySelectorAll('td');
     console.log(tds[0].textContent,tds[1].textContent);
        render(page(true,update,id,tds[0].textContent,tds[1].textContent), body);
        loadBooks();

    }

    async function  update(e){
        e.preventDefault();
       let id= e.target.querySelector('h3').id
        let formData = new FormData(e.target);
        let titleF = formData.get("title");
        let authorF = formData.get("author");
    
        try {
            if (titleF == "" || authorF == "") {
                alert("All inputs should be fulfilled")
                new Error("All inputs should be fulfilled")
            }
    
            let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: titleF, author: authorF })
            });
    
            if (response.ok != true) {
                throw new Error(response.statusText);
            } else {
                render(page(false), body);
                loadBooks();
    
            }
            e.target.reset();
    
        } catch (error) {
            alert(error.message);
            throw error;
        }
    
    
    }
    
};




