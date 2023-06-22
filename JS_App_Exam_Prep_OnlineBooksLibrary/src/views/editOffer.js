import {html} from '../lib.js';
import { getById,updateItem } from '../api/data.js'; 


 let editTemplate =(data,onSubmit)=>html`
 <section id="edit-page" class="edit">
 <form @submit="${onSubmit}" id="edit-form" >
     <fieldset>
         <legend>Edit my Book</legend>
         <p class="field">
             <label for="title">Title</label>
             <span class="input">
                 <input type="text" name="title" id="title" .value="${data.title}">
             </span>
         </p>
         <p class="field">
             <label for="description">Description</label>
             <span class="input">
                 <textarea name="description"
                     id="description" .value="${data.description}"></textarea>
             </span>
         </p>
         <p class="field">
             <label for="image">Image</label>
             <span class="input">
                 <input type="text" name="imageUrl" id="image" .value="${data.imageUrl}">
             </span>
         </p>
         <p class="field">
             <label for="type">Type</label>
             <span class="input">
                 <select id="type" name="type" .value="${data.type}">
                     <option value="Fiction" selected>Fiction</option>
                     <option value="Romance">Romance</option>
                     <option value="Mistery">Mistery</option>
                     <option value="Classic">Clasic</option>
                     <option value="Other">Other</option>
                 </select>
             </span>
         </p>
         <input class="button submit" type="submit" value="Save">
     </fieldset>
 </form>
</section>    
  `;


export async function showEditForm(ctx){
   let id = ctx.params.id;
   let data = await getById(id)
 
ctx.render(editTemplate(data,onSubmit));
  
async function onSubmit(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let {title,description,imageUrl,type} =Object.fromEntries(formData);

    if([title,description,imageUrl,type].some(val=> val == "")){
      alert("All fields are reqiered");
      return

    }

    
    await updateItem(id,{title,description,imageUrl,type});
    ctx.page.redirect(`/details/${id}`);
}


  

}