import { post } from "../api/api.js";
import { postNewIdea } from "../api/data.js";

let divCreate = document.getElementById('createPage');
let formCreate = divCreate.querySelector('form');
formCreate.addEventListener('submit',onCreateIdea);
let ctx = null;
export async function showCreatePage(context){
    context.showSection(divCreate);
    ctx = context;
}

export async function  onCreateIdea(event){
event.preventDefault();
let formData = new FormData(formCreate);
let data= Object.fromEntries(formData)
let title =data.title;
let description = data.description;
let imageURL = data.imageURL;
console.log(title,description,imageURL);

if(title =="" || description == "" || imageURL == ""){
    alert("All inputs should be fulfilled");
    formCreate.reset();
    ctx.goTo('/create')
}
if(title.length < 6){
    alert("Title must be minimal 6 symbols");
    formCreate.reset();
    ctx.goTo('/create');
}

if(description.length < 10){
    alert("Description  must be minimal 10 symbols");
    formCreate.reset();
    ctx.goTo('/create');
}

if(imageURL.length < 5){
    alert("Imgage URL  must be minimal 5 symbols");
    formCreate.reset();
    ctx.goTo('/create');
}

await postNewIdea({title,description,imageURL});
formCreate.reset();
ctx.goTo('/dashboard');

}


