import {html} from '../lib.js';
import { getById,updateItem } from '../api/data.js'; 


 let editTemplate =(data,onSubmit)=>html`
 <section id="edit">
 <div class="form">
   <h2>Edit Event</h2>
   <form @submit=${onSubmit} class="edit-form">
     <input
       type="text"
       name="name"
       id="name"
       placeholder="Event"
       .value=${data.name}
     />
     <input
       type="text"
       name="imageUrl"
       id="event-image"
       placeholder="Event Image"
       .value=${data.imageUrl}
     />
     <input
       type="text"
       name="category"
       id="event-category"
       placeholder="Category"
       .value=${data.category}
     />


     <textarea
       id="event-description"
       name="description"
       placeholder="Description"
       rows="5"
       cols="50"
       .value=${data.description}
     ></textarea>
     
     <label for="date-and-time">Event Time:</label>
     <input
     type="text"
     name="date"
     id="date"
     placeholder="When?"
     .value=${data.date}
   />

     <button type="submit">Edit</button>
   </form>
 </div>
</section>
  `;


export async function showEditForm(ctx){
   let id = ctx.params.id;
   let data = await getById(id)
 
ctx.render(editTemplate(data,onSubmit));
  
async function onSubmit(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let {name,imageUrl,category,description,date} =Object.fromEntries(formData);

    if([name,imageUrl,category,description,date].some(val=> val == "")){
      alert("All fields are reqiered");
      return

    }

    
    await updateItem(id,{name,imageUrl,category,description,date});
    ctx.page.redirect(`/details/${id}`);
}


  

}