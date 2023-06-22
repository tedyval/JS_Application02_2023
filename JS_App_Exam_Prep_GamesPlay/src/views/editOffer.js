import {html} from '../lib.js';
import { getById,updateItem } from '../api/data.js'; 


 let editTemplate =(data,onSubmit)=>html`
 <section id="edit-page" class="auth">
 <form @submit=${onSubmit} id="edit">
     <div class="container">

         <h1>Edit Game</h1>
         <label for="leg-title">Legendary title:</label>
         <input type="text" id="title" name="title" .value="${data.title}">

         <label for="category">Category:</label>
         <input type="text" id="category" name="category" .value="${data.category}">

         <label for="levels">MaxLevel:</label>
         <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${data.maxLevel}">

         <label for="game-img">Image:</label>
         <input type="text" id="imageUrl" name="imageUrl" .value="${data.imageUrl}">

         <label for="summary">Summary:</label>
         <textarea name="summary" id="summary" .value="${data.summary}"></textarea>
         <input class="btn submit" type="submit" value="Edit Game">

     </div>
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

    let {title,category,maxLevel,imageUrl,summary} =Object.fromEntries(formData);

    if([title,category,maxLevel,imageUrl,summary].some(val=> val == "")){
      alert("All fields are reqiered");
      return

    }

    
    await updateItem(id,{title,category,maxLevel,imageUrl,summary});
    ctx.page.redirect(`/details/${id}`);
}


  

}