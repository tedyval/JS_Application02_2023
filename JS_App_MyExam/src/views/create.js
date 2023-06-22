import {html} from '../lib.js';
import { createItem } from '../api/data.js'; 


 let createTemplate =(onSubmit)=>html`
 <section id="create">
 <div class="form">
   <h2>Add Event</h2>
   <form @submit=${onSubmit} class="create-form">
     <input
       type="text"
       name="name"
       id="name"
       placeholder="Event"
     />
     <input
       type="text"
       name="imageUrl"
       id="event-image"
       placeholder="Event Image URL"
     />
     <input
       type="text"
       name="category"
       id="event-category"
       placeholder="Category"
     />


     <textarea
       id="event-description"
       name="description"
       placeholder="Description"
       rows="5"
       cols="50"
     ></textarea>
     
     <input
     type="text"
     name="date"
     id="date"
     placeholder="When?"
   />

     <button type="submit">Add</button>
   </form>
 </div>
</section>
  `;


export async function showCreateForm(ctx){
 
ctx.render(createTemplate(onSubmit));
  
async function onSubmit(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let {name,imageUrl,category,description,date} =Object.fromEntries(formData);

    if([name,imageUrl,category,description,date].some(val=> val == "")){
      alert("All fields are reqiered");
      return

    }

  
    await createItem({name,imageUrl,category,description,date});
    ctx.page.redirect('/dashboard');
}


  

}